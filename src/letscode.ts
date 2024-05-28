import {compileFile} from "pug";
import fs from "fs";
import {parse} from "csv-parse"
import { Message, sendMessages } from "./mailer";

const template = compileFile("templates/letscode.pug");
var row = 2;
var messages: Array<Message> = [];

fs.createReadStream("data/signup.csv")
    .pipe(parse({delimiter: ",", from_line: row, relax_quotes: true}))
    .on("data", data => {
        newMessage(data);
    })
    .on("error", error => {
        console.error(error);
    })
    .on("end", () => {
        sendMessages(messages, "Let's Code <letscode@memorialacademy.org>");
        console.log("ENDED at " + row);
    })

function newMessage(data: Array<String>): void {
    var options = {
        email: data[4],
        parent: data[3] == data[5] ? "parent of " + data[5] : data[3],
        student: data[5],
        course: data[8],
        session: process.argv[2] == "adv" ? "June 10 - 14 & June 17 - 21" : data[9]
    };
    var content = template(options);
    //var dataURI = `data:text/html;base64,${Buffer.from(content).toString("base64")}`;
    //content = content.replace(`<div id=\"browser-view\"></div>`, `<a href="${dataURI}" target="_blank">Not loading correctly? Click here to open in a new window.</a>`)

    messages.push({
        to: (options.email as string),
        subject: "Your Enrollment Confirmation - Let's Code",
        text: "Thanks for enrolling your student in Let's Code! This email confirms their enrollment.",
        html: content
    });
    row+=1;
}