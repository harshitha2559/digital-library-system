package com.library.digitallibrary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.digitallibrary.entity.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    List<Book> findByCategoryIgnoreCase(String category);
}