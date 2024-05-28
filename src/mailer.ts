import nodemailer from "nodemailer";

export interface Message {
    to: string,
    subject: string,
    text: string,
    html: string,
}

export function sendMessages(messages: Array<Message>, from: string): void {
    require("dotenv").config();
    const transporter = nodemailer.createTransport({
        host: "mail.memorialacademy.org",
        port: 25,
        secure: false,
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        },
        pool: true
    });
    // const transporter = nodemailer.createTransport(`smtp://${process.env.USERNAME}:${process.env.PASSWORD}@mail.memorialacademy.org:25`);


    var i = 0;

    transporter.on("idle", () => {
        if (i < messages.length) {
            const sender = transporter.sendMail({
                from: from,
                // to: messages[i].to,
                to: "griffin.ferguson@memorialacademy.org",
                subject: messages[i].subject,
                text: messages[i].text,
                html: messages[i].html
            });
            sender.finally(() => {
                console.log("sent message to " + messages[i].to);
            });
            i++;
        } else {
            transporter.close();
            console.log("done");
        }
    })

    // const sender = transporter.sendMail({
    //     from: from,
    //     to: "griffin.ferguson@memorialacademy.org",
    //     subject: messages[0].subject,
    //     text: messages[0].text,
    //     html: messages[0].html
    // })
}