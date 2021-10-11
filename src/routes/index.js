const {Router} = require('express');
const router = Router();
const nodemailer = require('nodemailer')



const sendEmailUser = async (req, res)=>{
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
                pass: '#EnzoNico2021_'
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



router.post('/send-email', sendEmailUser)

module.exports = router;