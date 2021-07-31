import { Request, Response } from 'express'
import { tokenModel, Token } from '../../models/tokenModel'
import { userModel, User } from '../../models/userModel'

export default async function (req: Request, res: Response) {
    if(!req.params['id']) return res.status(400).json({
        status: res.statusCode,
        message: "This route need id parameter"
    })

    // Try to delete the user
    userModel.findByIdAndDelete(req.params['id'], {}, async(err, doc: User) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                status: res.statusCode,
                message: "Failed delete specified user",
            })
        }
        if(!doc) return res.status(400).json({
            status: res.statusCode,
            message: "Not found the user id"
        })

        await tokenModel.findOneAndDelete({ userId: req.params['id'] } as Token)

        return res.status(200).json({
            status: res.statusCode,
            message: "Success delete specified user",
            user: req.params['id']
        })
    })
}