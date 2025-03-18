import { Router, Response, Request } from "express";

import createUserController from "./controllers/user/createUserController";
import authServiceController from "./controllers/user/authUserController";

import createTaskController from "./controllers/task/createTaskController";
import getAllTaskController from "./controllers/task/getAllTaskController";
import updateTaskController from "./controllers/task/updateTaskController";
import deleteTaskController from "./controllers/task/deleteTaskController";

const router = Router();

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
        await newUser.handle(req,res)

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message })
        }

    }
})

/**
 * @swagger
 * /auth:
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
        await authUser.handle(req,res);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});


/**
 * @swagger
 * /task:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Endpoint para criar uma nova tarefa associada a um usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: O título da tarefa
 *                 example: "Minha nova tarefa"
 *               userId:
 *                 type: string
 *                 description: ID do usuário associado à tarefa
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único da tarefa criada
 *                   example: "6f84e72e-fb3b-11ec-a6c8-02b9d6637295"
 *                 title:
 *                   type: string
 *                   description: O título da tarefa
 *                   example: "Minha nova tarefa"
 *                 completed:
 *                   type: boolean
 *                   description: Status de conclusão da tarefa
 *                   example: false
 *                 userId:
 *                   type: string
 *                   description: ID do usuário associado
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: Dados da requisição inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/task', async (req: Request, res: Response) => {
    const newTask = new createTaskController();
    try {
        await newTask.handle(req, res);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     description: Endpoint para listar todas as tarefas cadastradas.
 *     responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único da tarefa.
 *                     example: "6f84e72e-fb3b-11ec-a6c8-02b9d6637295"
 *                   title:
 *                     type: string
 *                     description: Título da tarefa.
 *                     example: "Minha nova tarefa"
 *                   completed:
 *                     type: boolean
 *                     description: Status de conclusão da tarefa.
 *                     example: false
 *                   userId:
 *                     type: string
 *                     description: ID do usuário associado à tarefa.
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/tasks', async (req: Request, res: Response) => {
    const getTasks = new getAllTaskController();
    try {
        await getTasks.handle(req, res);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});

/**
 * @swagger
 * /task-update:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     description: Endpoint para atualizar o título de uma tarefa existente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da tarefa a ser atualizada.
 *                 example: "6f84e72e-fb3b-11ec-a6c8-02b9d6637295"
 *               title:
 *                 type: string
 *                 description: Novo título da tarefa.
 *                 example: "Título atualizado da tarefa"
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID da tarefa.
 *                   example: "6f84e72e-fb3b-11ec-a6c8-02b9d6637295"
 *                 title:
 *                   type: string
 *                   description: Título atualizado da tarefa.
 *                   example: "Título atualizado da tarefa"
 *                 completed:
 *                   type: boolean
 *                   description: Status da tarefa.
 *                   example: false
 *       400:
 *         description: Requisição inválida, ID ou título ausente.
 *       404:
 *         description: Tarefa não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.put("/task-update", async(req: Request,res: Response) => {
    const update = new updateTaskController()

    try{
        await update.handle(req,res)

    } catch(error){
        if(error instanceof Error){
            res.status(500).json({error: error.message})
        }
    }
})

/**
 * @swagger
 * /task-delete:
 *   delete:
 *     summary: Deleta uma tarefa existente
 *     description: Endpoint para deletar uma tarefa pelo ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID da tarefa a ser deletada.
 *                 example: "6f84e72e-fb3b-11ec-a6c8-02b9d6637295"
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de confirmação.
 *                   example: "Tarefa deletada com sucesso"
 *       400:
 *         description: Requisição inválida, ID ausente.
 *       404:
 *         description: Tarefa não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
router.delete("/task-delete", async(req:Request,res:Response) => {
    const deleteTask = new deleteTaskController();
    try{
        await deleteTask.handle(req,res)
    } catch(error){
        if(error instanceof Error){
            res.status(500).json({error: error.message})
        }
    }
})


export { router }