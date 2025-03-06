import express,{ Router } from "express";
import dotenv from 'dotenv'; 

dotenv.config()
const PORT = 3000

const app = express()

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`);
})


export const router = Router();

