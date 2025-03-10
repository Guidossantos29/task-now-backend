import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./docs/swagger";
import dotenv from 'dotenv'; 
import { router } from "./routes";



dotenv.config()
const PORT = 3000

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router);
app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
