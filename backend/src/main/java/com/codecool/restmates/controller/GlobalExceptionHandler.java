package com.codecool.restmates.controller;

import com.codecool.restmates.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ResponseBody
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String resourceNotFoundExceptionHandler(ResourceNotFoundException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(EmailAlreadyExistsException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String emailAlreadyExistsExceptionHandler(EmailAlreadyExistsException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ResponseBody
    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public String unauthorizedExceptionHandler(UnauthorizedException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(ForbiddenException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String forbiddenExceptionHandler(ForbiddenException exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(InvalidEmailPattern.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String invalidEmailPatternExceptionHandler(InvalidEmailPattern exception) {
        return exception.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(InvalidPasswordPattern.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String invalidPasswordPatternExceptionHandler(InvalidPasswordPattern exception) {
        return exception.getMessage();
    }
}
