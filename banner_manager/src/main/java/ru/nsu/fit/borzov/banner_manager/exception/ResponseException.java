package ru.nsu.fit.borzov.banner_manager.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Data
public class ResponseException extends Exception {
    private final HttpStatus status;
    private final List<String> errors;

    private static String listToString(List<String> errors) {
        StringBuilder sb = new StringBuilder();
        for (String error : errors) {
            sb.append(error).append(System.lineSeparator());
        }
        return sb.toString();
    }

    public ResponseException(String message, HttpStatus status) {
        super(message);
        this.status = status;
        List<String> list = new ArrayList<>();
        list.add(message);
        this.errors = list;
    }

    public ResponseException(List<String> errors, HttpStatus status) {
        super(listToString(errors));
        this.status = status;
        this.errors = errors;
    }
}
