import express, { Application } from 'express'
import morgan from 'morgan'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import cookieparser from 'cookie-parser'

const app: Application = express()

if(process.env.NODE_ENV != 'production') {
    app.use(morgan("dev"))
    config()
}
app.use(express.json())
app.use(cookieparser())

mongoose.connect(String(process.env['MONGO_URI']), { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) {
        return console.log(err)
    } 
    console.log('Database connected')
})

import authRoute from './routes/auth/router'
import userRoute from './routes/users/router'
import profileRoute from './routes/profile/router' 
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/profile", profileRoute)

import { errorHandler } from './utils/middleware'
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`)
})