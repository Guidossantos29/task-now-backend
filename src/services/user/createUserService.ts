import prisma from "../../prisma";
import { hash } from "bcryptjs"

interface AuthUserRequest {
    name: string
    email: string;
    password: string;
}

class createUserService {
    async execute({ name,email,password }: AuthUserRequest){
        if(!email){
            throw new Error("Inserir email");
        }

        const emailExists = await prisma.user.findUnique({
            where:{
                email:email
            }
        })

        if(emailExists){
            throw new Error("Email já cadastrado!")
        }

        const passwordHash = await hash(password,8)

        const user = await prisma.user.create({
            data:{
                name:name,
                email:email,
                password:passwordHash,

            }, select:{
                name:true,
                email:true,
            }
        })

        return user
    }
}

export default createUserService