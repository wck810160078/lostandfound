package com.edu.lostandfound.controller;

import com.edu.lostandfound.po.Area;
import com.edu.lostandfound.service.AreaService;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
public class AreaController {
    @Resource
    private AreaService areaService;

    /**
     * 新增/修改
     * @param area
     * @return
     */
    @PostMapping("/admin/saveArea")
    public Msg saveArea(@RequestBody Area area){
        if(BaseUtil.isBlank(area.getAreaName(),area.getAreaRemarks(),area.getAreaType())){
            return Msg.fail("缺少参数");
        }
        return areaService.saveArea(area);
    }

    /**
     * 分页
     * @param areaPageData
     * @return
     */
    @PostMapping("/getAreaList")
    public Msg getAreaList(@RequestBody PageData<Area> areaPageData){
        return areaService.getAreaList(areaPageData);
    }

    /**
     * 删除
     * @param areaId
     * @return
     */
    @GetMapping("/admin/deleteArea")
    public Msg deleteArea(Integer areaId){
        return areaService.deleteArea(areaId);
    }
}
