"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendMessages(messages, from) {
    require("dotenv").config();
    const transporter = nodemailer_1.default.createTransport({
        host: "mail.memorialacademy.org",
        port: 25,
        secure: false,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD,
        },
        pool: true
    });
    const sender = transporter.sendMail({
        from: from,
        to: "griffin.ferguson@memorialacademy.org",
        subject: messages[0].subject,
        text: messages[0].text,
        html: messages[0].html
    });
    sender.finally(() => {
        console.log("sent");
        transporter.close();
    });
}
exports.sendMessages = sendMessages;
