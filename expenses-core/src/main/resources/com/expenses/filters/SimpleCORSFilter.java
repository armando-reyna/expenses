package com.expenses.filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class SimpleCORSFilter implements Filter {

  private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(SimpleCORSFilter.class);

  public void doFilter(ServletRequest req, ServletResponse res,
                       FilterChain chain) throws IOException, ServletException {

    HttpServletRequest request = (HttpServletRequest) req;

    HttpServletResponse response = (HttpServletResponse) res;

    log.debug("--filtering");
    String origin = request.getHeader("Origin");
    if (origin == null)
      origin = "*";
    this.setResponseHeader(response, "Access-Control-Allow-Origin", origin);
    this.setResponseHeader(response, "Access-Control-Allow-Credentials", "true");
    this.setResponseHeader(response, "Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    this.setResponseHeader(response, "Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");

    chain.doFilter(req, res);
  }

  private void setResponseHeader(HttpServletResponse response, String header,
                                 String value) {
    if (value != null && !"".equals(value.trim())) {
      response.setHeader(header, value);
    }
  }

  public void init(FilterConfig filterConfig) {
  }

  public void destroy() {
  }
}
