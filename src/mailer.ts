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

    // transporter.on("idle", () => {
    //     while (transporter.isIdle() && messages.length) {
    //         var message = messages.shift()!;
    //         transporter.sendMail({
    //             from: from,
    //             // to: message.to,
    //             to: "griffin.ferguson@memorialacademy.org",
    //             subject: message.subject,
    //             text: message.text,
    //             html: message.html
    //         }).finally(() => {
    //             console.log("sent message to " + message.to);
    //         });
    //         i++;
    //     }
    // })

    console.log("First email queued: to " + messages[0].to)

    const sender = setInterval(() => {
        if (messages.length > 0) {
            var message = messages.shift()!;
            transporter.sendMail({
                from: from,
                to: message.to,
                //to: "griffin.ferguson@memorialacademy.org",
                subject: message.subject,
                text: message.text,
                html: message.html
            }).finally(() => {
                console.log("sent message to " + message.to);
            });
        } else {
            console.log("done");
            transporter.close();
            clearInterval(sender);
        }
    }, 10000)

    // const sender = transporter.sendMail({
    //     from: from,
    //     to: "griffin.ferguson@memorialacademy.org",
    //     subject: messages[0].subject,
    //     text: messages[0].text,
    //     html: messages[0].html
    // })
}