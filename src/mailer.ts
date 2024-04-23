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
    /* const transporter = nodemailer.createTransport({
        host: "mail.memorialacademy.org",
        port: 587,
        secure: false,
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        },
        // pool: true
    });*/
    const transporter = nodemailer.createTransport(`smtps://${process.env.USERNAME}:${process.env.PASSWORD}@mail.memorialacademy.org:25`);

    const sender = transporter.sendMail({
        from: "admin@memorialacademy.org",
        to: "griffin.ferguson@memorialacademy.org",
        subject: messages[0].subject,
        text: messages[0].text,
        html: messages[0].html
    })
    sender.finally(() => {
        console.log("sent");
        transporter.close();
    })
}