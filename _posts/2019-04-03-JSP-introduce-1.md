---
layout: post
title: "JSP教程--(一)语法及简单应用"
date: 2019-4-6
description: "JSP,Servlet"
tag: 博客
--- 

## 一、JSP简介
**JSP：**

JSP全称Java Server Pages，是一种动态网页开发技术。它使用JSP标签在HTML网页中插入Java代码。标签通常以<%开头以%>结束。

JSP是一种Java servlet，主要用于实现Java web应用程序的用户界面部分。网页开发者们通过结合HTML代码、XHTML代码、XML元素以及嵌入JSP操作和命令来编写JSP。

JSP通过网页表单获取用户输入数据、访问数据库及其他数据源，然后动态地创建网页。

JSP标签有多种功能，比如访问数据库、记录用户选择信息、访问JavaBeans组件等，还可以在不同的网页中传递控制信息和共享信息。

**JSP的优势：**

 - 与纯Servlet相比：JSP可以很方便的编写或者修改HTML网页而不需要使用大量的println语句
 - 与JavaScript相比：JavaScript虽然可以在客户端生成动态HTML，但是很难与服务器交互，因此不能提供较复杂的服务
 - 与静态HTML相比：静态HTML不包含动态信息。

## 二、JSP语法教程
**脚本程序:**

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    	<% 
    		out.println("Your ID address is " + request.getRemoteAddr());
    	%>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190403171405151.png)
**JSP声明：**
使用<%! %>声明
如：<%! int i = 0; %>

**JSP表达式:**
表达式的值会被转换为String，因此可以在文本行中直接使用表达式
如：<%= (new java.util.Data()).toLocaleString()%>

**JSP指令:**
<%@ page ... %> : 定义页面的依赖属性，比如脚本语言、error页面、缓存需求等等
<%@ include ... %> : 包含其他文件
<%@ taglib ... %> : 引入标签库的定义，可以是自定义标签

## 三、HttpServletRequest类
使用HttpServletRequest类的getHeaderNames()方法来读取HTTP信息头

  *Enumeration getHeaderNames()；
        返回所有HTTP头的名称集合*

    <%@page import="java.util.Enumeration"%>
    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>获取请求头</title>
    </head>
    <body>
    
    <p3>获取请求头</p3><br>
    <br>
    
    <table border="1px">
    	<%
    		Enumeration headerNames = request.getHeaderNames();
    		while(headerNames.hasMoreElements()){
    			String paramName = (String)headerNames.nextElement();
    			out.print("<tr><td>" + paramName + "<td>");
    			String paramValue = request.getHeader(paramName);
    			out.print("<td>" + paramValue +"</td></tr>\n");
    		}
    	%>
    	</table>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190403174232551.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)

## 四、HttpServletResponse类
使用HttpServletResponse类的实例response可以设置响应头

如下设置响应头进行自动刷新

    <%@page import="java.util.Calendar"%>
    <%@ page language="java" contentType="text/html; charset=UTF-8"
    	pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>设置自动刷新</title>
    </head>
    <body>
    
    	<%
    	//设置每隔5秒自动刷新
    	response.setIntHeader("Refresh", 5);
    //获取日期
    	Calendar cal = Calendar.getInstance();
    	int year = cal.get(Calendar.YEAR);
    	int month = cal.get(Calendar.MONTH) + 1;
    	int day = cal.get(Calendar.DAY_OF_MONTH);
    	int hour = cal.get(Calendar.HOUR);
    	int minute = cal.get(Calendar.MINUTE);
    	int second = cal.get(Calendar.SECOND);
    	int weekday = cal.get(Calendar.DAY_OF_WEEK) - 1;
    	String timeMark= year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second 
    			+ "   今天是星期" + weekday;
    	out.println(timeMark);
    %>
    
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190403184622781.png)

## 五、表单处理
JSP常用的情景之一

提交数据，浏览器中经常使用GET和POST方法

**GET方法：**
GET方法将编码信息添加在网址后面，与网址通过“？”号分隔，可以直接看到数据，密码等敏感信息不建议使用get方法。
因为将信息添加至网址后面，其传输数据的大小有限制，最大为1024字节。

       <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>使用GET方法获取数据</title>
    </head>
    <body>
    	<h2>使用GET方法获取数</h2>
    	<!-- 解决中文乱码 -->
    	<p>姓名：<%=new String((request.getParameter("name")).getBytes("ISO-8859-1"),"UTF-8")%></p>
    	<p>年龄：<%=request.getParameter("age") %></p>
    </body>
    </html>
    
    <!--  http://localhost:8080/JSPDemo/GetDemo.jsp?name=小陈&age=26 -->

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019040319023065.png)
**使用post方法：**
post提交数据为隐式，敏感信息可以通过post提交

index.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>使用post方法读取数据</title>
    </head>
    <body>
    <h2>使用post方法读取数据</h2>
    
    <form action="PostDemo.jsp" method="post">
    	姓名：<input type=text name="name"><br>
    	年龄：<input type=text name="age">	<br>	
    	<input type="submit" value="提交">
    </form>
    </body>
    </html>

