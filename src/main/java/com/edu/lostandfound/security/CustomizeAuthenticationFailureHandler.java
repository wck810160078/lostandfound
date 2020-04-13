package com.edu.lostandfound.security;

import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomizeAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        //返回json数据
        String result;
        if (e instanceof AccountExpiredException) {
            //账号过期
            result = "{\"code\":20020,\"success\":false,\"message\":\"账号过期\"}";
        } else if (e instanceof BadCredentialsException) {
            //密码错误
            result = "{\"code\":20030,\"success\":false,\"message\":\"密码错误\"}";
        } else if (e instanceof CredentialsExpiredException) {
            //密码过期
            result = "{\"code\":20040,\"success\":false,\"message\":\"密码过期\"}";
        } else if (e instanceof DisabledException) {
            //账号不可用
            result = "{\"code\":20050,\"success\":false,\"message\":\"账号不可用\"}";
        } else if (e instanceof LockedException) {
            //账号锁定
            result = "{\"code\":20060,\"success\":false,\"message\":\"账号锁定\"}";
        } else if (e instanceof InternalAuthenticationServiceException) {
            //用户不存在
            result = "{\"code\":20070,\"success\":false,\"message\":\"用户不存在\"}";
        }else{
            //其他错误
            result = "{\"code\":999,\"success\":false,\"message\":\"其他错误\"}";
        }
        //处理编码方式，防止中文乱码的情况
        httpServletResponse.setContentType("text/json;charset=utf-8");
        //塞到HttpServletResponse中返回给前台
        httpServletResponse.getWriter().write(result);
    }
}
