const express = require("express");
const app = express();

let envio = require('../controller/correocontroller');

app.post('/envio',envio.envioCorreo);

module.exports = app;
