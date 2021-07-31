import jwt from 'jsonwebtoken'
import { tokenModel } from '../models/tokenModel'
import { nanoid } from 'nanoid'

function validToken(token: string) {
    let returnValue: boolean;
    jwt.verify(token, String(process.env["SECRET_JWT"]), (err, decoded) => {
        returnValue = err && decoded == undefined ? false : true
    });
    return returnValue
}

function generateJWTToken(userid: string) {
    const JWTToken = jwt.sign({
        id: userid
    }, String(process.env["SECRET_JWT"]), {
        expiresIn: '1h'
    })

    return JWTToken
}

function generateRefreshToken(user: string, currentToken: string) {
    const randomString: string = nanoid(32)
    
    return new tokenModel({
        refreshToken: randomString,
        userId: user,
        currentToken: currentToken
    })
}

export { generateJWTToken, generateRefreshToken, validToken }