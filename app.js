const express = require ('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const path =require ('path');
const nodemailer =require ('nodemailer');


const app = express();

//view engine 
app.engine ('handlebars',exphbs());
app.set('view engine','handlebars');

//static folder 
app.use('/public',express.static(path.join(__dirname,'public')));

//bodyparser 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=> {
    res.render('contact')
});

app.post('/send',(req,res) => {
    const output = `<p> have a new requst </p>
    <h3>contact detiels </h3>
    <ul>
    <li>Name: ${req.body.name} </li>
    <li>Company: ${req.body.company} </li>
    <li>Email: ${req.body.email} </li>
    <li>Phone: ${req.body.phone} </li> 
    </ul> 
    <h3> ${req.body.message}</h3>
    `;
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secureConnection: false, // true for 465, false for other ports
    auth: {
        user: 'email ', // generated ethereal user
        pass: 'password'  // generated ethereal password
    },
    tls:{
        ciphers: 'SSLv3'      
    }
    
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"ALmashriq" <Accountant@almashriq.edu.sa>', // sender address
      to: 'mail', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
});

app.listen(3000,() => console.log('server started at Port 3000'));