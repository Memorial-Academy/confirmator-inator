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
    setTimeout(() => {
        var message = messages.shift();
        console.log("simulating" + message.to);
    }, 20000);
}
exports.sendMessages = sendMessages;
