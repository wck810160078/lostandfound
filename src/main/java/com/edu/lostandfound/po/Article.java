package com.edu.lostandfound.po;

import java.util.Date;

public class Article {
    /**
     * id
     */
    private Integer articleId;

    /**
     * 栏目类型
     */
    private String categoryType;

    /**
     * 新闻标题
     */
    private String articleTitle;

    /**
     * 新闻图片
     */
    private String articleImageUrl;

    /**
     * 文章来源
     */
    private String articleSrc;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

    /**
     * 创建人id
     */
    private Integer createUserId;

    /**
     * 状态
     */
    private String state;

    /**
     * 新闻内容
     */
    private String articleContent;

    /**
     * 
     * @return article_id 
     */
    public Integer getArticleId() {
        return articleId;
    }

    /**
     * 
     * @param articleId 
     */
    public void setArticleId(Integer articleId) {
        this.articleId = articleId;
    }

    /**
     * 栏目类型
     * @return category_type 栏目类型
     */
    public String getCategoryType() {
        return categoryType;
    }

    /**
     * 栏目类型
     * @param categoryType 栏目类型
     */
    public void setCategoryType(String categoryType) {
        this.categoryType = categoryType == null ? null : categoryType.trim();
    }

    /**
     * 新闻标题
     * @return article_title 新闻标题
     */
    public String getArticleTitle() {
        return articleTitle;
    }

    /**
     * 新闻标题
     * @param articleTitle 新闻标题
     */
    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle == null ? null : articleTitle.trim();
    }

    /**
     * 新闻图片
     * @return article_image_url 新闻图片
     */
    public String getArticleImageUrl() {
        return articleImageUrl;
    }

    /**
     * 新闻图片
     * @param articleImageUrl 新闻图片
     */
    public void setArticleImageUrl(String articleImageUrl) {
        this.articleImageUrl = articleImageUrl == null ? null : articleImageUrl.trim();
    }

    /**
     * 文章来源
     * @return article_src 文章来源
     */
    public String getArticleSrc() {
        return articleSrc;
    }

    /**
     * 文章来源
     * @param articleSrc 文章来源
     */
    public void setArticleSrc(String articleSrc) {
        this.articleSrc = articleSrc == null ? null : articleSrc.trim();
    }

    /**
     * 创建时间
     * @return create_time 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 创建时间
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 修改时间
     * @return update_time 修改时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * 修改时间
     * @param updateTime 修改时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * 创建人id
     * @return create_user_id 创建人id
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 创建人id
     * @param createUserId 创建人id
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
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

    /**
     * 新闻内容
     * @return content_content 新闻内容
     */
    public String getArticleContent() {
        return articleContent;
    }

    /**
     * 新闻内容
     * @param articleContent 新闻内容
     */
    public void setArticleContent(String articleContent) {
        this.articleContent = articleContent == null ? null : articleContent.trim();
    }
}