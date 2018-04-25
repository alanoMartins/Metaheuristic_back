import { Router } from 'express'
import board from './board'

const router = new Router()

router.use('/boards', board)

export default router
