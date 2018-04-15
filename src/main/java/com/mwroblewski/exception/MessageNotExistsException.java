package com.mwroblewski.exception;

public class MessageNotExistsException extends RuntimeException {

    private String parameters;

    public MessageNotExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
