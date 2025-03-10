import { error } from 'console';
import { Router, Response, Request } from "express";

import createUserController from "./controllers/user/createUserController";
import authServiceController  from "./controllers/user/authUserController";

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

/**
 * @swagger
 * /:
 *   post:
 *     summary: Autentica um usuário
 *     description: Endpoint para autenticar um usuário com email e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: O email do usuário.
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 description: A senha do usuário.
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação gerado.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Requisição inválida, email ou senha não fornecidos.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post('/auth', async (req: Request, res: Response) => {
    const authUser = new authServiceController();
    try {
        await authUser.handle;
    } catch (error) {
        if (error instanceof Error) {
            res.json({ error: error.message });
        }
    }
});


export { router }