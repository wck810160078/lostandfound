package com.edu.lostandfound.po;

import java.util.Date;

public class LostGoods {
    /**
     * id
     */
    private Integer lostGoodsId;

    /**
     * 物品分类id
     */
    private Integer goodsTypeId;

    /**
     * 拾到/丢失时间
     */
    private Date getLostTime;

    /**
     * 发布者id
     */
    private Integer createUserId;

    /**
     * 描述标题
     */
    private String releaseTitle;

    /**
     * 描述内容
     */
    private String releaseContent;

    /**
     * 地区id
     */
    private Integer areaId;

    /**
     * 详细地址
     */
    private String detailedAddress;

    /**
     * 物品图片链接
     */
    private String goodsImageUrl;

    /**
     * 登记物品类别 0：拾物 1 ：寻物
     */
    private Integer getLostType;

    /**
     * 认领/归还者id
     */
    private Integer claimUserId;

    /**
     * 认领/归还时间
     */
    private Date dealTime;

    /**
     * 状态 UNREVIEWED:未审核，PASS：审核通过，NOTPASS：审核不通过，DEAL：已处理，FINISH：已完成
     */
    private String state;

    //以下是自定义字段
    //是否查询个人
    private Boolean personal;
    //查询开始时间
    private Date startTime;
    //查询结束时间
    private Date endTime;
    //发布人
    private String userName;
    //地点
    private String areaName;
    //所属分类
    private String goodsTypeName;
    //认领/拾取人名称
    private String claimName;
    //发布人手机号
    private String phoneNumber;

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getClaimUserId() {
        return claimUserId;
    }

    public void setClaimUserId(Integer claimUserId) {
        this.claimUserId = claimUserId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getGoodsTypeName() {
        return goodsTypeName;
    }

    public void setGoodsTypeName(String goodsTypeName) {
        this.goodsTypeName = goodsTypeName;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Boolean getPersonal() {
        return personal;
    }

    public void setPersonal(Boolean personal) {
        this.personal = personal;
    }

    /**
     * 
     * @return lost_goods_id 
     */
    public Integer getLostGoodsId() {
        return lostGoodsId;
    }

    /**
     * 
     * @param lostGoodsId 
     */
    public void setLostGoodsId(Integer lostGoodsId) {
        this.lostGoodsId = lostGoodsId;
    }

    /**
     * 物品分类id
     * @return goods_type_id 物品分类id
     */
    public Integer getGoodsTypeId() {
        return goodsTypeId;
    }

    /**
     * 物品分类id
     * @param goodsTypeId 物品分类id
     */
    public void setGoodsTypeId(Integer goodsTypeId) {
        this.goodsTypeId = goodsTypeId;
    }

    /**
     * 拾到/丢失时间
     * @return get_lost_time 拾到/丢失时间
     */
    public Date getGetLostTime() {
        return getLostTime;
    }

    /**
     * 拾到/丢失时间
     * @param getLostTime 拾到/丢失时间
     */
    public void setGetLostTime(Date getLostTime) {
        this.getLostTime = getLostTime;
    }

    /**
     * 发布者id
     * @return create_user_id 发布者id
     */
    public Integer getCreateUserId() {
        return createUserId;
    }

    /**
     * 发布者id
     * @param createUserId 发布者id
     */
    public void setCreateUserId(Integer createUserId) {
        this.createUserId = createUserId;
    }

    /**
     * 描述标题
     * @return release_title 描述标题
     */
    public String getReleaseTitle() {
        return releaseTitle;
    }

    /**
     * 描述标题
     * @param releaseTitle 描述标题
     */
    public void setReleaseTitle(String releaseTitle) {
        this.releaseTitle = releaseTitle == null ? null : releaseTitle.trim();
    }

    /**
     * 描述内容
     * @return release_content 描述内容
     */
    public String getReleaseContent() {
        return releaseContent;
    }

    /**
     * 描述内容
     * @param releaseContent 描述内容
     */
    public void setReleaseContent(String releaseContent) {
        this.releaseContent = releaseContent == null ? null : releaseContent.trim();
    }

    /**
     * 地区id
     * @return area_id 地区id
     */
    public Integer getAreaId() {
        return areaId;
    }

    /**
     * 地区id
     * @param areaId 地区id
     */
    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    /**
     * 详细地址
     * @return detailed_address 详细地址
     */
    public String getDetailedAddress() {
        return detailedAddress;
    }

    /**
     * 详细地址
     * @param detailedAddress 详细地址
     */
    public void setDetailedAddress(String detailedAddress) {
        this.detailedAddress = detailedAddress == null ? null : detailedAddress.trim();
    }

    /**
     * 
     * @return goods_image_url 
     */
    public String getGoodsImageUrl() {
        return goodsImageUrl;
    }

    /**
     * 
     * @param goodsImageUrl 
     */
    public void setGoodsImageUrl(String goodsImageUrl) {
        this.goodsImageUrl = goodsImageUrl == null ? null : goodsImageUrl.trim();
    }

    /**
     * 登记物品类别 0：拾物 1 ：寻物
     * @return get_lost_type 登记物品类别 0：拾物 1 ：寻物
     */
    public Integer getGetLostType() {
        return getLostType;
    }

    /**
     * 登记物品类别 0：拾物 1 ：寻物
     * @param getLostType 登记物品类别 0：拾物 1 ：寻物
     */
    public void setGetLostType(Integer getLostType) {
        this.getLostType = getLostType;
    }

    /**
     * 认领/归还者
     * @return claim_name 认领/归还者
     */
    public String getClaimName() {
        return claimName;
    }

    /**
     * 认领/归还者
     * @param claimName 认领/归还者
     */
    public void setClaimName(String claimName) {
        this.claimName = claimName == null ? null : claimName.trim();
    }

    /**
     * 认领/归还时间
     * @return deal_time 认领/归还时间
     */
    public Date getDealTime() {
        return dealTime;
    }

    /**
     * 认领/归还时间
     * @param dealTime 认领/归还时间
     */
    public void setDealTime(Date dealTime) {
        this.dealTime = dealTime;
    }

    /**
     * 
     * @return state 
     */
    public String getState() {
        return state;
    }

    /**
     * 
     * @param state 
     */
    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }
}