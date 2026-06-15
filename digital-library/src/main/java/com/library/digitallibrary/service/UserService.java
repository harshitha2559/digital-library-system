package com.library.digitallibrary.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.digitallibrary.entity.User;
import com.library.digitallibrary.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public User addUser(User user) {
        return repo.save(user);
    }

    public String registerUser(User user) {
        User existingUser = repo.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "Email already registered";
        }

        if (user.getRole() == null) {
            user.setRole("STUDENT");
        }

        repo.save(user);
        return "User Registered Successfully";
    }

    public User login(User user) {
        List<User> users = repo.findAll();

        for (User u : users) {
            if (u.getEmail().equals(user.getEmail()) &&
                u.getPassword().equals(user.getPassword())) {
                return u;
            }
        }

        return null;
    }
}