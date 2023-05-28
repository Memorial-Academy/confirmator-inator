"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = require("pug");
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const template = (0, pug_1.compileFile)("public/email.pug");
var row = 6;
fs_1.default.createReadStream("data/signup.csv")
    .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: row }))
    .on("data", row => {
    newMessage(row);
})
    .on("error", error => {
    console.error(error);
})
    .on("end", () => {
    console.log("END");
});
function newMessage(data) {
    var options = {
        email: data[2],
        parent: data[1] == data[6] ? "parent of " + data[6] : data[1],
        student: data[6],
        course: extendCourse(data[14]),
        lunch: lunchOption(data[9]),
        session: sessionParse(data[13])
    };
    var content = template(options);
    fs_1.default.writeFile("data/output/" + data[2] + row + ".html", content, error => console.error);
    row += 1;
}
function lunchOption(opt) {
    if (opt == "Yes")
        return "will be able to receive a free lunch from Stratford";
    else
        return "are expected to bring their own lunch";
}
function sessionParse(session) {
    if (session == "Session 1, June 5 - 9") {
        return {
            num: "one",
            start: "June 5",
            end: "June 8",
            virtual: "June 9"
        };
    }
    else
        return {
            num: "two",
            start: "June 12",
            end: "June 15",
            virtual: "June 16"
        };
}
function extendCourse(course) {
    if (course == "Intro to Game Dev w/ Scratch")
        return "Introduction to Game Development";
    else if (course == "Intro to Web Dev")
        return "Introduction to Web Development";
    else
        return course;
}
