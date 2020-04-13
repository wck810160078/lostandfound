package com.edu.lostandfound.controller;

import com.edu.lostandfound.po.Guestbook;
import com.edu.lostandfound.po.SysUser;
import com.edu.lostandfound.service.GuestbookService;
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
public class GuestbookController {
    @Resource
    private GuestbookService guestbookService;
    @Resource
    private SysUserService sysUserService;
    @Resource
    private HttpServletRequest request;

    /**
     * 新增/修改
     * @param guestbook
     * @return
     */
    @PostMapping("/student/saveGuestbook")
    public Msg saveGuestbook(@RequestBody Guestbook guestbook){
        if(BaseUtil.isBlank(guestbook.getGuestbookContent(),guestbook.getGuestbookType())){
            return Msg.fail("缺少参数");
        }
        guestbook.setUserId(sysUserService.getUser(request).getId());
        return guestbookService.saveGuestbook(guestbook);
    }

    /**
     * 分页
     * @param guestbookPageData
     * @return
     */
    @PostMapping("/getGuestbookList")
    public Msg getGuestbookList(@RequestBody PageData<Guestbook> guestbookPageData){
        if(guestbookPageData.getParamObj()==null){
            guestbookPageData.setParamObj(new Guestbook());
        }
        if(guestbookPageData.getParamObj().isPersonal()){
            SysUser sysUser = sysUserService.getUser(request);
            guestbookPageData.getParamObj().setUserId(sysUser.getId());
        }
        return guestbookService.getGuestbookList(guestbookPageData);
    }

    /**
     * 删除
     * @param guestbookId
     * @return
     */
    @GetMapping("/student/deleteGuestbook")
    public Msg deleteGuestbook(Integer guestbookId){
        return guestbookService.deleteGuestbook(guestbookId);
    }
}
