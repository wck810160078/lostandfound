package com.edu.lostandfound.po;

public class SysRequestPathPermissionRelation {
    /**
     * 主键id
     */
    private Integer id;

    /**
     * 请求路径id
     */
    private Integer urlId;

    /**
     * 权限id
     */
    private Integer permissionId;

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
     * 请求路径id
     * @return url_id 请求路径id
     */
    public Integer getUrlId() {
        return urlId;
    }

    /**
     * 请求路径id
     * @param urlId 请求路径id
     */
    public void setUrlId(Integer urlId) {
        this.urlId = urlId;
    }

    /**
     * 权限id
     * @return permission_id 权限id
     */
    public Integer getPermissionId() {
        return permissionId;
    }

    /**
     * 权限id
     * @param permissionId 权限id
     */
    public void setPermissionId(Integer permissionId) {
        this.permissionId = permissionId;
    }
}