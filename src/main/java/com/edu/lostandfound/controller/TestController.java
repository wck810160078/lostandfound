package com.edu.lostandfound.controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

@RestController
public class TestController {
    @Resource
    private RedisTemplate<String,String> redisTemplate;

    @GetMapping("/testRedis")
    public String testRedis() {
        redisTemplate.opsForValue().set("1","aa");
        redisTemplate.expire("1",5, TimeUnit.MINUTES);
        return redisTemplate.opsForValue().get("1");
    }
}
