import prisma from "../../prisma";

interface deleteTaskRequest {
    id: string
}

class deleteTaskService {
    async execute({ id }: deleteTaskRequest) {
        const task = await prisma.task.delete({
            where: {
                id: id,
            },
            
        })

        return task
    }
}

export default deleteTaskService