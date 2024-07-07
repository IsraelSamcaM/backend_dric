import express from "express";
import cors from "cors"
//import morgan from "morgan";

const app = express();

var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));

//Import routes

import usuariosRoutes from "./routes/usuarios.routes.js";


// Middlewares

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
// Routes
//app.use(ambientesRoutes);

app.use("/api/usuarios", usuariosRoutes );

app.get("/", (req, res) => {
    res.json({ message: {
        title: "¡Bienvenido al backend para la problematicas de la DRIC!",
        description: "Gracias por usar nuestros servicios."
    }});
});

export default app;