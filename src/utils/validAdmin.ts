import { userModel, User } from '../models/userModel'
import jwt from 'jsonwebtoken'

export default async function(token: string) {
    jwt.verify(token, String(process.env['SECRET_JWT']), async(err, decoded) => {
        if(err) {
            return console.log(err)
        }
        const data = userModel.findById(decoded['id'])
        if(data['isAdmin']) return true
        else return false
    })
}