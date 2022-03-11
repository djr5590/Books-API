// DEPENDENCIES
const Books = require("../models/books");
const asyncHandler = require("express-async-handler");

const getBooks = asyncHandler(async (req, res) => {
    const foundBooks = await Books.find();
    if (foundBooks) {
        res.status(200).json({ books: foundBooks });
    } else {
        res.status(404);
        throw new Error("Books not found");
    }
});

const getOneBook = asyncHandler(async (req, res) => {
    const foundBook = await Books.findById(req.params.id);
    if (foundBook) {
        res.status(200).json({ books: foundBook });
    } else {
        res.status(404);
        throw new Error("Book not found");
    }
});

const setBooks = asyncHandler(async (req, res) => {
    Books.create(req.body);
    res.status(200).json({ message: `Added New Book` });
});

const updateBooks = asyncHandler(async (req, res) => {
    const updateBook = await Books.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (updateBook) {
        res.status(201).json(updateBook);
    } else {
        res.status(400);
        throw new Error("Request unseccessful");
    }
});

const deleteBooks = asyncHandler(async (req, res) => {
    const deleteBook = await Books.findByIdAndDelete(req.params.id);
    if (deleteBook) {
        res.status(200).json({ messeage: `Deleted Book ${req.params.id}` });
    } else {
        res.status(400);
        throw new Error("Request unseccessful");
    }
});

module.exports = {
    getBooks,
    setBooks,
    updateBooks,
    deleteBooks,
    getOneBook,
};