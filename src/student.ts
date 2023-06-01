import {compileFile} from "pug";
import fs from "fs";
import {parse} from "csv-parse"

interface session {
    num: String,
    start: String,
    end: String,
    virtual: String
}

const template = compileFile("templates/student.pug");
var row = 59;

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
        email: data[2],
        parent: data[1] == data[6] ? "parent of " + data[6] : data[1],
        student: data[6],
        course: extendCourse(data[14]),
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

function extendCourse(course: String): String {
    if (course == "Intro to Game Dev w/ Scratch") return "Introduction to Game Development";
    else if (course == "Intro to Web Dev") return "Introduction to Web Development";
    else return course;
}