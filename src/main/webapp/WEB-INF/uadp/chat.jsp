<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>统一应用管理系统</title>
		<link rel="icon" href="img/favicon.ico">
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/bootstrap/css/bootstrap.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/resources/font-awesome/css/font-awesome.min.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/uadp/css/style.css'/>"></link>
		<link rel="stylesheet" type="text/css" href="<c:url value='/uadp/css/pagemanage.css'/>"></link>
		<script type="text/javascript">
			var cxt = '${pageContext.request.contextPath}';
		</script>
	</head>

	<body>
		<div class="p-xxs page-toolbar text-right">
			<button type="button" class="btn btn-sm btn-danger" onclick="connect()">
			<i class="glyphicon glyphicon-plus"></i>连接
		</button>
		</div>
		<div class="p-lg">
			<form class="form-horizontal">
				<div class="form-group">
					<textarea rows="10" cols="50" class="form-control" id="des" readonly></textarea>
				</div>
				<div class="form-group">
					<input id="msg" name="msg" class="form-control" type="text">
				</div>
				<div class="form-group text-right">
					<button type="button" class="btn btn-success" onclick="sendMsg()">发送</button>
				</div>
				
				
			</form>
		</div>
	</body>
	<script type="text/javascript">
		var basepath = '<%=path%>';
		var ws;

		function connect() {
			/* 建立连接 */
			ws = new WebSocket("ws://" + window.location.host + basepath +
				"/websocket/chat");
			ws.onopen = function() { /* 连接成功时 */
				ws.send(JSON.stringify({
					signal: 'C_START',
					message: '179'
				}));
			};

			ws.onmessage = function(evt) { /* 收到消息时 */
				var received_msg = evt.data;
				document.getElementById("des").append(received_msg)
				console.info("Message is received... " + received_msg);
			};
			ws.onclose = function() { /* 连接断开时 */
				console.warn("Connection is closed...");
			};
			ws.onerror = function(e) { /* 出现错误时 */
				console.error(e);
			}
		}

		function sendMsg() {
			var msg = document.getElementById("msg").value;
			if(ws){
				ws.send(JSON.stringify({
					user: 'admin',
					message: msg
				}));
				document.getElementById("msg").value = "";
			}else{
				connect();
			}
			
		}
	</script>

</html>