package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.LostGoods;
import com.edu.lostandfound.utils.PageData;

import java.util.Date;
import java.util.List;

public interface LostGoodsMapper {
    int deleteByPrimaryKey(Integer lostGoodsId);

    int insert(LostGoods record);

    int insertSelective(LostGoods record);

    LostGoods selectByPrimaryKey(Integer lostGoodsId);

    int updateByPrimaryKeySelective(LostGoods record);

    int updateByPrimaryKey(LostGoods record);

    /**
     * 通过地区id删除
     * @param areaId
     */
    void deleteByAreaId(Integer areaId);

    /**
     * 通过物品分类id删除
     * @param goodsTypeId
     */
    void deleteByGoodsTypeId(Integer goodsTypeId);

    /**
     * 分页
     * @param lostGoodsPageData
     * @return
     */
    List<LostGoods> getLostGoodsList(PageData<LostGoods> lostGoodsPageData);
    Long getLostGoodsListCount(LostGoods paramObj);

    /**
     * 修改状态
     * @param lostGoods
     * @return
     */
    int changeState(LostGoods lostGoods);
}