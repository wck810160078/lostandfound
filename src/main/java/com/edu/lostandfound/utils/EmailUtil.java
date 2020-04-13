package com.edu.lostandfound.utils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class EmailUtil {
    public static void main(String [] args)
    {

    }

    /**
     * 发送邮件
     */
    public static void sendEmail(String toEmail,String title,String content){
        // 发件人电子邮箱
        String from = "810160078@qq.com";

        // 指定发送邮件的主机为 localhost
        String host = "smtp.qq.com";

        // 获取系统属性
        Properties properties = System.getProperties();

        // 设置邮件服务器
        properties.setProperty("mail.smtp.host", host);
        properties.put("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(properties,new Authenticator(){
            public PasswordAuthentication getPasswordAuthentication()
            {
                return new PasswordAuthentication("810160078@qq.com", "xloouzpwqorqbejf"); //发件人邮件用户名、授权码
            }
        });


        try{
            // 创建默认的 MimeMessage 对象
            MimeMessage message = new MimeMessage(session);

            // Set From: 头部头字段 发件人
            message.setFrom(new InternetAddress(from));

            // Set To: 头部头字段 收件人邮箱
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(toEmail));

            // Set Subject: 头部头字段 邮件标题
            message.setSubject(title);

            // 设置消息体 邮件内容
            message.setText(content);

            // 发送消息
            Transport.send(message);
            System.out.println("Sent message successfully....");
        }catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
}
