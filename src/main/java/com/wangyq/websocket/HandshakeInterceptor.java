package com.wangyq.websocket;

import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import com.at21.uarp.bean.User;

@Component
public class HandshakeInterceptor extends HttpSessionHandshakeInterceptor {

	private static final Logger logger = LoggerFactory.getLogger(HandshakeInterceptor.class);

	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		// 调用父类的方法，将HttpSession中的信息copy到attributes中
		// super.beforeHandshake(request, response, wsHandler, attributes);

		User user = (User) SecurityUtils.getSubject().getPrincipal();
		if (user != null) {
			attributes.put("user", user);
			return true;
		} else {
			response.setStatusCode(HttpStatus.UNAUTHORIZED);
			return false;
		}
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception ex) {

		System.out.println("After Handshake");
		super.afterHandshake(request, response, wsHandler, ex);
	}

}
