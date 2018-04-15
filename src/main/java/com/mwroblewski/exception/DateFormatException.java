package com.mwroblewski.exception;

public class DateFormatException extends RuntimeException {

    private String parameters;

    public DateFormatException(String parameters){
        this.parameters = parameters;
    }

    public String getParameters() {
        return parameters;
    }
}
