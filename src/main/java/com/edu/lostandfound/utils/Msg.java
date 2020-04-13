package com.edu.lostandfound.utils;

public class Msg {

    private boolean success;
    private Integer code;
    private String Message;
    private Object resp;

    public Object getResp() {
        return resp;
    }

    public Msg setResp(Object resp) {
        this.resp = resp;
        return this;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Integer getCode() {
        return code;
    }

    public Msg setCode(Integer code) {
        this.code = code;
        return this;
    }

    public String getMessage() {
        return Message;
    }

    public Msg setMessage(String message) {
        Message = message;
        return this;
    }

    public static Msg success(){
        Msg msg = new Msg();
        msg.setCode(10000);
        msg.setSuccess(true);
        msg.setMessage("请求成功");
        return msg;
    }

    public static Msg success(String message){
        Msg msg = new Msg();
        msg.setCode(10000);
        msg.setSuccess(true);
        msg.setMessage(message);
        return msg;
    }

    public static Msg fail(String message){
        Msg msg = new Msg();
        msg.setCode(40000);
        msg.setSuccess(false);
        msg.setMessage(message);
        return msg;
    }

}
