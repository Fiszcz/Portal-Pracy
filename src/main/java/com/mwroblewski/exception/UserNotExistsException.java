package com.mwroblewski.exception;

public class UserNotExistsException extends RuntimeException {

    private String parameters;

    public UserNotExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
