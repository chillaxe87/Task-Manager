const sendGridAPIKey = process.env.SENDGRID_API_KEY

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(sendGridAPIKey)

// sgMail.send({
//     to: 'denpro87@gmail.com',
//     from: 'denpro87@gmail.com',
//     subject: " first email from node",
//     text: "check this out"
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: email,
        subject: 'Welcome to the app',
        text: `welcome to the app, ${name}.`
    })
}

const sendTerminateEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: email,
        subject: 'Why like this',
        text: `fuck off, ${name}.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendTerminateEmail
}