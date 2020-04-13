package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.SysRequestPath;

public interface SysRequestPathMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SysRequestPath record);

    int insertSelective(SysRequestPath record);

    SysRequestPath selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SysRequestPath record);

    int updateByPrimaryKey(SysRequestPath record);
}