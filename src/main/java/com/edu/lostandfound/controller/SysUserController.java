package com.edu.lostandfound.controller;

import com.edu.lostandfound.po.SysUser;
import com.edu.lostandfound.service.SysUserService;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.EmailUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
public class SysUserController {

    @Resource
    private SysUserService sysUserService;
    @Resource
    private HttpServletRequest request;
    @Resource
    private RedisTemplate<String,String> redisTemplate;

    /**
     * 注册
     * @param sysUser
     * @return
     */
    @PostMapping("/register")
    public Msg registerUser(@RequestBody SysUser sysUser){
        if (BaseUtil.isBlank(sysUser.getUserName(),sysUser.getPassword(),
                sysUser.getEmail(),sysUser.getPhoneNumber()))
            return Msg.fail("缺少关键参数");
        //加密
        sysUser.setPassword(BaseUtil.BCrypt(sysUser.getPassword()));
        sysUser.setCreateTime(new Date());
        return sysUserService.registerUser(sysUser);
    }

    /**
     * 获取用户信息
     * @return
     */
    @RequestMapping("/getUser")
    public Msg getUser(){
        return Msg.success().setResp(sysUserService.getUser(request));
    }

    /**
     * 发送邮箱验证码
     * @return
     */
    @GetMapping("/student/sendValidateCode")
    public Msg sendValidateCode(){
        SysUser sysUser = sysUserService.getUser(request);
        String code = String.format("%04d", new Random().nextInt(9999));
        redisTemplate.opsForValue().set("findPwd"+sysUser.getUserName(),code);
        redisTemplate.expire("findPwd"+sysUser.getUserName(),5, TimeUnit.MINUTES);
        EmailUtil.sendEmail(sysUser.getEmail(),"找回密码","您正在进行密码操作，本次获取的验证码为"+code+"，有效时间为5分钟");
        return Msg.success("发送成功");
    }

    /**
     * 修改密码
     * @param oldPassword
     * @param newPassword
     * @return
     */
    @PostMapping("/gm/updatePassword")
    public Msg updatePassword(String oldPassword,String newPassword,String code){
        SysUser sysUser = sysUserService.getUser(request);
        //获取验证码
        String valiCode = redisTemplate.opsForValue().get("findPwd"+sysUser.getUserName());
        if(valiCode==null||!valiCode.equals(code)){
            return Msg.fail("验证码不正确");
        }
        if(new BCryptPasswordEncoder().matches(oldPassword,sysUser.getPassword())){
            sysUser.setPassword(BaseUtil.BCrypt(newPassword));
            return sysUserService.update(sysUser)==0?Msg.fail("修改密码失败"):Msg.success("修改密码成功");
        }
        return Msg.fail("旧密码不正确");
    }

    /**
     * 修改密码
     * @param oldPassword
     * @param newPassword
     * @return
     */
    @PostMapping("/admin/updatePassword")
    public Msg updatePassword(String oldPassword,String newPassword){
        SysUser sysUser = sysUserService.getUser(request);
        if(new BCryptPasswordEncoder().matches(oldPassword,sysUser.getPassword())){
            sysUser.setPassword(BaseUtil.BCrypt(newPassword));
            return sysUserService.update(sysUser)==0?Msg.fail("修改密码失败"):Msg.success("修改密码成功");
        }
        return Msg.fail("旧密码不正确");
    }

    /**
     * 忘记密码
     * @param account
     * @param code
     * @param newPassword
     * @return
     */
    @PostMapping("/forgetPassword")
    public Msg forgetPassword(String account,String code,String newPassword){
        SysUser sysUser = sysUserService.selectByName(account);
        if(sysUser==null){
            return Msg.fail("用户不存在");
        }
        //获取验证码
        String valiCode = redisTemplate.opsForValue().get("findPwd"+sysUser.getUserName());
        if(valiCode==null||!valiCode.equals(code)){
            return Msg.fail("验证码不正确");
        }
        sysUser.setPassword(BaseUtil.BCrypt(newPassword));
        sysUserService.update(sysUser);
        return Msg.success("重置密码成功，请重新登录");
    }

    /**
     * 校验用户名是否存在
     * @param username
     * @return
     */
    @GetMapping("/validatorUserName")
    public Map<String, Boolean> validatorUserName(String username,boolean need){
        return sysUserService.getUserByAccount(username,need);
    }

    /**
     * 通过用户名获取用户
     * @param account
     * @return
     */
    @GetMapping("/getUserByAccount")
    public Msg getUserByAccount(String account){
        return Msg.success().setResp(sysUserService.selectByName(account));
    }

    /**
     * 修改用户信息
     * @param sysUser
     * @return
     */
    @PostMapping("/student/updateUserInfo")
    public Msg updateUserInfo(@RequestBody SysUser sysUser){
        if(!BaseUtil.isBlank(sysUser.getUserName(),sysUser.getPassword())){
            return Msg.fail("包含不可修改参数");
        }
        return sysUserService.update(sysUser)==0?Msg.fail("修改失败"):Msg.success("修改成功");
    }

    @PostMapping("/admin/getSysUserList")
    public Msg getSysUserList(@RequestBody PageData<SysUser> sysUserPageData){
        return sysUserService.getSysUserList(sysUserPageData);
    }
}
