"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendMessages(messages) {
    require("dotenv").config();
    const transporter = nodemailer_1.default.createTransport(`smtps://${process.env.USERNAME}:${process.env.PASSWORD}@mail.memorialacademy.org:25`);
    const sender = transporter.sendMail({
        from: "admin@memorialacademy.org",
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
