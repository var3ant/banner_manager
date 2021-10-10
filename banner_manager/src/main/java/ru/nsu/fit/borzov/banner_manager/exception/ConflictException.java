package ru.nsu.fit.borzov.banner_manager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ConflictException extends ResponseException {

    public ConflictException(List<String> message) {
        super(message, HttpStatus.CONFLICT);
    }
}
