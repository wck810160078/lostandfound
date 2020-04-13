package com.edu.lostandfound.controller;

import com.edu.lostandfound.po.Article;
import com.edu.lostandfound.po.SysUser;
import com.edu.lostandfound.service.ArticleService;
import com.edu.lostandfound.service.SysUserService;
import com.edu.lostandfound.utils.BaseUtil;
import com.edu.lostandfound.utils.Msg;
import com.edu.lostandfound.utils.PageData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;

@RestController
public class ArticleController {

    @Resource
    private ArticleService articleService;
    @Resource
    private SysUserService sysUserService;
    @Resource
    private HttpServletRequest request;

    @PostMapping("/admin/saveArticle")
    public Msg saveArticle(@RequestBody Article article){
        if(BaseUtil.isBlank(article.getArticleTitle(),article.getArticleContent(),article.getCategoryType())){
            return Msg.fail("缺少参数");
        }
        SysUser sysUser = sysUserService.getUser(request);
        article.setCreateUserId(sysUser.getId());
        article.setArticleSrc(sysUser.getUserName());
        return articleService.saveArticle(article);
    }

    /**
     * 分页
     * @param articlePageData
     * @return
     */
    @PostMapping("/getArticleList")
    public Msg getArticleList(@RequestBody PageData<Article> articlePageData){
        return articleService.getArticleList(articlePageData);
    }

    /**
     * 删除
     * @param articleId
     * @return
     */
    @GetMapping("/admin/deleteArticle")
    public Msg deleteArticle(Integer articleId){
        return articleService.deleteArticle(articleId);
    }

    @GetMapping("/getImg")
    public void getImg(String imgPath, HttpServletResponse response) throws Exception {
        System.out.println("<<<<<<<<<<<<<<<<<<---------------------加载了图片："+imgPath+"------------------------>>>>>>>>>>>>");
        // 载入图像
        BufferedImage buffImg = ImageIO.read(new FileInputStream(imgPath));
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        // 将图像输出到Servlet输出流中。
        ServletOutputStream sos = response.getOutputStream();
        String suffix = imgPath.substring(imgPath.lastIndexOf(".")+1);
        ImageIO.write(buffImg, suffix, sos);
        sos.close();
    }

    @PostMapping("/uploadFile")
    public Msg uploadFile(MultipartFile imgFile) throws IOException {
        if(imgFile==null){
            return Msg.fail("请上传图片");
        }
        String suffix = imgFile.getOriginalFilename().substring(imgFile.getOriginalFilename().lastIndexOf("."));
        InputStream inputStream = null;
        OutputStream outputStream = null;
        String outFile = null;
        try {
            //io存文件
            inputStream = imgFile.getInputStream();
            String outFileDir = "D://lostandfound/images";
            File file = new File(outFileDir);
            if (!file.exists()) {
                file.mkdirs();
            }
            outFile = outFileDir + "/" + System.currentTimeMillis() + suffix;
            outputStream = new FileOutputStream(outFile);
            int len;
            byte[] b = new byte[1024];
            while ((len = inputStream.read(b)) != -1) {
                outputStream.write(b, 0, len);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            inputStream.close();
            outputStream.close();
        }
        return Msg.success().setResp(outFile);
    }

}
