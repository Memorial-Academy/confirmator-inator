# Confirmator-inator

Method of sending confirmation to a bunch of parents by scraping a CSV  by row and taking values from predefined columns.

## To use:

This project uses Node.js and is designed to work with the GNU/Bash shell (again it's rough)

1. Install all dependencies with `npm i`

2. Download the CSV version of the sign up response spreadsheet and place it in a new directory called `data` (all file paths are relative to the project root)

3. Update the `row` variable in index.ts to indicate the starting row

4. Update the array index of the `data` variable to correspond with the correct columns (counting from 0)

5. Run `npm run build` to prepare directories/files and compile all messages (messages are output to `data/output`)