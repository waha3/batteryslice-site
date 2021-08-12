'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class MailService extends Service {
  async send(data, dic) {
    const transporter = nodemailer.createTransport({
      //   service: '"Outlook365"',
      host: 'smtp.office365.com',
      port: 587,
      secureConnection: false,
      auth: {
        user: 'hanxin1956@gmail.com',
        pass: 'Hanxin1956_',
      },
      tls: { ciphers: 'SSLv3' },
    });

    const formatToHtml = (json = {}, dic = {}) => {
      return Object.keys(json)
        .filter(key => Object.prototype.hasOwnProperty.call(dic, key))
        .map(key => `<p>${dic[key]}: ${json[key]}</p>`)
        .join('<br />');
    };

    const mailOptions = {
      from: 'outlook_23B992D408EFCDF5@outlook.com', // sender address
      to: '895240740@qq.com',
      subject: '订单',
      html: formatToHtml(data, dic),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log('Message sent: %s', info.messageId);
    });
  }
}

module.exports = MailService;
