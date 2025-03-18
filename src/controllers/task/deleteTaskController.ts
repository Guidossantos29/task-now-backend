import deleteTaskService from "../../services/task/deleteTaskService";
import { Request, Response } from "express";

class deleteTaskController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const deleteService = new deleteTaskService();

        const task = await deleteService.execute({
            id,
        })

        return res.json(task)
    }

}

export default deleteTaskController