import app from "./src/app.js";
import { sequelize } from "./src/database/database.js";

// import './src/models/Usuario.js'
// import './src/models/Carrera.js'
// import './src/models/Solicitante.js'
// import './src/models/Problematica.js'
// import './src/models/Auxiliar.js'
// import './src/models/Publicacion.js'

async function main() {
    //await sequelize.sync({alter: true});
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

}

main();