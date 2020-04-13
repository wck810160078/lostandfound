package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.Guestbook;
import com.edu.lostandfound.utils.PageData;

import java.util.List;

public interface GuestbookMapper {
    int deleteByPrimaryKey(Integer guestbookId);

    int insert(Guestbook record);

    int insertSelective(Guestbook record);

    Guestbook selectByPrimaryKey(Integer guestbookId);

    int updateByPrimaryKeySelective(Guestbook record);

    int updateByPrimaryKey(Guestbook record);

    /**
     * 分页
     * @param guestbookPageData
     * @return
     */
    List<Guestbook> getGuestbookList(PageData<Guestbook> guestbookPageData);
    Long getGuestbookListCount(Guestbook paramObj);
}