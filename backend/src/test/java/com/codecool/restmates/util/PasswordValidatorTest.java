package com.codecool.restmates.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PasswordValidatorTest {
    @Test
    public void testValidPassword() {
        assertTrue(PasswordValidator.isValidPassword("Password1@"), "Password should be valid.");
        assertTrue(PasswordValidator.isValidPassword("Valid123!"), "Password should be valid.");
        assertTrue(PasswordValidator.isValidPassword("Passw0rd@123"), "Password should be valid.");
        assertTrue(PasswordValidator.isValidPassword("A1@abcdefgh"), "Password should be valid.");
    }

    @Test
    public void testInvalidPassword() {
        assertFalse(PasswordValidator.isValidPassword("password"), "Password should be invalid (missing uppercase, digit, special character).");
        assertFalse(PasswordValidator.isValidPassword("PASSWORD"), "Password should be invalid (missing lowercase, digit, special character).");
        assertFalse(PasswordValidator.isValidPassword("12345678"), "Password should be invalid (missing letters, special character).");
        assertFalse(PasswordValidator.isValidPassword("Password!"), "Password should be invalid (missing digit).");
        assertFalse(PasswordValidator.isValidPassword("Pass1@"), "Password should be invalid (less than 8 characters).");
        assertFalse(PasswordValidator.isValidPassword("!@#12345"), "Password should be invalid (missing letters).");
        assertFalse(PasswordValidator.isValidPassword(""), "Password should be invalid (empty string).");
        assertFalse(PasswordValidator.isValidPassword(null), "Password should be invalid (null string).");
    }
}