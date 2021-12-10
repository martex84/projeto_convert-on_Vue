import express from "express";
import cors from "cors";

import routes from "../routes.js"

export default function conectionServer() {
    const app = express();
    const porta = 3001

    app.listen(porta)
    app.use(express.json());
    app.use(cors());
    app.use(routes);

    app.listen(3030, () => {
        console.log(`Express Inicializado em :\n http://localhost:${porta}`)
    })

    return app;
}