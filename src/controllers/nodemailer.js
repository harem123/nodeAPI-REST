const nodemailer = require('nodemailer');

const dotenv = require('dotenv');

dotenv.config();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });



const hardCodedMail = {
  from: 'atomsasfreelance@gmail.com',
  to: 'cp1085275@gmail.com',
  subject: 'welcome to goalab',
  text: 'you are registered to goalab'
};

const sendEmail = (mailOptions) => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          //TODO review if is necessary send this 201 response
          res.status(201).send({status:"OK", response: info.response} );
        }
      });
}

module.exports = {
    
    sendEmail
  }