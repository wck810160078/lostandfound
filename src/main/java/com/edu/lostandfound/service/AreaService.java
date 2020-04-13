package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.AreaMapper;
import com.edu.lostandfound.dao.LostGoodsMapper;
import com.edu.lostandfound.po.Area;
import com.edu.lostandfound.po.LostGoods;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class AreaService {

    @Resource
    private AreaMapper areaMapper;
    @Resource
    private LostGoodsMapper lostGoodsMapper;

    /**
     * 新增/修改
     * @param area
     * @return
     */
    public Msg saveArea(Area area) {
        if(BaseUtil.isBlank(area.getAreaId())){
            return areaMapper.insertSelective(area)==0?Msg.fail("新增失败"):Msg.success("新增成功");
        }
        return areaMapper.updateByPrimaryKeySelective(area)==0?Msg.fail("修改失败"):Msg.success("修改成功");
    }

    /**
     * 分页
     * @param areaPageData
     * @return
     */
    public Msg getAreaList(PageData<Area> areaPageData) {
        if(areaPageData.getParamObj()==null){
            areaPageData.setParamObj(new Area());
        }

        if(areaPageData.getParamObj().getAreaName()!=null){
            areaPageData.getParamObj().setAreaName("%"+areaPageData.getParamObj().getAreaName()+"%");
        }

        List<Area> areaList = areaMapper.getAreaList(areaPageData);
        Long count = areaMapper.getAreaListCount(areaPageData.getParamObj());

        areaPageData.setTotal(count);
        areaPageData.setRows(areaList);
        //去除请求参数
        areaPageData.setParamObj(null);
        return Msg.success().setResp(areaPageData);
    }

    /**
     * 删除
     * @param areaId
     * @return
     */
    public Msg deleteArea(Integer areaId) {
        lostGoodsMapper.deleteByAreaId(areaId);
        return areaMapper.deleteByPrimaryKey(areaId)==0?Msg.fail("删除失败"):Msg.success("删除成功");
    }
}
