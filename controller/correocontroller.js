const {request, response} = require('express');
const nodeMailer = require('nodemailer'); // para hacer uso de nodemailer


const envioCorreo = (req=request, resp=response ) =>{
    let body = req.body; //bodyparser

    let config = nodeMailer.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        post:587,
        auth:{
            user:'cursoespecialcorreos@gmail.com',
            pass: 'nyjkzxmlwuenxgtl',
        }
    });

    const opciones = {
        from: body.nombre,
        subject: 'solicitud enviada',
        to: body.email,
        html: '<p>Recibimos tu solicitud, a la brevedad nos ponemos en contacto contigo. Atentamente Administrador del sitio <img src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Firma_de_Carlos_Fuentes.jpg" width="150px" height="200px"> <img src="https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg" width="200px" height="225px"> <p>'
    };

    config.sendMail(opciones, function(error,result){
        if(error)
            return resp.json({
                ok: false,
                msg: error
            });

        return resp.json({
            ok: true,
            msg: result
        });
        

    });
}

module.exports = {
    envioCorreo
}