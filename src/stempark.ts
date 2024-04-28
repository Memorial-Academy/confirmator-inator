import {compileFile} from "pug";
import fs from "fs";
import {parse} from "csv-parse"
import { Message, sendMessages } from "./mailer";

const template = compileFile("templates/stempark.pug");
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
        sendMessages(messages, "STEMpark <stempark@memorialacademy.org>");
        console.log("ENDED at " + row);
    })

function newMessage(data: Array<String>): void {
    var options = {
        email: data[4],
        parent: data[3] == data[5] ? "parent of " + data[5] : data[3],
        student: data[5],
        session: "June 24 - 27"
    };
    var content = template(options);
    messages.push({
        to: (options.email as string),
        subject: "Your Enrollment Confirmation & Liability Waiver - STEMpark",
        text: "Thanks for enrolling your student in STEMpark! Please make sure to read and complete the included release of liability form.",
        html: content
    });
    row+=1;
}