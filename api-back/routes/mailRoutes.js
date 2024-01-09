require('dotenv').config();
const auth = require('../auth');
const nodemailer = require('nodemailer');

module.exports = (app, db) => {
// Route d'envoi de mail de confirmation de commande
app.post('/api/rsv1/sendOrderStatusMail', auth, async (req, res, next) => {
  const { email, order_id, orderStatus } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // mdp d'application 
    }
  });

  const mailOptions = {
    from: 'tresorerie.rabbitskulls@gmail.com',
    to: email,
    subject: 'Confirmation de commande',
    text: `Votre commande numéro ${order_id} est ${orderStatus}. Le Terrier est en Joie ♥ ! `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ status: 200, msg: 'E-mail de confirmation de commande envoyé' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail de confirmation de commande' });
  }
});
}