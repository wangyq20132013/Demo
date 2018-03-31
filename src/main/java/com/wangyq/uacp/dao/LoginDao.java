package com.wangyq.uacp.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.at21.uarp.bean.User;

@Repository
public class LoginDao extends SqlSessionDaoSupport {
	
	public User login(Map<String, String> map) throws Exception {
		return this.getSqlSession().selectOne(this.getClass().getName() + ".login", map);
	}

	@Resource
	public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
		super.setSqlSessionFactory(sqlSessionFactory);
	}
}
