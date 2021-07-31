import { Router } from "express"

const r: Router = Router()

import loginRoute from './login'
import registerRoute from './register'
import refreshRoute from './refresh'
r.post("/login", loginRoute)
r.post("/register", registerRoute)
r.get("/refresh", refreshRoute)

export = r