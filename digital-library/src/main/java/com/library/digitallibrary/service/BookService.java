package com.library.digitallibrary.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.digitallibrary.entity.Book;
import com.library.digitallibrary.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository repo;

    // Get all books
    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    // Add book
    public Book addBook(Book book) {

        if (book.getStatus() == null) {
            book.setStatus("Available");
        }

        return repo.save(book);
    }

    // Get book by ID
    public Book getBookById(int id) {
        return repo.findById(id).orElse(null);
    }

    // Update book
    public Book updateBook(int id, Book book) {

        Book existingBook = repo.findById(id).orElse(null);

        if (existingBook != null) {

            existingBook.setTitle(book.getTitle());
            existingBook.setAuthor(book.getAuthor());
            existingBook.setCategory(book.getCategory());
            existingBook.setImageUrl(book.getImageUrl());

            return repo.save(existingBook);
        }

        return null;
    }

    // Delete book
    public String deleteBook(int id) {

        repo.deleteById(id);

        return "Book Deleted Successfully";
    }

    // Borrow book
    public String borrowBook(int id) {

        Book book = repo.findById(id).orElse(null);

        if (book != null) {

            book.setStatus("Borrowed");

            LocalDate today = LocalDate.now();
            LocalDate returnDay = today.plusDays(7);

            book.setBorrowDate(today.toString());
            book.setReturnDate(returnDay.toString());

            repo.save(book);

            return "Book Borrowed";
        }

        return "Book Not Found";
    }

    // Return book
    public String returnBook(int id) {

        Book book = repo.findById(id).orElse(null);

        if (book != null) {

            book.setStatus("Available");

            book.setBorrowDate(null);
            book.setReturnDate(null);

            repo.save(book);

            return "Book Returned";
        }

        return "Book Not Found";
    }

    // Search books
    public List<Book> searchBooks(String title) {
        return repo.findByTitleContainingIgnoreCase(title);
    }

    // Category filter
    public List<Book> getBooksByCategory(String category) {
        return repo.findByCategoryIgnoreCase(category);
    }
}