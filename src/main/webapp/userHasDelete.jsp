<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
%>
<script>
alert("系统退出，当前用户已被删除。");
top.window.location.href = "<%=path%>/redirect/Login";
</script>