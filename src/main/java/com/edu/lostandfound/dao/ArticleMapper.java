package com.edu.lostandfound.dao;

import com.edu.lostandfound.po.Article;
import com.edu.lostandfound.utils.PageData;

import java.util.List;

public interface ArticleMapper {
    int deleteByPrimaryKey(Integer articleId);

    int insert(Article record);

    int insertSelective(Article record);

    Article selectByPrimaryKey(Integer articleId);

    int updateByPrimaryKeySelective(Article record);

    int updateByPrimaryKeyWithBLOBs(Article record);

    int updateByPrimaryKey(Article record);

    /**
     * 分页
     * @param articlePageData
     * @return
     */
    List<Article> getArticleList(PageData<Article> articlePageData);
    Long getArticleListCount(Article paramObj);
}