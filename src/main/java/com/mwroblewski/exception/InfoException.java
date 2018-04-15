package com.mwroblewski.exception;

public class InfoException extends RuntimeException {

    private String comment;

    public InfoException(String parameters){
        this.comment = parameters;
    }

    public String getComment() {
        return comment;
    }
}
