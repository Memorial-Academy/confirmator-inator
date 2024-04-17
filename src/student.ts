import {compileFile} from "pug";
import fs from "fs";
import {parse} from "csv-parse"
import { Message, sendMessages } from "./mailer";

const template = compileFile("templates/student.pug");
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
        sendMessages(messages);
        console.log("ENDED at " + row);
    })

function newMessage(data: Array<String>): void {
    var options = {
        email: data[4],
        parent: data[3] == data[5] ? "parent of " + data[5] : data[3],
        student: data[5],
        course: data[8],
        session: data[13]
    };
    var content = template(options);
    messages.push({
        from: "letscode@memorialacademy.org",
        to: (options.email as string),
        subject: "You're Enrollment Confirmation - Let's Code",
        text: "Thanks for enrolling your student in Let's Code!",
        html: content
    });
    row+=1;
}