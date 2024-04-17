import nodemailer from "nodemailer";

export interface Message {
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
}

export function sendMessages(messages: Array<Message>): void {
    require("dotenv").config();
    const transporter = nodemailer.createTransport({
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
    })
    transporter.close();
    console.log("sent")
}