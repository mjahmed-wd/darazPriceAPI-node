const sgMail = require('@sendgrid/mail')
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
    to: 'mjahmedwd@gmail.com', // Change to your recipient
    from: 'mjahmed555@gmail.com', // Change to your verified sender
    subject: 'Price is dropped at your desired product',
    text: 'Check the product that you wanted to buy from daraz.com.bd',
    html: '<strong>Price is now below 100</strong>',
}

const sendEmail = ({
    name= "",
    to = 'mjahmedwd@gmail.com',
    from = 'mjahmed555@gmail.com',
    subject = 'Price is dropped at your desired product',
    text = 'Check the product that you wanted to buy from daraz.com.bd',
    html = '<strong>Price is now below 100</strong>',
}) => sgMail
    .send({ to, from, subject: `Price is dropped at ${name}`, text, html })
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })

module.exports = {
    sendEmail
}