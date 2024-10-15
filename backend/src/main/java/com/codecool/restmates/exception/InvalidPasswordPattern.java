package com.codecool.restmates.exception;

public class InvalidPasswordPattern extends RuntimeException {
    public InvalidPasswordPattern(String message) {
        super(message);
    }
}
