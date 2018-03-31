package com.wangyq.websocket;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

/**
 * 使用注解的方式集成Spring WebSocket，同时集成Spring Session 避免在WebSocket会话期间Http Session失效
 * 
 */
@Configuration
@EnableWebMvc
@EnableWebSocket
public class WebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {

	@Autowired
	private ChatWebSocketHandler chatWebSocketHandler;

	@Autowired
	private HandshakeInterceptor handshakeInterceptor;
	
	/*@Resource
    private WebSocketSessionManager webSocketSessionManager;*/

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

		registry.addHandler(chatWebSocketHandler, "/websocket/chat").addInterceptors(handshakeInterceptor)
				.setAllowedOrigins("*")/* 不加AllowedOrigins，有可能会全拒绝 */;
	}

	@Bean
	public ServletServerContainerFactoryBean createWebSocketContainer() {
		ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
		container.setMaxTextMessageBufferSize(8192);
		container.setMaxBinaryMessageBufferSize(8192);
		return container;
	}

}
