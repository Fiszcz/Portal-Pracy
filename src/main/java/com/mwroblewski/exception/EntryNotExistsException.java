package com.mwroblewski.exception;

public class EntryNotExistsException extends RuntimeException {

    private String parameters;

    public EntryNotExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
