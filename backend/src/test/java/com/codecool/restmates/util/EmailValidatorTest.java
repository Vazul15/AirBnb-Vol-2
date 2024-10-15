package com.codecool.restmates.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class EmailValidatorTest {
    @Test
    void testUsingStrictRegex() {
        String emailAddress = "test@test.com";
        assertTrue(EmailValidator.isValidEmail(emailAddress));
    }
    @Test
    public void testValidEmailAddresses() {
        assertTrue(EmailValidator.isValidEmail("test@test.com"));
        assertTrue(EmailValidator.isValidEmail("test.test@test.com"));
        assertTrue(EmailValidator.isValidEmail("test_test@test.com"));
        assertTrue(EmailValidator.isValidEmail("test-test@test.com"));
        assertTrue(EmailValidator.isValidEmail("test123@test.com"));
        assertTrue(EmailValidator.isValidEmail("test@test.hu"));
    }

    @Test
    public void testInvalidEmailAddresses() {
        assertFalse(EmailValidator.isValidEmail("plainaddress"));
        assertFalse(EmailValidator.isValidEmail("@missingusername.com"));
        assertFalse(EmailValidator.isValidEmail("username@.com"));
        assertFalse(EmailValidator.isValidEmail("username@com"));
        assertFalse(EmailValidator.isValidEmail("username@domain..com"));
        assertFalse(EmailValidator.isValidEmail("username@domain.com."));
        assertFalse(EmailValidator.isValidEmail("username@-domain.com"));
        assertFalse(EmailValidator.isValidEmail("username@domain.c"));
        assertFalse(EmailValidator.isValidEmail(".username@domain.com"));
        assertFalse(EmailValidator.isValidEmail("username@domain.com."));
        assertFalse(EmailValidator.isValidEmail("user@domain..com"));
        assertFalse(EmailValidator.isValidEmail("user@domain.c@com"));
        assertFalse(EmailValidator.isValidEmail("user@domain.c@domain.com"));
        assertFalse(EmailValidator.isValidEmail("user@-domain.com"));
        assertFalse(EmailValidator.isValidEmail("user@domain.com."));
        assertFalse(EmailValidator.isValidEmail("user@domain..com"));
        assertFalse(EmailValidator.isValidEmail("user@domain.c"));
        assertFalse(EmailValidator.isValidEmail("user@.com"));
        assertFalse(EmailValidator.isValidEmail("user@com"));
        assertFalse(EmailValidator.isValidEmail("user@domain@domain.com"));
    }

    @Test
    public void testNullAndEmptyStrings() {
        assertFalse(EmailValidator.isValidEmail(null));
        assertFalse(EmailValidator.isValidEmail(""));
    }
}
