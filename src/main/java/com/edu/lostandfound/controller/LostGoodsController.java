package com.edu.lostandfound.controller;

import com.edu.lostandfound.po.LostGoods;
import com.edu.lostandfound.po.SysUser;
import com.edu.lostandfound.service.LostGoodsService;
import com.edu.lostandfound.service.SysUserService;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@RestController
public class LostGoodsController {

    @Resource
    private LostGoodsService lostGoodsService;
    @Resource
    private SysUserService sysUserService;
    @Resource
    private HttpServletRequest request;

    /**
     * 新增/修改
     * @param lostGoods
     * @return
     */
    @PostMapping("/student/saveLostGoods")
    public Msg saveLostGoods(@RequestBody LostGoods lostGoods){
        if(BaseUtil.isBlank(lostGoods.getGetLostType(),lostGoods.getGoodsTypeId(),
                lostGoods.getReleaseTitle(),lostGoods.getReleaseContent(),
                lostGoods.getDetailedAddress())){
            return Msg.fail("缺少参数");
        }
        SysUser sysUser = sysUserService.getUser(request);
        if(BaseUtil.isBlank(lostGoods.getState())){
            lostGoods.setCreateUserId(sysUser.getId());
        } else if("DEAL".equals(lostGoods.getState())) {
            lostGoods.setClaimUserId(sysUser.getId());
        }
        return lostGoodsService.saveLostGoods(lostGoods);
    }

    /**
     * 分页
     * @param lostGoodsPageData
     * @return
     */
    @PostMapping("/getLostGoodsList")
    public Msg getLostGoodsList(@RequestBody PageData<LostGoods> lostGoodsPageData){
        if(lostGoodsPageData.getParamObj()==null){
            lostGoodsPageData.setParamObj(new LostGoods());
        }
        if(lostGoodsPageData.getParamObj().getPersonal()!=null&&lostGoodsPageData.getParamObj().getPersonal()){
            SysUser sysUser = sysUserService.getUser(request);
            lostGoodsPageData.getParamObj().setCreateUserId(sysUser.getId());
        }
        return lostGoodsService.getLostGoodsList(lostGoodsPageData);
    }

    /**
     * 删除
     * @param lostGoodsId
     * @return
     */
    @GetMapping("/student/deleteLostGoods")
    public Msg deleteLostGoods(Integer lostGoodsId){
        return lostGoodsService.deleteLostGoods(lostGoodsId);
    }

    /**
     * 修改状态
     * @param lostGoodsId
     * @param state
     * @return
     */
    @GetMapping("/student/changeState")
    public Msg changeState(Integer lostGoodsId,String state){
        LostGoods lostGoods = new LostGoods();
        SysUser sysUser = sysUserService.getUser(request);
        lostGoods.setState(state);
        lostGoods.setLostGoodsId(lostGoodsId);
        if("DEAL".equals(state)) {
            lostGoods.setClaimUserId(sysUser.getId());
        }
        return lostGoodsService.changeState(lostGoods);
    }
}
