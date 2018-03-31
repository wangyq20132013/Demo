<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
    String path = request.getContextPath();
%>
<script>
alert("数据库连接异常，请与管理员联系！");
top.window.location.href = "<%=path%>/redirect/Login";
top.frames['banner'].location.href = "";
top.frames['leftmenu'].location.href = "";
top.frames['separatorLeft'].location.href = "";
top.frames['desktop'].location.href = "";
top.frames['bottom'].location.href = "";
</script>