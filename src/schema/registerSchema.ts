import Joi, { Schema, object } from 'joi'

interface registerSchema {
    username: string;
    password: string;
    repeated_password: string;
    fullname: string;
    birthyear: number;
    email: string;
    repaetd_password: string;
}

const schema: Schema<registerSchema> = object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    fullname: Joi.string()
        .min(3)
        .max(30)
        .required(),
    birthyear: Joi.number()
        .min(1950)
        .max(2010)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    repeated_password: Joi.ref('password')
})

export = schema