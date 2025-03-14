import { Request,Response } from "express";

import createUserService from "../../services/user/createUserService";


class createUserController {
    async handle(req:Request,res:Response) :Promise<Response>{
        const { email,name,password } = req.body;

        const newUser = new createUserService();

        const user = await newUser.execute({
            name,
            email,
            password

        })

        return res.json(user)

    }
}

export default createUserController