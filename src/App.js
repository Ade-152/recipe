import { useState } from "react";
import "./App.css";
import Home from "./component/home";
function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("")

  const [account, setAccount] = useState(() => {
  const savedAccount = localStorage.getItem("tasteAccount");
  return savedAccount ? JSON.parse(savedAccount) : null;});
  function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name?.value?.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    if (isLogin) {
      if (
        account &&
        account.email === email &&
        account.password === password
      ) {
        setCurrentUser(account.name);
        setMessage("");
      } else {
        setMessage("Invalid email or password.");
      }
    } else {
      if (account && account.email === email) {
        setMessage("This email is already registered.");
        return;
      }
     const newAccount = {
  name,
  email,
  password,
};

setAccount(newAccount);

localStorage.setItem(
  "tasteAccount",
  JSON.stringify(newAccount)
);
      setMessage("Account created successfully! Please log in.");
      setIsLogin(true);
    }
  }
  function handleLogout() {
    setCurrentUser("");
    setIsLogin(true);
    setMessage("");
  }
  if (currentUser) {
  return (
    <Home
      currentUser={currentUser}
      onLogout={handleLogout}
    />
  );
}
  return (
    <div className="auth-container">
      <div className="auth-image">
        <div className="image-overlay">
          <h1>TASTE TREASURES</h1>
          <p>DISCOVER. CREATE. SAVOR.</p>
          <div className="image-text">
            <h2>Good food.<br />Beautiful moments.</h2>
            <p>
              Every dish tells a story.
              Discover recipes worth remembering.
            </p>
          </div>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="auth-form">

          <div className="form-logo">
            <h2>TASTE TREASURES</h2>
            <p>Every dish tells a story.</p>
          </div>
          <div className="form-heading">
            <h1>
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>

            <p>
              {isLogin
                ? "Sign in to discover something delicious."
                : "Join us and discover your next favorite meal."}
            </p>
          </div>
          <div className="auth-tabs">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(true);
                setMessage("");
              }}
            >
              Login
            </button>
            <button
              className={!isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(false);
                setMessage("");
              }}
            >
              Create Account
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                minLength="6"
                required
              />
            </div>

            {isLogin && (
              <div className="forgot-password">
                <a href="#forgot">Forgot password?</a>
              </div>
            )}

            {message && (
              <p className="form-message">
                {message}
              </p>
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          <p className="form-footer">
            {isLogin
              ? "New to Taste Treasures? "
              : "Already have an account? "}
            <span
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin ? "Create an account" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;