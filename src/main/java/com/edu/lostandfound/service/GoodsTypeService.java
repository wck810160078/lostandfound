package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.GoodsTypeMapper;
import com.edu.lostandfound.dao.LostGoodsMapper;
import com.edu.lostandfound.po.GoodsType;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class GoodsTypeService {

    @Resource
    private GoodsTypeMapper goodsTypeMapper;
    @Resource
    private LostGoodsMapper lostGoodsMapper;

    public Msg saveGoodsType(GoodsType goodsType) {
        if(BaseUtil.isBlank(goodsType.getGoodsTypeId())){
            return goodsTypeMapper.insertSelective(goodsType)==0?Msg.fail("新增失败"):Msg.success("新增成功");
        }
        return goodsTypeMapper.updateByPrimaryKeySelective(goodsType)==0?Msg.fail("修改失败"):Msg.success("修改成功");
    }

    public Msg goodsTypeList(PageData<GoodsType> goodsTypePageData) {
        if(goodsTypePageData.getParamObj()==null){
            goodsTypePageData.setParamObj(new GoodsType());
        }

        if(goodsTypePageData.getParamObj().getGoodsTypeName()!=null){
            goodsTypePageData.getParamObj().setGoodsTypeName("%"+goodsTypePageData.getParamObj().getGoodsTypeName()+"%");
        }

        List<GoodsType> goodsTypeList = goodsTypeMapper.getGoodsTypeList(goodsTypePageData);
        Long count = goodsTypeMapper.getGoodsTypeListCount(goodsTypePageData.getParamObj());

        goodsTypePageData.setTotal(count);
        goodsTypePageData.setRows(goodsTypeList);
        //去除请求参数
        goodsTypePageData.setParamObj(null);
        return Msg.success().setResp(goodsTypePageData);
    }

    /**
     * 删除
     * @param goodsTypeId id
     * @return
     */
    public Msg deleteGoodsType(Integer goodsTypeId) {
        lostGoodsMapper.deleteByGoodsTypeId(goodsTypeId);
        return goodsTypeMapper.deleteByPrimaryKey(goodsTypeId)==0?Msg.fail("删除失败"):Msg.success("删除成功");
    }

    /**
     * 根据父id获取物品分类
     * @param parentId
     * @return
     */
    public Msg getGoodsTypeByParentId(Integer parentId) {
        return Msg.success().setResp(goodsTypeMapper.getGoodsTypeByParentId(parentId));
    }


    public Msg getAllGoodsType() {
        return Msg.success().setResp(goodsTypeMapper.getAllGoodsType());
    }
}
