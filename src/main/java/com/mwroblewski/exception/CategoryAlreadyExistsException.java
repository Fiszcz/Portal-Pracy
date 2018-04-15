package com.mwroblewski.exception;

public class CategoryAlreadyExistsException extends RuntimeException {

    private String parameters;

    public CategoryAlreadyExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
