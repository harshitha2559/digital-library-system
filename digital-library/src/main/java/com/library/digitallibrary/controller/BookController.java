package com.library.digitallibrary.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.library.digitallibrary.entity.Book;
import com.library.digitallibrary.service.BookService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/api/books")
    public List<Book> getBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/addsample")
    public String addSample() {
        Book b = new Book();
        b.setTitle("Spring Boot");
        b.setAuthor("Rod Johnson");
        b.setCategory("Programming");
        bookService.addBook(b);
        return "Book Added";
    }

    @PostMapping("/api/books")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @GetMapping("/api/books/{id}")
    public Book getBook(@PathVariable("id") int id) {
        return bookService.getBookById(id);
    }

    @PutMapping("/api/books/{id}")
    public Book updateBook(@PathVariable("id") int id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/api/books/{id}")
    public String deleteBook(@PathVariable("id") int id) {
        return bookService.deleteBook(id);
    }

    @GetMapping("/api/books/borrow/{id}")
    public String borrowBook(@PathVariable("id") int id) {
        return bookService.borrowBook(id);
    }

    @GetMapping("/api/books/return/{id}")
    public String returnBook(@PathVariable("id") int id) {
        return bookService.returnBook(id);
    }

    @GetMapping("/api/books/search")
    public List<Book> searchBooks(@RequestParam("title") String title) {
        return bookService.searchBooks(title);
    }

    @GetMapping("/api/books/category/{category}")
    public List<Book> getBooksByCategory(@PathVariable("category") String category) {
        return bookService.getBooksByCategory(category);
    }
    
}