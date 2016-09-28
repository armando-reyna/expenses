package com.expenses.entity.response;

/**
 * Created by Armando on 07/06/2015.
 */
public class JSONResponse {

  public static String STATUS_SUCCESS = "success";
  public static String STATUS_FAILURE = "failure";
  public static String STATUS_WARNING = "warning";

  private String status;
  private String sessionId;
  private String message;
  private Object data;

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getSessionId() {
    return sessionId;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }
}
