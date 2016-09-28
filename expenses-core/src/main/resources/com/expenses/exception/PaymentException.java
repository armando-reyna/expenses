package com.expenses.exception;

public class PaymentException extends Exception {
	
	/**
	 * Serial ID.
	 */
	private static final long serialVersionUID = -7330239373242203524L;
	
	/**
	 * Constructor
	 * @param message error message to display in the view.
	 */
	public PaymentException(String message) {
		super(message);
	}
	
	/**
	 * Indicates if the exception occurred should mark the payment process as unsuccessful.
	 */
	private boolean successfulPayment;

	public boolean isSuccessfulPayment() {
		return successfulPayment;
	}

	public void setSuccessfulPayment(final boolean successfulPayment) {
		this.successfulPayment = successfulPayment;
	}

}
