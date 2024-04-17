"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendMessages(messages) {
    require("dotenv").config();
    const transporter = nodemailer_1.default.createTransport({
        host: "mail.memorialacademy.org",
        port: 465,
        secure: false,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
        },
        pool: true
    });
    transporter.sendMail({
        from: "letscode@memorialacademy.org",
        to: "griffin.ferguson@memorialacademy.org",
        subject: messages[0].subject,
        text: messages[0].text,
        html: messages[0].html
    });
    transporter.close();
    console.log("sent");
}
exports.sendMessages = sendMessages;
