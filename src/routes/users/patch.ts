import { Request, Response } from 'express'
import { userModel, User } from '../../models/userModel'
import { schema, updateSchema } from '../../schema/updateSchema'
import { ValidationResult } from 'joi'
import bcrypt from 'bcrypt'

export default async function (req: Request, res: Response) {
    if(!req.params['id']) return res.status(400).json({
        status: res.statusCode,
        message: "Id parameter not included"
    })

    const validtest: ValidationResult = schema.validate(req.body)
    if (validtest['error']) return res.status(400).send(validtest['error'].details)

    userModel.findById(req.params['id'], async(err, doc: User) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                status: res.statusCode,
                message: "Error ocure finding specific user id"
            })
        }

        if(!doc) return res.status(404).json({
            status: res.statusCode,
            message: "Not found the specify user"
        })

        if(req.body['password']) {
            const hashed = await bcrypt.hash(req.body['password'], Number(process.env['SALT_ROUND']))
            req.body['password'] = hashed
        }

        userModel.update({ _id: req.params['id'] }, req.body, {}, async(err, doc) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    status: res.statusCode,
                    message: "Error updating user data"
                })
            }

            return res.status(200).json({
                status: res.statusCode,
                message: "Success update user data",
                user: doc
            })
        })
    })
}