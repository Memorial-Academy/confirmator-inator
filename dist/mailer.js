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
    console.log("First email queued: to " + messages[0].to);
    const sender = setInterval(() => {
        if (messages.length > 0) {
            var message = messages.shift();
            transporter.sendMail({
                from: from,
                to: message.to,
                subject: message.subject,
                text: message.text,
                html: message.html
            }).finally(() => {
                console.log("sent message to " + message.to);
            });
        }
        else {
            console.log("done");
            transporter.close();
            clearInterval(sender);
        }
    }, 10000);
}
exports.sendMessages = sendMessages;
