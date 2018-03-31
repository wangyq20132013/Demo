package com.wangyq.uacp.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.at21.uarp.bean.User;
import com.wangyq.uacp.service.AdminService;

@Controller
@RequestMapping("/admin")
public class adminController extends BaseController{
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request){
		User user = (User) request.getSession().getAttribute("user");
		ModelAndView modelAndView = null;
		if(user == null){
			//List<Map<String, Object>> navitems = adminService.getNavitems(user);
			
			modelAndView = new ModelAndView("../uadp/adminIndex");
			//modelAndView.addObject("navitems", JSONArray.fromObject(navitems));
			//modelAndView.addObject("user", JSONObject.fromObject(user));
			
		}else{
			modelAndView = new ModelAndView(MVC_REDIRECT+"/admin/login");
		}
		
		return modelAndView;
	}
	
	
	@GetMapping(value="/login")
	public ModelAndView login(){
		ModelAndView view = new ModelAndView("../uadp/adminlogin");
		
		return view;
	}
	
	@RequestMapping("/main")
	public ModelAndView main(HttpServletRequest request,String id){
		ModelAndView modelAndView = new ModelAndView("../uadp/adminMain");
		modelAndView.addObject("id", id);
		
		return modelAndView;
	}
	
}
