package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.SysUserMapper;
import com.edu.lostandfound.dao.SysUserRoleRelationMapper;
import com.edu.lostandfound.po.SysUser;
import com.edu.lostandfound.po.SysUserRoleRelation;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysUserService {

    @Resource
    private SysUserMapper sysUserMapper;
    @Resource
    private SysUserRoleRelationMapper sysUserRoleRelationMapper;

    public SysUser selectByName(String username) {
        return sysUserMapper.selectByName(username);
    }

    public int update(SysUser sysUser) {
        return sysUserMapper.updateByPrimaryKeySelective(sysUser);
    }

    public Msg registerUser(SysUser sysUser) {
        if(sysUserMapper.insertSelective(sysUser)==0){
            return Msg.fail("注册失败");
        }
        SysUserRoleRelation sysUserRoleRelation = new SysUserRoleRelation();
        sysUserRoleRelation.setRoleId(2);
        sysUserRoleRelation.setUserId(sysUser.getId());
        return sysUserRoleRelationMapper.insertSelective(sysUserRoleRelation)==0?Msg.fail("注册失败"):Msg.success("注册成功");
    }

    public SysUser getUser(HttpServletRequest request){
        Principal principal = request.getUserPrincipal();
        if(principal==null){
            return null;
        }
        return sysUserMapper.selectByName(principal.getName());
    }

    /**
     * 通过用户名获取
     * @param username
     * @return
     */
    public Map<String, Boolean> getUserByAccount(String username,boolean need) {
        SysUser sysUser = sysUserMapper.selectByName(username);
        Map<String,Boolean> validMap = new HashMap<>(1);
        if(sysUser==null){
            if(need){
                validMap.put("valid",true);
            } else {
                validMap.put("valid",false);
            }
        }else {
            if(need){
                validMap.put("valid",false);
            } else {
                validMap.put("valid",true);
            }
        }
        return validMap;
    }

    /**
     * 获取用户列表
     * @param sysUserPageData
     * @return
     */
    public Msg getSysUserList(PageData<SysUser> sysUserPageData) {
        if(sysUserPageData.getParamObj()==null){
            sysUserPageData.setParamObj(new SysUser());
        }

        if(sysUserPageData.getParamObj().getUserName()!=null){
            sysUserPageData.getParamObj().setUserName("%"+sysUserPageData.getParamObj().getUserName()+"%");
        }

        List<SysUser> sysUserList = sysUserMapper.getSysUserList(sysUserPageData);
        Long count = sysUserMapper.getSysUserListCount(sysUserPageData.getParamObj());

        sysUserPageData.setTotal(count);
        sysUserPageData.setRows(sysUserList);
        //去除请求参数
        sysUserPageData.setParamObj(null);
        return Msg.success().setResp(sysUserPageData);
    }
}
