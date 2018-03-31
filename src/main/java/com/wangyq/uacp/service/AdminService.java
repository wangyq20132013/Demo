package com.wangyq.uacp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.at21.uarp.bean.User;
import com.wangyq.uacp.dao.AdminDao;


@Service
public class AdminService {
	@Autowired
	private AdminDao adminDao;
	
	public List<Map<String, Object>> getNavitems(User user) {
		List<Map<String, Object>> navitems = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> result = adminDao.getNavitems(user);
		for (int i = 0; i < result.size(); i++) {
			String pid = (String) (result.get(i).get("pid")+"");
			if ("-1".equals(pid)) {
				navitems.add(result.get(i));
			} else {
				for (int j = 0; j < i; j++) {
					if (result.get(i).get("pid").equals(result.get(j).get("id"))) {
						if (result.get(j).get("children") == null) {
							result.get(j).put("children", new ArrayList<Map<String, Object>>());
						}
						List<Map<String, Object>> chilren = (List<Map<String, Object>>) result.get(j).get("children");
						chilren.add(result.get(i));
					}
				}
			}

		}

		return navitems;
	}

}
