import { Schema, model } from 'mongoose'

interface User extends Schema {
    _id: string;
    username: string;
    password: string;
    birthyear: number;
    fullname: string;
    email: string;
    isAdmin: boolean;
}

const user = new Schema<User>({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthyear: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const userModel = model<User>('user', user)

export { userModel, User }