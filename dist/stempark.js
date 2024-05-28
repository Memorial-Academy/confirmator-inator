"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pug_1 = require("pug");
const fs_1 = __importDefault(require("fs"));
const csv_parse_1 = require("csv-parse");
const mailer_1 = require("./mailer");
const template = (0, pug_1.compileFile)("templates/stempark.pug");
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
    (0, mailer_1.sendMessages)(messages, "STEMpark <stempark@memorialacademy.org>");
    console.log("ENDED at " + row);
});
function newMessage(data) {
    var options = {
        email: data[4],
        parent: data[3] == data[5] ? "parent of " + data[5] : data[3],
        student: data[5],
        session: "June 24 - 27"
    };
    var content = template(options);
    messages.push({
        to: options.email,
        subject: "Your Enrollment Confirmation & Liability Waiver - STEMpark",
        text: "Thanks for enrolling your student in STEMpark! Please make sure to read and complete the included release of liability form.",
        html: content
    });
    row += 1;
}
