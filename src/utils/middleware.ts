import { Request, Response, NextFunction } from 'express'
import { validToken } from './generateToken'
import isAdmin from './validAdmin'

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
    res.status(500);
    if (process.env.NODE_ENV != 'production') {
        res.json({
            status: res.statusCode,
            message: error.message,
            erorr:  error.stack
        });
    } else {
        res.json({
            status: res.statusCode,
            message: error.message
        });
    }
}


export function AdminCheck(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) return res.status(400).json({
        status: res.statusCode,
        message: "Invalid header"
    })

    const token = req.headers['authorization'].split(' ')[1]
    if (!validToken(token)) {
        return res.status(400).json({
            status: res.statusCode,
            message: "Invalid token"
        })
    }

    if(!isAdmin(token)) {
        return res.status(403).json({
            status: res.statusCode,
            message: "You dont have permission to access this route"
        })
    }

    next()
}

export function CheckToken(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) return res.status(400).json({
        status: res.statusCode,
        message: "Invalid header"
    })

    const token = req.headers['authorization'].split(' ')[1]
    if (!validToken(token)) {
        return res.status(400).json({
            status: res.statusCode,
            message: "Invalid token"
        })
    }

    next()
}