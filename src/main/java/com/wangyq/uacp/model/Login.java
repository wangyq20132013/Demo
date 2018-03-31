package com.wangyq.uacp.model;

import java.io.Serializable;
/**
 * 
 * @author 王勇强
 *
 */
public class Login implements Serializable {
	private static final long serialVersionUID = 7590942967246085118L;
	
	private String account;
	private String password;
	
	
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
