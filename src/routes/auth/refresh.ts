import { Request, Response } from 'express'
import { validToken, generateJWTToken } from '../../utils/generateToken'
import { tokenModel, Token } from '../../models/tokenModel'

export default async function (req: Request, res: Response) {
    // Check if auth header exist
    if(!req.headers['authorization']) return res.status(400).json({
        status: res.statusCode,
        message: "Invalid header"
    })

    // Check if the request inlcuded refresh token cookie
    if (!req.cookies['refreshToken']) return res.status(400).json({
        status: res.statusCode,
        message: "Refresh token cookie not included"
    })

    // Check if token still valid
    const token = req.headers['authorization'].split(' ')[1]
    if (validToken(token)) return res.status(400).json({
        status: res.statusCode,
        message: "The token still valid"
    })

    // Generate new token
    tokenModel.findOne({ refreshToken: req.cookies['refreshToken'] } as Token, async(err, doc: Token) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                status: res.statusCode,
                message: "Error when obtain token data"
            })
        }

        if(!doc) {
            return res.status(400).json({
                status: res.statusCode,
                message: "Refresh token invalid"
            })
        }

        const JWTToken = generateJWTToken(doc['userId'])
        try {
            await tokenModel.updateOne({ refreshToken: req.cookies['refreshToken'] } as Token, { currentToken: JWTToken } as Token)
        } catch (error) {
            return res.status(500).json({
                status: res.statusCode,
                message: "Error at saving token"
            })            
        }
        return res.status(200).header('Authorization', JWTToken).json({
            status: res.statusCode,
            message: "Success obtain new token",
            hash: {
                token: JWTToken,
                refresh_token: req.cookies['refreshToken']
            }
        })
    })
}