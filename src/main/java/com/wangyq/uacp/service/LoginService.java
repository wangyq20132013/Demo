package com.wangyq.uacp.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.at21.uarp.bean.User;
import com.wangyq.uacp.dao.LoginDao;
import com.wangyq.util.MD5Util;

@Service()
public class LoginService{
	
	private final Logger logger = LogManager.getLogger(this.getClass());
	
	@Autowired
	private LoginDao loginDao;
	
	@Autowired(required=false)
	private JdbcTemplate jdbcTemplate;
	
	public User login(String loginname,String password){
		User user = null;
		try {
			Map<String, String> map = new HashMap<String, String>();
			map.put("loginname", loginname);
			map.put("password", password);
			
			user = loginDao.login(map);
		} catch (Exception e) {
			logger.error("loginDao.login:",e.getCause());
		}
		
		return user;
	}
}
