import { Router } from "express"

const r: Router = Router()

import { CheckToken } from '../../utils/middleware'
r.use(CheckToken)

import getRoute from './get'
r.get('/', getRoute)

export = r