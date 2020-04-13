package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.LostGoodsMapper;
import com.edu.lostandfound.po.LostGoods;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class LostGoodsService {

    @Resource
    private LostGoodsMapper lostGoodsMapper;

    /**
     * 新增/修改
     * @param lostGoods
     * @return
     */
    public Msg saveLostGoods(LostGoods lostGoods) {
        lostGoods.setGetLostTime(new Date());
        if(BaseUtil.isBlank(lostGoods.getLostGoodsId())){
            return lostGoodsMapper.insertSelective(lostGoods)==0?Msg.fail("新增失败"):Msg.success("新增成功");
        }
        return lostGoodsMapper.updateByPrimaryKeySelective(lostGoods)==0?Msg.fail("修改失败"):Msg.success("修改成功");
    }

    /**
     * 分页
     * @param lostGoodsPageData 参数
     * @return
     */
    public Msg getLostGoodsList(PageData<LostGoods> lostGoodsPageData){
        if(lostGoodsPageData.getParamObj().getReleaseTitle()!=null){
            lostGoodsPageData.getParamObj().setReleaseTitle("%"+lostGoodsPageData.getParamObj().getReleaseTitle()+"%");
        }

        Integer getLostType = lostGoodsPageData.getParamObj().getGetLostType();
        lostGoodsPageData.getParamObj().setGetLostType(null);
        List<LostGoods> lostGoodsList = lostGoodsMapper.getLostGoodsList(lostGoodsPageData);

        //获取个人拾取/丢失列表
        if(lostGoodsPageData.getParamObj().getPersonal()!=null&&lostGoodsPageData.getParamObj().getPersonal()){
            //获取到认领/归还者为当前用户的信息
            for (LostGoods lostGoods:lostGoodsList){
                if(lostGoodsPageData.getParamObj().getCreateUserId().equals(lostGoods.getClaimUserId())){
                    //取反登记物品类别
                    if(lostGoods.getGetLostType()==1){
                        lostGoods.setGetLostType(0);
                    } else {
                        lostGoods.setGetLostType(1);
                    }
                }
            }
        }

        //过滤登记物品类别为当前类别
        lostGoodsList = lostGoodsList.stream().filter(lostGoods -> {
            if(getLostType!=null){
                return getLostType.equals(lostGoods.getGetLostType());
            }
            return true;
        }).collect(Collectors.toList());
        //获取总行数
        int count = lostGoodsList.size();
        //分页
        lostGoodsList = lostGoodsList.stream().skip(lostGoodsPageData.getPage()).limit(lostGoodsPageData.getSize()).collect(Collectors.toList());

        lostGoodsPageData.setTotal(count);
        lostGoodsPageData.setRows(lostGoodsList);
        //去除请求参数
        lostGoodsPageData.setParamObj(null);
        return Msg.success().setResp(lostGoodsPageData);
    }

    /**
     * 删除
     * @param lostGoodsId
     * @return
     */
    public Msg deleteLostGoods(Integer lostGoodsId) {
        return lostGoodsMapper.deleteByPrimaryKey(lostGoodsId)==0?Msg.fail("删除失败"):Msg.success("删除成功");
    }

    /**
     * 修改状态
     * @param lostGoods
     * @return
     */
    public Msg changeState(LostGoods lostGoods) {
        lostGoods.setDealTime(new Date());
        return lostGoodsMapper.changeState(lostGoods)==0?Msg.fail("修改状态失败"):Msg.success();
    }
}
