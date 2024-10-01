import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { swaggerUi, swaggerSpec } from "./utilities/swaggerConfig.js";


const app = express();

var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));

const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: 'Hemos recibido demasiadas solicitudes de esta IP. Espere 1 hora'
});

//Import routes

import usuariosRoutes from "./routes/usuarios.routes.js";
import solicitantesRoutes from "./routes/solicitantes.routes.js";
import carrerasRoutes from "./routes/carreras.routes.js";
import problematicasRoutes from "./routes/problematicas.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

// Middlewares

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/api', limiter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
//app.use(ambientesRoutes);

app.use("/api/usuarios", usuariosRoutes );
app.use("/api/solicitantes", solicitantesRoutes );
app.use("/api/carreras", carrerasRoutes );
app.use("/api/problematicas", problematicasRoutes );
app.use('/api', dashboardRoutes);

app.get("/", (req, res) => {
    res.json({ message: {
        title: "¡Bienvenido al backend para la problematicas de la DRIC!",
        description: "Gracias por usar nuestros servicios."
    }});
});

export default app;