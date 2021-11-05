import { Router } from 'express';
import { UnknownBookError } from '../errors/unknown-book.error';
import { BooksService } from '../services/books.service';
import auth from '../middlewares/auth.middleware';
import role from '../middlewares/role.middleware';
const booksRouter = Router();

const booksService = new BooksService();


/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 */
booksRouter.get('/', (req, res) => {
    const books = booksService.getAllBooks(req.query);
    res.status(200).send(books);
})


/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 */
booksRouter.post('/', auth, role(["administrator, salesman"]), (req, res) => {
    try {
        booksService.createBook(req.body)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

/**
 * @openapi
 * /books/{bookID}:
 *   put:
 *     summary: Update a book
 */
booksRouter.put('/:bookID', auth, role(["administrator, salesman"]), (req, res) => {
    try {
        booksService.updateBook(req.body);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

/**
 * @openapi
 * /books/{bookID}/comments:
 *   post:
 *     summary: Add a comment to a book
 */
booksRouter.post('/:bookID/comments', auth, (req, res) => {
    try {
        const comment = booksService.addBookComment(req.params.bookID, req.body);
        res.send(comment)
    } catch (error) {
        res.status(400).send(error.message);
    }
})

export default booksRouter;