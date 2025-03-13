import prisma from "../../prisma";

interface getTaskRequest {
    title: string
}

class getAllTasks {
    async execute({ title }: getTaskRequest): Promise<{ title: string; id: string; completed: boolean; userId: string }[]> {
        const task = await prisma.task.findMany({
            where: {
                title: title,
            },
        });

        return task;
    }
}

export default getAllTasks


