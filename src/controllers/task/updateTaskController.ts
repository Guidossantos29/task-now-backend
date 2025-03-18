import updateTaskService from "../../services/task/updateTaskService";
import { Request, Response } from "express";

class updateTaskController {
    async handle(req: Request, res: Response) {
        const { id, title } = req.body;

        const updateTask = new updateTaskService()

        const task = updateTask.execute({
            id,
            title
        })

        return res.json(task)

    }


}

export default updateTaskController