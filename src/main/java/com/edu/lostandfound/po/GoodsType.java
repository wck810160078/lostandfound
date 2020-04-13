package com.edu.lostandfound.po;

import java.util.List;

public class GoodsType {
    /**
     *id
     */
    private Integer goodsTypeId;

    /**
     * 物品名称
     */
    private String goodsTypeName;

    /**
     * 状态
     */
    private String state;

    /**
     * 父id
     */
    private Integer parentId;

    //以下是自定义字段
    //父级类别名称
    private String parentName;

    private List<GoodsType> goodsTypes;

    public List<GoodsType> getGoodsTypes() {
        return goodsTypes;
    }

    public void setGoodsTypes(List<GoodsType> goodsTypes) {
        this.goodsTypes = goodsTypes;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    /**
     *
     * @return goods_type_id
     */
    public Integer getGoodsTypeId() {
        return goodsTypeId;
    }

    /**
     *
     * @param goodsTypeId
     */
    public void setGoodsTypeId(Integer goodsTypeId) {
        this.goodsTypeId = goodsTypeId;
    }

    /**
     * 物品名称
     * @return goods_type_name 物品名称
     */
    public String getGoodsTypeName() {
        return goodsTypeName;
    }

    /**
     * 物品名称
     * @param goodsTypeName 物品名称
     */
    public void setGoodsTypeName(String goodsTypeName) {
        this.goodsTypeName = goodsTypeName == null ? null : goodsTypeName.trim();
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
     * 父id
     * @return parent_id 父id
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * 父id
     * @param parentId 父id
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
}