PostDemo.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>使用post方法读取数据</title>
    </head>
    <body>
    	使用post方法读取数据
    	<p>姓名:<%=new String((request.getParameter("name")).getBytes("ISO-8859-1"),"UTF-8") %></p>
    	<p>年龄：<%=request.getParameter("age") %></p>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190403190900139.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190403190911104.png)

## 六、Cookie处理
**使用JSP设置cookie包含三个步骤：**

(1)创建一个Cookie对象；
(2) 设置有效期；
(3) 将cookie发送至HTTP响应头中。

index.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>设置cookie</title>
    </head>
    <body>
    <h2>设置cookie</h2>
    
    <form action="SetCookie.jsp" method="post">
    	姓名：<input type=text name="name"><br>
    	年龄：<input type=text name="age">	<br>	
    	<input type="submit" value="提交">
    </form>
    </body>
    </html>

SetCookie.jsp

    <%@page import="java.net.URLEncoder"%>
    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <%
    	//解决中文乱码
    	String str = URLEncoder.encode(request.getParameter("name"));
    	//设置cookie
    	Cookie name = new Cookie("name", str);
    	Cookie age = new Cookie("age", request.getParameter("age"));
    	//设置cookie的过期时间为24h
    	name.setMaxAge(60*60*24);
    	age.setMaxAge(60*60*24);
    	//响应头添加cookie
    	response.addCookie(name);
    	response.addCookie(age);
    %>
    
    </head>
    <body>
    	<table border="1">
    		<tr>
    			<td>姓名:</td>
    			<td><%=new String(request.getParameter("name").getBytes("ISO-8859-1"),"UTF-8") %></td>
    		</tr>
    		<tr>
    			<td>年龄:</td>
    			<td><%=request.getParameter("age") %></td>
    		</tr>
    	</table>
    
    </body>
    </html>

输入数据后结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190403235559947.png)

GetCookie.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
        <%@page import="java.net.*"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Get Cookie</title>
    
    </head>
    <body>
    	
    <%
    	//取得cookie的数据
    	Cookie[] cookies = request.getCookies();
    	if(cookies != null) {
    		for(Cookie cookie : cookies){
    			out.print("名称:" + cookie.getName());
    			out.print("<br>");
    			out.print("数值:" + URLDecoder.decode(cookie.getValue(), "utf-8"));
    			out.print("<br><br>");	
    		} 
    	} else {
    		out.println("<h2>无cookie</h2>");
    	}
    %>
    
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019040400273463.png)
中文有点乱码，今天太晚了，改日解决。。。

## 七、Session处理
session在网络中被称为会话，由于HTTP协议是一种无状态协议，也就是当客户端向服务器发出请求时，服务器接收请求并返回响应后，该链接结束，服务器不保存相应的信息。为了弥补这一缺点，HTTP协议提供了session。

session保存在服务器端，为了高速存取一般放在服务器的内存中。而每个用户独立一个session，因此用户多了后，session会越来越多，为了防止内存溢出，服务器会把长时间没有活跃的session移除。Tomcat的默认失效时间为30分钟。

index03.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>利用session实现自动登录</title>
    </head>
    <body>
    <h3>登录页面</h3>
    <form action="sessiondeal.jsp" method="post">
    	账号：<input type="text" name="user"	><br>
    	账号：<input type="password" name="password"	><br>
    	<input type="submit" value="登录">
    </form>
    </body>
    </html>

sessiondeal.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    	<%
    		String user = request.getParameter("user");
    		String pwd = request.getParameter("password");
    		boolean flag = false;
    		if("admin".equals(user) && "admin".equals(pwd))
    			flag= true;
    		if(flag){
    			session.setAttribute("user", user);
    			response.sendRedirect("login.jsp");
    		} else {
    			response.sendRedirect("index03.jsp");
    		}
    	
    	%>
    </body>
    </html>

login.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>成功登录</title>
    </head>
    <body>
    
    	<h2>登录成功</h2>
    	欢迎你! <%=session.getAttribute("user") %>
    
    </body>
    </html>
登录成功后显示如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190404140021700.png)

## 八、Application应用
Application对象是JSP的一个内置对象。当服务器启动时，该对象被自动创建，直到服务器关闭该对象才会消失，并且在此期间可以被多个用户共同使用。这是不同于session对象的。

下列使用application实现网站计数:

count.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>网站流量统计</title>
    </head>
    <body>
    
    <h3>网站流量统计</h3>
    <%
    	Integer count = (Integer)application.getAttribute("count");
    	if(count == null || count==0	){
    		out.println("欢迎访问！");
    		count = 1;
    	} else {
    		out.println("欢迎再次访问！");
    		count++;
    	}
    	application.setAttribute("count", count);
    %>
    
    <p>访问量：<%=count %></p>
    
    </body>
    </html>

结果如下：

首次访问
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190405132727203.png)
以后访问：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190405132758636.png)


