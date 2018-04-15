package com.mwroblewski.exception;

public class CityAlreadyExistsException extends RuntimeException {

    private String parameters;

    public CityAlreadyExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
