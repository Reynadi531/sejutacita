import { Request, Response } from 'express'
import { userModel, User } from '../../models/userModel'

export default async function (req: Request, res: Response) {
    const data  = await userModel.find({})
    if (!data) return res.status(404).json({
        status: res.statusCode,
        message: "Not found the data"
    })
    return res.json(data)
}