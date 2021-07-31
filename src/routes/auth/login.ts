import { Request, Response } from 'express'
import schema from '../../schema/loginSchema'
import { ValidationResult } from 'joi'
import { userModel, User } from '../../models/userModel'
import { tokenModel, Token } from '../../models/tokenModel'
import { generateJWTToken, generateRefreshToken, validToken } from '../../utils/generateToken'
import bcrypt from 'bcrypt'

export default async function(req: Request, res: Response) {
    // Checek auth header
    if(req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1]
        if (validToken(token)) {
            return res.status(204).json({
                status: res.statusCode,
                message: "You have already login"
            })
        } else {
            return res.status(403).json({
                status: res.statusCode,
                message: 'Invalid token'
            })
        }
    }

    // Validate request
    if(!req.body) return res.status(400).send('No request body included')
    const validtest: ValidationResult = schema.validate(req.body)
    if(validtest['error']) return res.status(400).send(validtest['error'].details)

    // Check password
    userModel.findOne({ username: req.body['username'] } as User, (err, doc: User) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                status: res.statusCode,
                message: "Error when querying user info"
            })
        }

        if(!doc) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Wrong login credentials"
            })
        }

        bcrypt.compare(req.body['password'], doc['password'], async(err, result) => {
            if(err) {
                console.log(err)
                return res.status(500).send('Error when compare the password')
            }

            if(result == false) {
                return res.status(400).json({
                    status: res.statusCode,
                    message: "Wrong login credentials"
                })
            }

            
            tokenModel.findOne({ userId: doc['id'] } as Token, async(err, tokenData) => {
                if (err) {
                    console.log(err)
                    return res.status(200).send('Error obtain refresh token')
                }
                
                let JWTToken = generateJWTToken(doc['_id'])
                let refreshToken = generateRefreshToken(doc['_id'], JWTToken)
                if(!tokenData) {
                    await refreshToken.save()
                }else {
                    refreshToken = tokenData
                    tokenModel.updateOne({ userId: doc['id'] } as Token, { currentToken: JWTToken } as Token)
                }

                return res.status(200).header('Authorization', JWTToken).cookie('refreshToken', refreshToken['refreshToken']).json({
                    status: res.statusCode,
                    hash: {
                        token: JWTToken,
                        refresh_token: refreshToken['refreshToken']
                    }
                })
            })
        })
    })
}