package com.edu.lostandfound;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

//@SpringBootApplication指定这是一个 spring boot的应用程序.
@SpringBootApplication
@MapperScan(basePackages = "com.edu.lostandfound.dao")
@Configuration
public class App 
{
  public static void main( String[] args )
  {
  	// SpringApplication 用于从main方法启动Spring应用的类。
  	SpringApplication.run(App.class, args);
  }
}