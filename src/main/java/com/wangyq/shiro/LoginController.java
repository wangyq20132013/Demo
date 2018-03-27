package com.wangyq.shiro;

import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping()
public class LoginController {
	
	@RequestMapping("/index")
	public String index(HttpServletRequest request){
		Subject subject = SecurityUtils.getSubject();
		
		Session session = SecurityUtils.getSubject().getSession();
		User user = (User)SecurityUtils.getSubject().getPrincipal();
		
		request.setAttribute("sessionId", session.getId());
		request.setAttribute("host", session.getHost());
		request.setAttribute("user", user.toString());
		
		
		return "index";
	}
	
	
	@RequestMapping(value = "/login",method=RequestMethod.GET)
	public String login() {
		Subject subject = SecurityUtils.getSubject();
		
		Session session = SecurityUtils.getSubject().getSession();
		
		System.out.println(session);
		
		return "login";
	}

	@RequestMapping(value = "/login", method=RequestMethod.POST)
	public String doPostlogin(HttpServletRequest request, String username, String password) {
		UsernamePasswordToken token = new UsernamePasswordToken(username, password,false);
		Subject subject = SecurityUtils.getSubject();
		try {
			if(subject.isRemembered()){
				System.out.println("---");
			}else{
				//token.setRememberMe(true);
			}
			subject.login(token);
		} catch (Exception e) {
			e.printStackTrace();
			return "login";
		}
		return "forward:/index";
	}
}
