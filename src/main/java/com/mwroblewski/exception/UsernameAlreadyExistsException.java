package com.mwroblewski.exception;

public class UsernameAlreadyExistsException extends RuntimeException {

    private String parameters;

    public UsernameAlreadyExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
