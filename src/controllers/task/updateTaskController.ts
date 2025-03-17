import updateTaskService from "../../services/task/updateTaskService";
import { Request, Response } from "express";

class updateTaskController {
    async handle(req: Request, res: Response) {
        const { id, title } = req.body;

        const updateTask = new updateTaskService()

        const Task = updateTask.execute({
            id,
            title
        })

        return Task

    }


}

export default updateTaskController