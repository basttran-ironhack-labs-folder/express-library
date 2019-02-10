# Express Library

README files are usually written in Markdown format

## File structure

- bin/ - files you run directly i the terminal
  - www/ - file we need to run toi start our app (it displays the error page)

* models/ - Mongoose model files
* public/ - Static files (just like before)
  - images/ - image files
  - javascripts/ - is for front end js
  - stylesheets/ - is for CSS
    styles.scss - ONLY EDIT THIS FILE (it's a SASS file)

- routes/ - where all the routes will be define ine multiple router files
  - index.js = contains home page toute and all the iformattion page routes

* views/ - HBS files (just like before)
  - index.hbs - home page
  - layout.hbs - layout file
  - not-found.hbs - 404 page
  - error.hbs -generic error page (not 404)
* .env - file for environment variables
  - PORT - change the server's port number here

- .gitignore - list of files/folder to NOT push on github
- app.js - connecting all the pieces of the app together
- package-lock.json - specific versions of all our npm packages (so everyone as the same version)
- package.json - list of all our npm packages AND our scripts
  -use "npm run-script dev" to run the app
- README.md = documentation of this project
=======
# express-library
