const express = require("express");

const Book = require("../models/book-model.js");

// create the router boject
const router = express.Router();

router.get("/books", (req, res, next) => {
  // whenever a user visits "/books"find all the books sorted by rating
  Book.find()
    .sort({ rating: -1 })
    .then(bookResults => {
      // send the database query results to the HBS file as "bookArray"
      res.locals.bookArray = bookResults;
      res.render("book-list.hbs");
    })
    // next(err) skips to the error handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

// Netflix style of addresses - PATH PARAMETERS
// http://localhost:5555/book/5c59928
router.get("/book/:bookId", (req, res, next) => {
  // res.send(req.params);
  const { bookId } = req.params;

  // find the book in the database using the ID from the address
  Book.findById(bookId)
    .then(bookDoc => {
      // send the database query results to the HBS file as "bookItem"
      res.locals.bookItem = bookDoc;
      res.render("book-details.hbs");
    })
    //
    .catch(err => next(err));
});

router.get("/book-add", (req, res, next) => {
  res.render("book-form.hbs");
});

router.post("/process-book", (req, res, next) => {
  const { title, author, description, rating } = req.body;
  // res.json(req.body);
  Book.create({ title, author, description, rating })
    .then(bookDoc => {
      // redirect if it's successful
      // (redirect ONLY to addresses - not to HBS files)
      res.redirect(`/book/${bookDoc._id}`);
    })
    // next(err) skips to the rerror handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

router.get("/book/:bookId/edit", (req, res, next) => {
  // get the ID from the address (it's inside of req.params)
  const { bookId } = req.params;

  // find the book in the DB using the ID from the address
  Book.findById(bookId)
    .then(bookDoc => {
      // send the database query result to the HBS file as "bookItem"
      res.locals.bookItem = bookDoc;
      res.render("book-edit.hbs");
    })
    // next(err) skips to the error handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

router.post("/book/:bookId/process-edit", (req, res, next) => {
  // res.json(req.body);
  const { bookId } = req.params;
  const { title, rating, description, author } = req.body;

  Book.findByIdAndUpdate(
    bookId, // ID of the document we want to update
    { $set: { title, rating, description, author } }, // changes to make to that document
    { runValidators: true } // additional settings (enforce the rules)
  )
    .then(bookDoc => {
      // ALWAYS redirect if it's successful to avoid DUPLICATE DATE on refresh
      // redirect ONLY to ADDRESSES - not HBS files
      res.redirect(`/book/${bookDoc._id}`);
    })
    // next(err) skips to the error handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

router.get("/book/:bookId/delete", (req, res, next) => {
  // res.json(req.body);
  const { bookId } = req.params;

  Book.findByIdAndRemove(bookId)
    .then(bookDoc => {
      res.redirect("/books");
    })
    // next(err) skips to the error handler in "bin/www" (error.hbs)
    .catch(err => next(err));
});

router.post("/book/:bookId/process-review", (req, res, next) => {
  const { bookId } = req.params;
  const { userFullName, reviewText } = req.body;

  Book.findByIdAndUpdate(
    bookId, // ID of the document we want to update
    { $push: { reviews: { userFullName, reviewText } } }, // changes to the document
    { runValidators: true } // additional settings (enforce the rules)
  )
    .then(bookDoc => {
      res.redirect(`/book/${bookDoc._id}`);
    })
    // next(err) skips to the error handler in "bin/www"
    .catch(err => next(err));
});

// share the router object with all the routes
module.exports = router;
