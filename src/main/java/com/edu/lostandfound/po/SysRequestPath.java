package com.edu.lostandfound.po;

public class SysRequestPath {
    /**
     * 主键id
     */
    private Integer id;

    /**
     * 请求路径
     */
    private String url;

    /**
     * 路径描述
     */
    private String description;

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
     * 请求路径
     * @return url 请求路径
     */
    public String getUrl() {
        return url;
    }

    /**
     * 请求路径
     * @param url 请求路径
     */
    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    /**
     * 路径描述
     * @return description 路径描述
     */
    public String getDescription() {
        return description;
    }

    /**
     * 路径描述
     * @param description 路径描述
     */
    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}