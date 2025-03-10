import { error } from "console";
import prisma from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface authUserRequest {
    email: string
    password: string
}

class authUserService {
    async execute({ email, password }: authUserRequest) {

        if (!email || !password) {
            throw new Error("Inserir email e senha!")
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }

        })

        if (!user || !user.password) {
            throw new Error("Usuário não encontrado ou senha não definida!");
        }


        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Email ou password incorreto")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return token

    }
}

export default authUserService