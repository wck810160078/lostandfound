package com.edu.lostandfound.controller;

import com.edu.lostandfound.po.GoodsType;
import com.edu.lostandfound.service.GoodsTypeService;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class GoodsTypeController {

    @Resource
    private GoodsTypeService goodsTypeService;

    /**
     * 新增/修改
     * @param goodsType
     * @return
     */
    @PostMapping("/student/saveGoodsType")
    public Msg saveGoodsType(@RequestBody GoodsType goodsType){
        return goodsTypeService.saveGoodsType(goodsType);
    }

    /**
     * 分页
     * @param goodsTypePageData
     * @return
     */
    @PostMapping("/goodsTypeList")
    public Msg goodsTypeList(@RequestBody PageData<GoodsType> goodsTypePageData){
        return goodsTypeService.goodsTypeList(goodsTypePageData);
    }

    /**
     * 删除
     * @param goodsTypeId
     * @return
     */
    @GetMapping("/admin/deleteGoodsType")
    public Msg deleteGoodsType(Integer goodsTypeId){
        return goodsTypeService.deleteGoodsType(goodsTypeId);
    }

    /**
     * 根据父id获取物品分类
     * @param parentId
     * @return
     */
    @GetMapping("/getGoodsTypeByParentId")
    public Msg getGoodsTypeByParentId(Integer parentId){
        return goodsTypeService.getGoodsTypeByParentId(parentId);
    }

    @GetMapping("/getAllGoodsType")
    public Msg getAllGoodsType(){
        return goodsTypeService.getAllGoodsType();
    }
}
