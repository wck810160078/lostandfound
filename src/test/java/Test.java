import org.springframework.data.redis.core.RedisTemplate;

import java.util.concurrent.TimeUnit;

public class Test {
    public static void main(String[] args) {
        RedisTemplate<String,String> redisTemplate = new RedisTemplate<>();
        redisTemplate.opsForValue().set("1","aa");
        redisTemplate.expire("1",2, TimeUnit.MINUTES);
    }


}
