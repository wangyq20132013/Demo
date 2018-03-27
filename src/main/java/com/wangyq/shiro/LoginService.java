package com.wangyq.shiro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public User getUserbyUserName(String username){
		
		return new User(username,"123456");
	}
}
