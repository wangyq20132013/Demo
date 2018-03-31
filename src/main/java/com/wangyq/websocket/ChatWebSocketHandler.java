package com.wangyq.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import com.alibaba.fastjson.JSONObject;
import com.at21.uarp.bean.User;


@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {
	
	private static final Log logger = LogFactory.getLog(ChatWebSocketHandler.class);
	
	private static final List<WebSocketSession> users = new ArrayList<>();
	
	private static final Map<String,WebSocketSession> userSession = new HashMap<String, WebSocketSession>();
	

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		try {
			System.out.println(session.getAttributes().get("user"));
			User user = (User) session.getAttributes().get("user");
			userSession.put(user.getLoginname(), session);
			System.out.println("add:"+user.getLoginname());
			System.out.println(userSession.size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		User user = (User) session.getAttributes().get("user");
		System.out.println("user:"+user.getLoginname());
		
		JSONObject msgJson = JSONObject.parseObject(message.getPayload());
		
		WebSocketSession msgSession  = userSession.get(msgJson.get("user"));
		TextMessage retMsg = new TextMessage(user.getLogintitle()+":>>"+msgJson.getString("message")+"\n");
		if(msgSession != null){
			msgSession.sendMessage(retMsg);
		}
		
		System.out.println("Text message:" + message.getPayload());
		
		
		session.sendMessage(retMsg);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		if(session.isOpen()){
			session.close();
		}
	}
	
	
}
