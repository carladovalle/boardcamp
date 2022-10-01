import express from "express";
import cors from "cors";

import categoriesRouter from "./Routes/categoriesRouter.js";
import gamesRouter from "./Routes/gamesRouter.js";
import customersRouter from "./Routes/customersRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

app.listen(4000, () => {
    console.log("Servidor rodando.")}
);