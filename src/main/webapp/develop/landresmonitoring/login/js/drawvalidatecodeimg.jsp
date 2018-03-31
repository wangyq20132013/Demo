<%@ page contentType="image/jpeg" autoFlush="false"  import="java.util.*,java.awt.*,java.awt.image.*,com.sun.image.codec.jpeg.*,java.util.*" %>
<%
	System.setProperty("java.awt.headless", "true");
	String random = request.getParameter("verifyCode");
	Random rand=new Random();
    out.clear();
    response.setContentType("image/jpeg");
    response.addHeader("pragma","NO-cache");
    response.addHeader("Cache-Control","no-cache");
    response.setHeader("Content-Type", "image/jpeg");
    response.addDateHeader("Expires",0);
    int width=100, height=20;
    BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
    Graphics g = image.getGraphics();
	// 设定背景色
	g.setColor(new Color(200+rand.nextInt(50),200+rand.nextInt(50),200+rand.nextInt(50)));
	g.fillRect(0, 0, width, height);
	
	// 随机产生155条干扰线，使图象中的认证码不易被其它程序探测到
	g.setColor(new Color(200+rand.nextInt(40),200+rand.nextInt(40),200+rand.nextInt(40)));
	for (int i=0;i<60;i++) {
		int x = rand.nextInt(width);
		int y = rand.nextInt(height);
		int xl = rand.nextInt(12);
		int yl = rand.nextInt(12);
		g.drawLine(x,y,x+xl,y+yl);
	}

   //设置字体颜色
    g.setColor(new Color(20+rand.nextInt(110),20+rand.nextInt(110),20+rand.nextInt(110)));
    Font font=new Font("Arial",Font.PLAIN,18);
    g.setFont(font);
    g.drawString(random,16,16);
    g.dispose();
    ServletOutputStream outStream = response.getOutputStream();
    JPEGImageEncoder encoder =JPEGCodec.createJPEGEncoder(outStream);
    encoder.encode(image);
    outStream.flush();
    outStream.close();
   %>