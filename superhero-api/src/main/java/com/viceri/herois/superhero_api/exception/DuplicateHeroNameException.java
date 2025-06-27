package com.viceri.herois.superhero_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateHeroNameException extends RuntimeException {
    public DuplicateHeroNameException(String message) {
        super(message);
    }
}