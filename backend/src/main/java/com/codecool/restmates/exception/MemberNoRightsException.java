package com.codecool.restmates.exception;

public class MemberNoRightsException extends RuntimeException {
    public MemberNoRightsException(String message) {
        super(message);
    }
}
