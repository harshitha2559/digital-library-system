import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const loginUser = {
      email,
      password,
    };

    fetch("http://localhost:8082/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUser),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Invalid Email or Password");
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          alert("Login Success");

          onLogin({
            name: data.name,
            email: data.email,
            role: data.role,
          });
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-info">
          <span>DIGITAL LIBRARY</span>

          <h1>Read. Borrow. Explore.</h1>

          <p>
            Manage your books, track borrow dates, save favorites,
            and explore your digital library in one place.
          </p>
        </div>

        <div className="login-card">
          <div className="logo-circle">📚</div>

          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue your library journey</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;