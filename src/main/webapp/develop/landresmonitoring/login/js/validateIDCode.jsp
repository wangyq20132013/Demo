<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.at21.base.thirdparty.json.JSONUtils" %>
<%@ page import="java.io.PrintWriter" %>
<%
String verifyCode = request.getParameter("verifyCode");
String random=(String)request.getSession().getAttribute("random1");
String result = "";
if(verifyCode!=null&&random!=null){
	if(!verifyCode.equalsIgnoreCase(random)){
		result="failed:"+random;
  
	}else{
		result="success:"+random;
	}
}
String jsonStr = JSONUtils.toJSON(result);
if (jsonStr != null){
	PrintWriter pw = response.getWriter();
	pw.print(jsonStr);
	pw.flush();
	pw.close();
}
%>
