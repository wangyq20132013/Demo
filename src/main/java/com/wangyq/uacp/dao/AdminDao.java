package com.wangyq.uacp.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

import com.at21.uarp.bean.User;

@Repository
public class AdminDao extends SqlSessionDaoSupport{

	public User login(String loginname,String password) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("loginname", loginname);
		map.put("password", password);
		
		return this.getSqlSession().selectOne(this.getClass().getName() + ".login", map);
	}
	
	public List<Map<String, Object>> getNavitems(User user){
		
		return this.getSqlSession().selectList(this.getClass().getName()+".getNavitems", user);
	}
	
	@Resource
    public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
        super.setSqlSessionFactory(sqlSessionFactory);
    }
}
