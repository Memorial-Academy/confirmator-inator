# Confirmator-inator

Method of sending confirmation emails to a bunch of parents by scraping a CSV row by row and taking values from predefined columns.

Please note this documentation (and most of this code) was written between 12a.m and 3a.m.

## Usage
Users sign up via Nextcloud Forms, which has it's results exported as a CSV. That CSV is renamed "signup.csv" and place in a folder called `data` in the project root.

If we want to send emails for Let's Code, we utilize the file `src/letscode.ts`. If we want to send emails for STEMpark, we utilize the file `src/stempark.ts`. `src/mailer.ts` is the script that does the leg work of connecting to our mail server and sending the emails.

I either `src/stempark.ts` or `src/letscode.ts`, we start by changing the value of the variable `row` (line 7 of either file) to the row we want to start on, with the first row (the header row) being row 1. If this is a new CSV file, we start on row 2. If we're resuming sending from an updated CSV, we set it to whatever row we ended on last time (the program will print "ended on <number>"; row will be equal to that number).

Since this requires an SMTP connection over port 25, Node, npm, and the necessary npm packages get installed on a server that has port 25 opened (in our case we used the VPS our mail server was already running on, as then the connection ran on the loopback). The CSV file also gets uploaded to the server. Then we run the command.
<br>

To send confirmation emails for Let's Code advanced classes: `node dist/letscode.js adv`

To send confirmation emails for Let's Code introductory classes: `node dist/letscode.js`

To send confirmation emails for STEMpark: `node dist/stempark.js`
<br>

The HTML is generated via the Pug templates stored in `templates/`, with one for each program.

## See it in action/advertisement
Sign up for [Let's Code](https://memorialacademy.org/letscode) and/or [STEMpark](https://memorialacademy.org/stempark) to get a confirmation email and see it in action!
