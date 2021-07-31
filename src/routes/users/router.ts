import { Router } from "express"

const r: Router = Router()

import { AdminCheck } from '../../utils/middleware'
r.use(AdminCheck)

import rootRoute from './get'
import rootidRoute from './get[id]'
import delRoute from './delete[id]'
import postRoute from './post'
import patchRoute from './patch'
r.get('/', rootRoute)
r.get('/:id', rootidRoute)
r.delete('/:id', delRoute)
r.post('/', postRoute)
r.patch('/:id', patchRoute)

export = r