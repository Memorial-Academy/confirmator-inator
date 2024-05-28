"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = require("pug");
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const mailer_1 = require("./mailer");
const template = (0, pug_1.compileFile)("templates/letscode.pug");
var row = 2;
var messages = [];
fs_1.default.createReadStream("data/signup.csv")
    .pipe((0, csv_parse_1.parse)({ delimiter: ",", from_line: row, relax_quotes: true }))
    .on("data", data => {
    newMessage(data);
})
    .on("error", error => {
    console.error(error);
})
    .on("end", () => {
    (0, mailer_1.sendMessages)(messages, "Let's Code <letscode@memorialacademy.org>");
    console.log("ENDED at " + row);
});
function newMessage(data) {
    var options = {
        email: data[4],
        parent: data[3] == data[5] ? "parent of " + data[5] : data[3],
        student: data[5],
        course: data[8],
        session: process.argv[2] == "adv" ? "June 10 - 14 & June 17 - 21" : data[9]
    };
    var content = template(options);
    messages.push({
        to: options.email,
        subject: "Your Enrollment Confirmation - Let's Code",
        text: "Thanks for enrolling your student in Let's Code! This email confirms their enrollment.",
        html: content
    });
    row += 1;
}
