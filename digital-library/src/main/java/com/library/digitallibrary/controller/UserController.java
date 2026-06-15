package com.library.digitallibrary.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.digitallibrary.entity.User;
import com.library.digitallibrary.service.UserService;
import java.util.HashMap;
import java.util.Map;
import com.library.digitallibrary.JwtUtil;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User loggedUser = userService.login(user);

        if (loggedUser != null) {

            String token = JwtUtil.generateToken(loggedUser.getEmail());

            Map<String, Object> response = new HashMap<>();

            response.put("token", token);
            response.put("name", loggedUser.getName());
            response.put("email", loggedUser.getEmail());
            response.put("role", loggedUser.getRole());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401)
                .body("Invalid Email or Password");
    }

    @GetMapping("/addsample")
    public String addSampleUser() {
        User u = new User();

        u.setName("Harshitha");
        u.setEmail("harshi@gmail.com");
        u.setPassword("1234");
        u.setRole("STUDENT");

        userService.addUser(u);

        return "User Added";
    }
}