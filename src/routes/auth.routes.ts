import { Router } from 'express'

import authMiddleware from '../middlewares/auth'
// import * as controllers from '../controllers/auth.controller'

const router = Router()


// router.get('/', controllers.selectAllUsers)

// router.post('/signin', controllers.signInUser)

// router.post('/login', controllers.logInUser)

// router.delete('/', authMiddleware, controllers.deleteUser)


router.get('/pod', (req: Request, res: any) => {
    res.status(418).send('Я не кавоварка!')
})

export default router