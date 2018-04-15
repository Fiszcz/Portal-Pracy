package com.mwroblewski.exception;

public class OfferNotExistsException extends RuntimeException {

    private String parameters;

    public OfferNotExistsException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
