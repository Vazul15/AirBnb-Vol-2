package com.codecool.restmates.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {
    private static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&+=]).{8,}$";

    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

     /*
     Validates a password based on specified criteria:
     - At least 8 characters long
     - At least one lowercase letter
     - At least one uppercase letter
     - At least one digit
     - At least one special character (!, @, #, $, %, ^, &, +, =)
     */
    public static boolean isValidPassword(String password) {
        if (password == null || password.isEmpty()) {
            return false;
        }
        Matcher matcher = PASSWORD_PATTERN.matcher(password);
        return matcher.matches();
    }

}
