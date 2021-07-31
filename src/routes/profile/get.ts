import { Request, Response } from 'express'
import { userModel, User } from '../../models/userModel'
import jwt from 'jsonwebtoken'

export default async function (req: Request, res: Response) {
    const token = req.headers['authorization'].split(' ')[1]

    const decoded = await jwt.decode(token)
    const data = await userModel.findById(decoded['id'])
    
    if(!data) {
        return res.status(404).json({
            status: res.statusCode,
            message: "Not found your profile"
        })
    }

    const abletosend = ({ username, fullname, email, birthyear, isAdmin, _id }: User) => ({ username, fullname, email, birthyear, isAdmin, id: _id })
    return res.json(abletosend(data))
}