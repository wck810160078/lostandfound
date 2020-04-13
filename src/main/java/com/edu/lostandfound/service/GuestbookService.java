package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.GuestbookMapper;
import com.edu.lostandfound.po.Guestbook;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class GuestbookService {

    @Resource
    private GuestbookMapper guestbookMapper;

    /**
     * 新增/修改
     * @param guestbook
     * @return
     */
    public Msg saveGuestbook(Guestbook guestbook) {
        guestbook.setGuestbookTime(new Date());
        if(BaseUtil.isBlank(guestbook.getGuestbookId())){
            return guestbookMapper.insertSelective(guestbook)==0?Msg.fail("新增失败"):Msg.success("新增成功");
        }
        return guestbookMapper.updateByPrimaryKeySelective(guestbook)==0?Msg.fail("修改失败"):Msg.success("修改成功");
    }

    /**
     * 分页
     * @param guestbookPageData
     * @return
     */
    public Msg getGuestbookList(PageData<Guestbook> guestbookPageData) {

        if(guestbookPageData.getParamObj().getGuestbookContent()!=null){
            guestbookPageData.getParamObj().setGuestbookContent("%"+guestbookPageData.getParamObj().getGuestbookContent()+"%");
        }

        List<Guestbook> guestbookList = guestbookMapper.getGuestbookList(guestbookPageData);
        Long count = guestbookMapper.getGuestbookListCount(guestbookPageData.getParamObj());

        guestbookPageData.setTotal(count);
        guestbookPageData.setRows(guestbookList);
        //去除请求参数
        guestbookPageData.setParamObj(null);
        return Msg.success().setResp(guestbookPageData);
    }

    /**
     * 删除
     * @param guestbookId
     * @return
     */
    public Msg deleteGuestbook(Integer guestbookId) {
        return guestbookMapper.deleteByPrimaryKey(guestbookId)==0?Msg.fail("删除失败"):Msg.success("删除成功");
    }
}
