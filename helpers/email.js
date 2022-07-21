var nodemailer = require('nodemailer');

let mailerConfig = {
  host: 'mail.theparagonacademy.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: 'no-reply@theparagonacademy.com',
    pass: '3OCzs5]s3T@u',
  },
};

const transporter = nodemailer.createTransport(mailerConfig);

sendSingleEmail = (to, subject, body, callBack) => {
  const mailOptions = {
    from: mailerConfig.auth.user,
    to,
    subject,
    html: body,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log('error:', error);
      callBack(false);
      throw new Error('Email not sent');
      // reject(error);
    } else {
      console.log('Email has been sent');
      callBack(true);
      //   resolve(true);
    }
  });
};

emailTestLinkTemplate = (firstName, lastName, userTestLink) => {
  const htmlBody = `<body>
    Hello <br/>
    Mr/Ms <strong>${firstName || ''} ${lastName || ''}</strong>,
    <p>Here is the test link <a href="${userTestLink}">Click Here</a> </p>
    <hr/>
    <small>if above link is not working then use this link: ${userTestLink}</small>
    <body>`;

  return htmlBody;
};

module.exports = {
  sendSingleEmail,
  emailTestLinkTemplate,
};
