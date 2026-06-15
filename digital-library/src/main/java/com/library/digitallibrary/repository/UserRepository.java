package com.library.digitallibrary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.digitallibrary.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
}