<%@ page contentType="text/html; charset=GBK" autoFlush="false"  import="java.util.*,java.awt.*,java.awt.image.*,com.sun.image.codec.jpeg.*,java.util.*" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page import="java.io.PrintWriter" %>
<%
	request.setCharacterEncoding("GBK");
	response.setCharacterEncoding("GBK");
	response.setContentType("text/html; charset=GBK");
%>
<%
//自定义生成的字母或数字
String chose="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

char display[]={'0',' ','0',' ','0',' ','0'},ran[]={'0','0','0','0'},temp;
//生成随机类
Random rand=new Random();
//对生成的字母数字进行循环处理
for(int i=0;i<4;i++)
{

 temp=chose.charAt(rand.nextInt(chose.length()));

 display[i*2]=temp;

 ran[i]=temp;
 }
 
String random=String.valueOf(display);
JSONObject json = new JSONObject();
json.put("success", true);
json.put("verifyCode", random);
json.put("verifyCodeStr", String.valueOf(ran));
PrintWriter pw = response.getWriter();
pw.print(json.toString());
pw.flush();
pw.close();
 %>
