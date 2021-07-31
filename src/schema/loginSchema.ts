import Joi, { Schema, object } from 'joi'

interface loginSchema {
    username: string;
    password: string;
}

const schema: Schema<loginSchema> = object({
    username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

export = schema