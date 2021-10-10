package ru.nsu.fit.borzov.banner_manager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AlreadyExistException extends ResponseException {

    public AlreadyExistException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}
