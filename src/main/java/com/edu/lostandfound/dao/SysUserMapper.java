package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.SysUser;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Component;

import java.util.List;

public interface SysUserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SysUser record);

    SysUser selectByPrimaryKey(Integer id);

    int insertSelective(SysUser record);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    SysUser selectByName(String username);

    /**
     * 用户列表分页
     * @param sysUserPageData
     * @return
     */
    List<SysUser> getSysUserList(PageData<SysUser> sysUserPageData);
    Long getSysUserListCount(SysUser paramObj);
}