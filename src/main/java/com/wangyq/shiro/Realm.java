package com.wangyq.shiro;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.at21.uarp.bean.User;
import com.wangyq.uacp.service.LoginService;

@Component
public class Realm extends AuthorizingRealm {
	
	private static final Logger logger = LoggerFactory.getLogger(Realm.class);

	@Autowired
	private LoginService loginService;

	// 权限
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		// 添加用户权限
		info.addStringPermission("user");
		System.out.println("123");
		return info;
	}

	// 登录验证
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken)
			throws AuthenticationException {
		UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
		try {
			User user = loginService.login(token.getUsername(), token.getPassword().toString());
			if (user != null) {

				AuthenticationInfo authcInfo = new SimpleAuthenticationInfo(user, user.getPassword(),
						user.getLogintitle());
				return authcInfo;
			}
		} catch (Exception e) {
			logger.error("", token.getUsername());
		}
		logger.warn("No user: {}", token.getUsername());

		return null;
	}

	/** 保存session */
	private void saveSession(String account, String host) {

	}

}
