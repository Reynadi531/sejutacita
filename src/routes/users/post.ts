import { Request, Response } from 'express'
import { userModel, User } from '../../models/userModel'
import { schema, createSchema } from '../../schema/createSchema'
import { ValidationResult } from 'joi'
import { generateJWTToken, generateRefreshToken } from '../../utils/generateToken'
import bcrypt from 'bcrypt'

export default async function (req: Request, res: Response) {
    const validtest: ValidationResult = schema.validate(req.body)
    if (validtest['error']) return res.status(400).send(validtest['error'].details)

    const { username, password, fullname, email, isAdmin, birthyear }: createSchema = req.body

    const hash = await bcrypt.hash(password, Number(process.env['SALT_ROUND']))

    
    const data = new userModel({
        username: username,
        password: hash,
        birthyear: birthyear,
        fullname: fullname,
        email: email,
        isAdmin: isAdmin
    } as User)

    let JWTToken = generateJWTToken(data['_id'])
    let refreshToken = generateRefreshToken(data['_id'], JWTToken)

    await refreshToken.save()
    try {
        await data.save()
        return res.status(200).json({
            status: res.statusCode,
            message: "Success create new user data",
            user: data,
            hash: {
                token: JWTToken,
                refreshToken: refreshToken['refreshToken']
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: res.statusCode,
            message: "Error saving new user"
        })
    }
}