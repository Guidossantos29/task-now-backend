import { Router, Response, Request } from "express";

import createUserController from "./controllers/user/createUserController";

const router = Router()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Endpoint para criar um novo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/users', async (req: Request, res: Response) => {
    const newUser = new createUserController()
    try {
        await newUser.handle

    } catch (error) {
        if (error instanceof Error) {
            res.json({ error: error.message })
        }

    }
})

export { router }