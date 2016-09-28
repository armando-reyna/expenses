package com.expenses.exception;

public class AlreadyProcessedPayPalTXException extends Exception {

    /**
     * Serial ID.
     */
    private static final long serialVersionUID = -533032373242203524L;

    /**
     * Constructor
     * @param message error message to display in the view.
     */
    public AlreadyProcessedPayPalTXException(String message) {
        super(message);
    }
}