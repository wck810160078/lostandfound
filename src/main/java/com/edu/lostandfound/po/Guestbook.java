package com.edu.lostandfound.po;

import java.util.Date;

public class Guestbook {
    /**
     * id
     */
    private Integer guestbookId;

    /**
     * 留言内容
     */
    private String guestbookContent;

    /**
     * 留言类别（1 咨询 2 感谢 3 投诉 4 建议 5 其他）
     */
    private Integer guestbookType;

    /**
     * 留言用户id
     */
    private Integer userId;

    /**
     * 留言时间
     */
    private Date guestbookTime;

    /**
     * 状态
     */
    private String state;

    //以下是自定义字段
    //用户名
    private String userName;
    //查询个人留言标识
    private boolean personal;

    public boolean isPersonal() {
        return personal;
    }

    public void setPersonal(boolean personal) {
        this.personal = personal;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 
     * @return guestbook_id 
     */
    public Integer getGuestbookId() {
        return guestbookId;
    }

    /**
     * 
     * @param guestbookId 
     */
    public void setGuestbookId(Integer guestbookId) {
        this.guestbookId = guestbookId;
    }

    /**
     * 留言内容
     * @return guestbook_content 留言内容
     */
    public String getGuestbookContent() {
        return guestbookContent;
    }

    /**
     * 留言内容
     * @param guestbookContent 留言内容
     */
    public void setGuestbookContent(String guestbookContent) {
        this.guestbookContent = guestbookContent == null ? null : guestbookContent.trim();
    }

    /**
     * 留言类别
     * @return guestbook_type 留言类别
     */
    public Integer getGuestbookType() {
        return guestbookType;
    }

    /**
     * 留言类别
     * @param guestbookType 留言类别
     */
    public void setGuestbookType(Integer guestbookType) {
        this.guestbookType = guestbookType;
    }

    /**
     * 留言用户id
     * @return user_id 留言用户id
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 留言用户id
     * @param userId 留言用户id
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 留言时间
     * @return guestbook_time 留言时间
     */
    public Date getGuestbookTime() {
        return guestbookTime;
    }

    /**
     * 留言时间
     * @param guestbookTime 留言时间
     */
    public void setGuestbookTime(Date guestbookTime) {
        this.guestbookTime = guestbookTime;
    }

    /**
     * 状态
     * @return state 状态
     */
    public String getState() {
        return state;
    }

    /**
     * 状态
     * @param state 状态
     */
    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }
}