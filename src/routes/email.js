const {Router} = require('express');
const router = Router();

const {sendEmailUser, createEmails, readEmails, removeEmail, emailById} = require('../controllers/emailController')

//Rutas
router.post('/send-email', sendEmailUser);
router.post('/create-email-bd', createEmails);
router.get('/read-email-bd', readEmails);
router.delete('/delete-email-bd/:emailId', removeEmail);

router.param('emailId', emailById);


module.exports = router;