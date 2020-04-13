package com.edu.lostandfound.service;

import com.edu.lostandfound.dao.ArticleMapper;
import com.edu.lostandfound.po.Article;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

@Service
public class ArticleService {

    @Resource
    private ArticleMapper articleMapper;

    /**
     * 新增/修改
     * @param article
     * @return
     */
    public Msg saveArticle(Article article) {
        Date date = new Date();
        article.setUpdateTime(date);
        if(BaseUtil.isBlank(article.getArticleId())){
            article.setCreateTime(date);
            return articleMapper.insertSelective(article)==0?Msg.fail("新增失败"):Msg.success("新增成功");
        }
        return articleMapper.updateByPrimaryKeySelective(article)==0?Msg.fail("修改失败"):Msg.success("修改成功");
    }

    /**
     * 分页
     * @param articlePageData 参数
     * @return
     */
    public Msg getArticleList(PageData<Article> articlePageData){
        if(articlePageData.getParamObj()==null){
            articlePageData.setParamObj(new Article());
        }

        if(articlePageData.getParamObj().getArticleTitle()!=null){
            articlePageData.getParamObj().setArticleTitle("%"+articlePageData.getParamObj().getArticleTitle()+"%");
        }

        List<Article> articleList = articleMapper.getArticleList(articlePageData);
        Long count = articleMapper.getArticleListCount(articlePageData.getParamObj());

        articlePageData.setTotal(count);
        articlePageData.setRows(articleList);
        //去除请求参数
        articlePageData.setParamObj(null);
        return Msg.success().setResp(articlePageData);
    }

    /**
     * 删除
     * @param articleId
     * @return
     */
    public Msg deleteArticle(Integer articleId) {
        return articleMapper.deleteByPrimaryKey(articleId)==0?Msg.fail("删除失败"):Msg.success("删除成功");
    }
}
