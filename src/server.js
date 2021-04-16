const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Configuraciones
app.set('port', 8010);
app.set("json spaces", 2);

//Rutas
app.use(require('./routes/index'));

//Iniciar Servidor
app.listen("8010", () => {
  console.log(`Servidor en puerto: ${app.get('port')}, A laburar!`);
});
