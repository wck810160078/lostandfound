package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.GoodsType;
import com.edu.lostandfound.utils.PageData;

import java.util.List;

public interface GoodsTypeMapper {
    int deleteByPrimaryKey(Integer goodsTypeId);

    int insert(GoodsType record);

    int insertSelective(GoodsType record);

    GoodsType selectByPrimaryKey(Integer goodsTypeId);

    int updateByPrimaryKeySelective(GoodsType record);

    int updateByPrimaryKey(GoodsType record);

    /**
     * 分页
     * @param goodsTypePageData
     * @return
     */
    List<GoodsType> getGoodsTypeList(PageData<GoodsType> goodsTypePageData);
    Long getGoodsTypeListCount(GoodsType paramObj);

    List<GoodsType> getGoodsTypeByParentId(Integer parentId);

    List<GoodsType> getAllGoodsType();
}