import { Schema, model } from 'mongoose'

interface Token {
    refreshToken: string;
    currentToken: string;
    userId: string;
}

const token = new Schema<Token>({
    refreshToken: {
        type: String,
        required: true
    },
    currentToken: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const tokenModel = model<Token>('token', token)

export { tokenModel, Token }