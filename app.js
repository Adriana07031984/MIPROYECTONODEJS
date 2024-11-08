import express from "express";
import trabajadoresRoutes from "./src/routes/trabajadores.routes.js";
import contactosRoutes from "./src/routes/contactos.routes.js";
import cors from 'cors';
import { formatoRta } from "./src/scripts/formatoRta.js"
import pkg from 'express-validator';
const { body, query, matchedData, validationResult, ExpressValidator, CustomValidationChain, ValidationChain } = pkg;

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());

app.listen(3000);
////////////////////////////////////////////////////////////////////////////////////////

app.use('/api', trabajadoresRoutes);
app.use('/api', contactosRoutes);


//por si se solicita un endpoint que no exista
app.use((req, res, next) => {
    console.log("peticion a ruta no encontrada...");
    res.status(404).json(formatoRta("", "endpoint no encontrada"));
})

export default app;