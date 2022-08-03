const express = require('express')
const user = require('../user.model'); 
const connection = require("../conexion");
const { body, param, validationResult } = require('express-validator'); 
var router = express.Router();
router.get('/user', [], (req, res) => { user.getAll(connection, (data => {
res.json(data); }))
}); router.post('/user', [
body('id').not().isEmpty().isString(),
body('nombrecomp').not().isEmpty().isString(), 
body('fecha').not().isEmpty().isString(), 
body('giro').not().isEmpty().isString(),
body('puesto').not().isEmpty().isString(),
body('experiencia').not().isEmpty().isString(),
body('modalidad').not().isEmpty().isString(),
body('sueldo').not().isEmpty().isString()
], (req, res) => {
const errors = validationResult(req); if (!errors.isEmpty()) {
res.json({success:false,err:JSON.stringify(errors)})
return
}
let body = req.body; user.create(connection, body, (data => {
res.json(data); }))
});
module.exports = router;