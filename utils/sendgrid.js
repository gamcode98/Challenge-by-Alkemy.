const sgMail = require("@sendgrid/mail");
const { config } = require("../config/config");

sgMail.setApiKey(config.sendGridApiKey);
module.exports = sgMail;
