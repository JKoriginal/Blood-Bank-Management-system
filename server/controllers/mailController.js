import transporter from '../config/mailConfig.js'

const sendMail = (req,res) => {
    const { recipients, subject, text } = req.body;

    const mailOptions = {
        from: 'Blood Bank Notification <connect.bbms@gmail.com>',
        to: recipients,
        subject: subject,
        text: text,
        replyTo: 'noreply@example.com'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error.message);
            res.status(500).send('Error occurred while sending email.');
        } else {
            console.log('Message sent successfully!');
            res.status(200).send('Email sent successfully!');
        }
    });
}

export default sendMail;