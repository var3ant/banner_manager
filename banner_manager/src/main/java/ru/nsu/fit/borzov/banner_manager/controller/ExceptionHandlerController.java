package ru.nsu.fit.borzov.banner_manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import ru.nsu.fit.borzov.banner_manager.exception.ResponseException;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@ControllerAdvice
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExceptionHandlerController {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public List<String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        logError(ex,HttpStatus.BAD_REQUEST);
        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String errorMessage = error.getDefaultMessage();
            errors.add(errorMessage);
        });
        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public List<String> handleConstraintViolationExceptions(
            ConstraintViolationException ex) {
        logError(ex,HttpStatus.BAD_REQUEST);
        List<String> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach(error -> errors.add(error.getMessage()));
        return errors;
    }

    @ExceptionHandler(ResponseException.class)
    @ResponseBody
    public ResponseEntity<List<String>> handleResponseExceptions(
            ResponseException ex) {
        logError(ex,ex.getStatus());
        return new ResponseEntity<>(ex.getErrors(), ex.getStatus());
    }

    private void logError(Exception ex, HttpStatus status) {
        Logger.getLogger(this.getClass().getName()).info("exception: '" + ex.getMessage() + "' with status " + status.value());
    }
}
