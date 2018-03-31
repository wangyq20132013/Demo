package com.wangyq.uacp.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wangyq.uacp.model.Login;
import com.wangyq.util.MD5Util;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

/**
 * 用户登录
 * 
 * @author wangyq
 * @version 2018年03月03日 下午3:11:21
 */
@Controller
@Api(value = "登录接口")
public class LoginController extends BaseController {

	// 登录
	@ApiOperation(value = "用户登录")
	@RequestMapping("/admin/login")
	@ResponseBody
	public Object login(@ApiParam(required = true, value = "登录帐号和密码") Login user, String checkcode, ModelMap modelMap,
			HttpServletRequest request) {
		if (checkcode.equalsIgnoreCase((String) request.getSession().getAttribute("check"))) {
			try {
				UsernamePasswordToken token = new UsernamePasswordToken(user.getAccount(), MD5Util.cryptStr(user.getPassword()),false);
				Subject subject = SecurityUtils.getSubject();
				subject.login(token);
				return renderSuccess("[" + user.getAccount() + "]登录成功.");
			} catch (Exception e) {
				return renderError("账号或密码错误！");
			}
		} else {
			return renderError("codeError", "验证码错误！");
		}
	}

	// 登出
	@ApiOperation(value = "用户登出")
	@RequestMapping("/logout")
	public String logout(HttpServletRequest request, ModelMap modelMap) {
		SecurityUtils.getSubject().logout();
		return MVC_REDIRECT+"redirect";
	}
}
