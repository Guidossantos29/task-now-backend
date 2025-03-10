import { Request, Response } from "express";
import authUserService from "../../services/user/authUserService";

class authServiceController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body

        const authService = new authUserService()

        const user = await authService.execute({
            email,
            password
        })

        return user

    }
}


export default authServiceController 