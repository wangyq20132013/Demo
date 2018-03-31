package com.wangyq.uacp.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController extends BaseController{
	
	
	@RequestMapping(value="/admin/{pagename}")
	public ModelAndView pageview(@PathVariable("pagename")String pagename,@RequestParam(required=false)Map<String, String> params){
		ModelAndView view = new ModelAndView("../uadp/"+ pagename);
		view.addAllObjects(params);
		
		return view;
	}
	
	@RequestMapping(value="/admin/{dir}/{pagename}")
	public ModelAndView page(@PathVariable("dir")String dir,@PathVariable("pagename")String pagename,@RequestParam(required=false)Map<String, String> params){
		ModelAndView view = new ModelAndView("../uadp/"+ dir +"/"+pagename);
		view.addAllObjects(params);
		
		return view;
	}
}
