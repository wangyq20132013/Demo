package com.wangyq.uacp.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Value;

import com.at21.uarp.bean.User;
import com.at21.uarp.util.JsonResult;


/**
 * Date: 16/10/9
 * Time: 下午1:37
 * Describe: 基础控制器
 */
public class BaseController {
	protected static final String MVC_FORWARD = "forward:";
	protected static final String MVC_REDIRECT = "redirect:";
	
	public String online;
	
	public static int number = 0;
	
	protected static final String ERROR_MSG_KEY = "errorMsg";  
	
	
	
	protected User getSessionUser(){
		return (User) SecurityUtils.getSubject().getPrincipal();
	}
	
	//获取保存在Session中的用户对象  
    protected User getSessionUser(HttpServletRequest request) {  
        return (User) request.getSession().getAttribute("user");  
    }  
     
    //将用户对象保存到Session中  
    protected void setSessionUser(HttpServletRequest request,User user) {  
        request.getSession().setAttribute("user",  user);  
    }  
      
    //获取基于应用程序的url绝对路径  
    public final String getAppbaseUrl(HttpServletRequest request, String url) {  
        return request.getContextPath() + url;  
    }  
    
    /**
     * 渲染失败数据
     *
     * @return result
     */
    protected JsonResult renderError() {
        JsonResult result = new JsonResult();
        result.setSuccess(false);
        result.setStatus("500");
        return result;
    }

    /**
     * 渲染失败数据（带消息）
     *
     * @param msg 需要返回的消息
     * @return result
     */
    protected JsonResult renderError(String msg) {
        JsonResult result = renderError();
        result.setMsg(msg);
        return result;
    }
    
    /**
     * 渲染失败数据（带消息）
     *
     * @param msg 需要返回的消息
     * @return result
     */
    protected JsonResult renderError(String status, String msg) {
        JsonResult result = renderError();
        result.setStatus(status);
        result.setMsg(msg);
        return result;
    }
   

    /**
     * 渲染成功数据
     *
     * @return result
     */
    protected JsonResult renderSuccess() {
        JsonResult result = new JsonResult();
        result.setSuccess(true);
        result.setStatus("200");
        return result;
    }

    /**
     * 渲染成功数据（带信息）
     *
     * @param msg 需要返回的信息
     * @return result
     */
    protected JsonResult renderSuccess(String msg) {
        JsonResult result = renderSuccess();
        result.setMsg(msg);
        return result;
    }

    /**
     * 渲染成功数据（带数据）
     *
     * @param obj 需要返回的对象
     * @return result
     */
    protected JsonResult renderSuccess(Object obj) {
        JsonResult result = renderSuccess();
        result.setObj(obj);
        return result;
    } 
}
