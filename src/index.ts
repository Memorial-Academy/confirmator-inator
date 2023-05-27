import {compileFile} from "pug";
import fs from "fs";
import {parse} from "csv-parse"

interface session {
    num: String,
    start: String,
    end: String,
    virtual: String
}

const template = compileFile("public/email.pug");
var row = 6;

fs.createReadStream("data/signup.csv")
    .pipe(parse({delimiter: ",", from_line: row}))
    .on("data", row => {
        newMessage(row);
    })
    .on("error", error => {
        console.error(error);
    })
    .on("end", () => {
        console.log("END");
    })

function newMessage(data: Array<String>): void {
    var options = {
        parent: data[1] == data[6] ? "parent of " + data[6] : data[1],
        student: data[6],
        course: data[14],
        lunch: lunchOption(data[9]),
        session: sessionParse(data[13])
    };
    var content = template(options);
    fs.writeFile("data/output/" + data[2] + row + ".html", content, error => console.error)
    row+=1;
}

function lunchOption(opt: String): String {
    if (opt == "Yes") return "will be able to receive a free lunch from Stratford";
    else return "are expected to bring their own lunch";
}

function sessionParse(session: String): session {
    if (session == "Session 1, June 5 - 9") {
        return {
            num: "one",
            start: "June 5",
            end: "June 8",
            virtual: "June 9"
        }
    }
    else return {
        num: "two",
        start: "June 12",
        end: "June 15",
        virtual: "June 16"
    }
}