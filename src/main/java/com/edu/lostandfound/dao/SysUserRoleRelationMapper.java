package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.SysUserRoleRelation;

public interface SysUserRoleRelationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SysUserRoleRelation record);

    int insertSelective(SysUserRoleRelation record);

    SysUserRoleRelation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SysUserRoleRelation record);

    int updateByPrimaryKey(SysUserRoleRelation record);

    Integer getRoleIdByUserId(Integer id);
}