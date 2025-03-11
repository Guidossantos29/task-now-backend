import prisma from "../../prisma";

interface taskRequest {
    title: string
    userId: string
}


class createTaskService {
    async execute({ title, userId }: taskRequest) {
        if (!title || !userId){
            throw new Error("Título e User ID são obrigatórios!")
        }

        const task = await prisma.task.create({
            data:{
                title,
                userId,
            },
            select:{
                title:true
            }
        })

        return task
    }
}

export default createTaskService