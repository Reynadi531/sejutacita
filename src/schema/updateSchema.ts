import Joi, { Schema, object } from 'joi'

interface updateSchema {
    username: string;
    password: string;
    fullname: string;
    birthyear: number;
    email: string;
    isAdmin: boolean;
}

const schema: Schema<updateSchema> = object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    fullname: Joi.string()
        .min(3)
        .max(30),
    birthyear: Joi.number()
        .min(1950)
        .max(2010),
    email: Joi.string()
        .email({ minDomainSegments: 2 }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    isAdmin: Joi.boolean()
        
})

export { schema, updateSchema }