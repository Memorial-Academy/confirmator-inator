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
    var i = 0;
    transporter.on("idle", () => {
        if (i < messages.length) {
            const sender = transporter.sendMail({
                from: from,
                to: "griffin.ferguson@memorialacademy.org",
                subject: messages[i].subject,
                text: messages[i].text,
                html: messages[i].html
            });
            sender.finally(() => {
                console.log("sent message to " + messages[i].to);
            });
            i++;
        }
        else {
            transporter.close();
            console.log("done");
        }
    });
}
exports.sendMessages = sendMessages;
