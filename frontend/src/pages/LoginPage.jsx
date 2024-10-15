import React from "react";
import LoginForm from "../components/forms/LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleNavigateRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (memberEmailPassword) => {
    const { email, password } = memberEmailPassword;
    const success = await login(email, password);
    if (success) {
      navigate("/");
      console.log("Login successful");
    } else {
      console.log("Login failed!");
    }
  };

  return (
    <LoginForm onRegister={handleNavigateRegister} onLogin={handleLogin} />
  );
};

export default LoginPage;
