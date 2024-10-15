package com.codecool.restmates.exception;

public class InvalidEmailPattern extends RuntimeException {
    public InvalidEmailPattern(String message) {
        super(message);
    }
}
