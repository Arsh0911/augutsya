import React, { useState } from "react";
import axios from "axios";

export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // LOGIN API
        const res = await axios.post("/api/users/login", {
          email: formData.email,
          password: formData.password,
        });
        onAuthSuccess(res.data.user); // send user info back to parent
      } else {
        // REGISTER API
        const res = await axios.post("/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        onAuthSuccess(res.data.user);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="wc-auth">
      <h2 className="wc-title">{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit} className="wc-auth-form">
        {!isLogin && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="wc-msg error">{error}</p>}

        <button type="submit" className="wc-btn">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p className="wc-toggle">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          className="wc-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}
