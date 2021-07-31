import Joi, { Schema, object } from 'joi'

interface createSchema {
    username: string;
    password: string;
    fullname: string;
    birthyear: number;
    email: string;
    isAdmin: boolean;
}

const schema: Schema<createSchema> = object({
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
    isAdmin: Joi.boolean()
        .required()
})

export { schema, createSchema }