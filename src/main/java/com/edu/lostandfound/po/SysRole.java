package com.edu.lostandfound.po;

public class SysRole {
    /**
     * 主键id
     */
    private Integer id;

    /**
     * 角色名
     */
    private String roleName;

    /**
     * 角色说明
     */
    private String roleDescription;

    /**
     * 主键id
     * @return id 主键id
     */
    public Integer getId() {
        return id;
    }

    /**
     * 主键id
     * @param id 主键id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 角色名
     * @return role_name 角色名
     */
    public String getRoleName() {
        return roleName;
    }

    /**
     * 角色名
     * @param roleName 角色名
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName == null ? null : roleName.trim();
    }

    /**
     * 角色说明
     * @return role_description 角色说明
     */
    public String getRoleDescription() {
        return roleDescription;
    }

    /**
     * 角色说明
     * @param roleDescription 角色说明
     */
    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription == null ? null : roleDescription.trim();
    }
}