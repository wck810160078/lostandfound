package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.Area;
import com.edu.lostandfound.utils.PageData;

import java.util.List;

public interface AreaMapper {
    int deleteByPrimaryKey(Integer areaId);

    int insert(Area record);

    int insertSelective(Area record);

    Area selectByPrimaryKey(Integer areaId);

    int updateByPrimaryKeySelective(Area record);

    int updateByPrimaryKey(Area record);

    /**
     * 分页
     * @param areaPageData
     * @return
     */
    List<Area> getAreaList(PageData<Area> areaPageData);
    Long getAreaListCount(Area paramObj);
}