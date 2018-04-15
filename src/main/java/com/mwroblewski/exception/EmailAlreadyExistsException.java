package com.mwroblewski.exception;

public class EmailAlreadyExistsException extends RuntimeException {

    private String parameters;

    public EmailAlreadyExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
