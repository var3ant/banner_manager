package ru.nsu.fit.borzov.banner_manager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class NoContentException extends ResponseException {
    public NoContentException(String message) {
        super(message, HttpStatus.NO_CONTENT);
    }
}
