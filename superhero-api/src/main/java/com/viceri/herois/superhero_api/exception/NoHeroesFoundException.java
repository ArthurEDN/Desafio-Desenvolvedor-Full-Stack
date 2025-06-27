package com.viceri.herois.superhero_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NoHeroesFoundException extends RuntimeException {
    public NoHeroesFoundException(String message) {
        super(message);
    }
}