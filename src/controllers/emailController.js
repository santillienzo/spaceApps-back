const nodemailer = require('nodemailer')
const {errorHandler} = require('../helpers/dberrorHandler');
const Email = require('../models/Emails');


//Enviar emails
exports.sendEmailUser = async (req, res)=>{
    console.log(req.body)
    const {name, email, phone, subject, message} = req.body;
    try {
        contentHTML = `
            <h1>Información de usuario</h1>
            <ul>
                <li>Nombre: ${name}</li>
                <li>Email: ${email}</li>
                <li>Teléfono: ${phone}</li>
            </ul>
            <br />
            <p>
            ${message}
            </p>
        `
        let transporter= nodemailer.createTransport({
            host: 'mail.spaceapps.com.ar',
            port: 465,
            secure: true,
            auth: {
                user: 'spaceapps@spaceapps.com.ar',
                pass: process.env.PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        let info = await transporter.sendMail({
            from: "'Space Apps Server' <spaceapps@spaceapps.com.ar>",
            to: 'spaceapps@spaceapps.com.ar',
            subject: `${subject}`,
            html: contentHTML
        });
        
        console.log('Message sent', info.messageId);
        console.log("Se envió la solicitud")
        
    } catch (error) {
        console.log("Aquí hay un error")
        console.log(error)
    }
    
}

//Subir a base de datos los emails
exports.createEmails = (req, res)=>{
    console.log(req.body);
    const email = new Email(req.body);
    email.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: `Aquí hay un error => ${errorHandler(err)}`
            })
        }
        res.json({data})
    })
}

//Read emails
exports.readEmails = (req, res)=>{
    Email.find().exec((err, data)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}

//Remove emails
exports.removeEmail = (req,res)=>{
    let email = req.email;
    email.remove((err, email)=>{
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            msg: "Email successfully deleted"
        });
    })
}

exports.emailById = (req, res, next, id)=>{
    Email.findById(id).exec((err, email)=>{
        if (err || !email) {
            return res.status(400).json({
                error: "Email was not found"
            });
        }
        req.email = email;
        next();
    })
}