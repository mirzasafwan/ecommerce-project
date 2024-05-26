const nodemailer = require('nodemailer')
const asyncHandler  = require('express-async-handler')

const sendEmail = asyncHandler(async(data,req,res)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.MAIL_ID,
          pass: process.env.MP,
        },
      });
      let info = await transporter.sendMail({
        from: '"Hey 👻" <akbar000701@gmail.com.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html // html body
      });
      // csmm rqgy cyfj geue
      console.log("Message sent: %s", info.messageId);
})
module.exports={sendEmail}