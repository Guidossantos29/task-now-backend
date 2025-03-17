import prisma from "../../prisma";

interface UpdateTaskRequest {
    id:string
    title:string
}

class updateTaskService {

    async execute({ title,id }: UpdateTaskRequest){

        const task = await prisma.task.findUnique({
            where:{
                id
            }
        })

        if(!task){
            throw new Error("Task não encontrada")

        }

        const updateTask = await prisma.task.update({
            where:{
                id
            },
            data:{
                title
            }
        })
        return updateTask
    }

}

export default updateTaskService