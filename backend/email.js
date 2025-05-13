const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // Create the transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,  // Use port 587 for STARTTLS, or port 465 for SSL
        auth: {
            user: '826e9a60970810',  // Your Mailtrap SMTP username
            pass: '10ad80c3f7e2b3'      // Your Mailtrap SMTP password
        },
        secure: false, // set to true if using port 465 for SSL (otherwise, leave as false for STARTTLS on port 587)
        tls: {
            rejectUnauthorized: false // Ignore unauthorized TLS errors (in case of self-signed certs)
        }
    });

    const mailOptions = {
        from: 'Jaskaran Singh <jas@jas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html || `<p>${options.message}</p>`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.message); // Log only the error message
        throw error;
    }
};

module.exports = sendEmail;
