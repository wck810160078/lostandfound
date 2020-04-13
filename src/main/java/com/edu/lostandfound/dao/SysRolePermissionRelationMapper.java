package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.SysRolePermissionRelation;

public interface SysRolePermissionRelationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SysRolePermissionRelation record);

    int insertSelective(SysRolePermissionRelation record);

    SysRolePermissionRelation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SysRolePermissionRelation record);

    int updateByPrimaryKey(SysRolePermissionRelation record);
}