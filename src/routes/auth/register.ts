import { Request, Response } from 'express'
import schema from '../../schema/registerSchema'
import { validToken, generateJWTToken, generateRefreshToken } from '../../utils/generateToken'
import { ValidationResult } from 'joi'
import { userModel, User } from '../../models/userModel'
import bcrypt from 'bcrypt'

export default async function (req: Request, res: Response) {
    // Checek auth header
    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1]
        if (validToken(token)) {
            return res.status(204).json({
                status: res.statusCode,
                message: "You have already login"
            })
        } else {
            return res.status(403).json({
                status: res.statusCode,
                message: 'Invalid token provided on header'
            })
        }
    }

    // Validate request
    if (!req.body) return res.status(400).send('No request body included')
    const validtest: ValidationResult = schema.validate(req.body)
    if (validtest['error']) return res.status(400).send(validtest['error'].details)

    // Check if user already exist
    userModel.findOne({ username: req.body['username'] } as User, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                status: res.statusCode,
                message: "Error when querying user info"
            })
        }

        if(doc) {
            return res.status(403).json({
                status: res.statusCode,
                message: "User already exist"
            })
        }
    })

    bcrypt.hash(req.body['password'], Number(process.env["SALT_ROUND"]), async(err, hash) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                status: 500,
                message: "Error hashing the password"
            })
        }

        const userData = new userModel({
            username: req.body['username'],
            fullname: req.body['fullname'],
            email: req.body['email'],
            birthyear: req.body['birthyear'],
            password: hash,
            isAdmin: false
        } as User)
        
        await userData.save()

        let JWTToken = generateJWTToken(userData['_id'])
        let refreshToken = generateRefreshToken(userData['_id'], JWTToken)

        await refreshToken.save()

        return res.status(200).header('Authorization', JWTToken).cookie('refreshToken', refreshToken['refreshToken']).json({
            status: res.statusCode,
            message: "Success registered the user",
            hash: {
                token: JWTToken,
                refresh_token: refreshToken['refreshToken']
            }
        })
    })
}