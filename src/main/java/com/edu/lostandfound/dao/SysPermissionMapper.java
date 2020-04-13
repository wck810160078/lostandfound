package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.SysPermission;
import org.springframework.stereotype.Component;

import java.util.List;

public interface SysPermissionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SysPermission record);

    int insertSelective(SysPermission record);

    SysPermission selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SysPermission record);

    int updateByPrimaryKey(SysPermission record);

    List<SysPermission> selectListByUser(Integer userId);

    List<SysPermission> selectListByPath(String requestUrl);
}