package com.edu.lostandfound.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BaseUtil {

    /**
     * 加密算法
     * @param password
     * @return
     */
    public static String BCrypt(String password){
        //BCrypt进行加密
        BCryptPasswordEncoder encoder =new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

    /**
     * 判断多个字符是否为空
     * @param objs
     * @return
     */
    public static boolean isBlank(Object ... objs){
        if(objs.length==0){
            return true;
        }

        String s;
        for (Object o : objs){
            if(o==null){
                return true;
            }

            s = o.toString();
            if("".equals(s)||"none".equals(s)||"null".equals(s)){
                return true;
            }


        }
        return false;
    }
}
