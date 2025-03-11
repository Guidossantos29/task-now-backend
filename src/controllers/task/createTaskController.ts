import { Request,Response } from "express";
import createTaskService from "../../services/task/createTaskService";


class createTaskController {
    async handle(req:Request,res:Response){
        const createTask = new createTaskService();
        const { title,userId } = req.body

        
        const task = await createTask.execute({
            title,
            userId
        })

        return res.json(task)

    }
}

export default createTaskController