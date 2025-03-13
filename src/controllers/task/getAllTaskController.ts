import getAllTasks from "../../services/task/getAllTaskService";
import { Request, Response } from "express";

class getAllTaskController {
    async handle(req: Request, res: Response) {
        const getTasks = new getAllTasks();
        const { title } = req.body
        const task = getTasks.execute({
            title,
        })


        return res.json(task)
    }
}

export default getAllTaskController
