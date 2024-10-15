import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/forms/RegisterForm";

const createMember = async (member) => {
    const res = await fetch("/api/member/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(member),
    });
};

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleCreateMember = async (member) => {
        await createMember(member);
        navigate("/");
    };

    const handleNavigateLogin = () => {
        navigate("/login");
    };

    return (
        <RegisterForm onSave={handleCreateMember} onLogin={handleNavigateLogin} />
    );
};

export default RegisterPage;
