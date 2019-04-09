---
layout: post
title: "JQuery&AJAX--(二)JQuery使用AJAX "
date: 2019-4-3
description: "JQuery,AJAX"
tag: 博客
--- 

## 一、JQuery和AJAX
jQuery 提供多个与 AJAX 有关的方法。

通过 jQuery AJAX 方法，能够使用 HTTP Get 和 HTTP Post 从远程服务器上请求文本、HTML、XML 或 JSON。同时也能够把这些外部数据直接载入网页的被选元素中。

如果没有 jQuery，AJAX 编程还是有些难度的。

## 二、JQuery的load()方法
load()方法从服务器加载数据，并把返回的数据放入被选元素中，是简单但很强大的AJAX方法。

    $(selector).load(URL,data,callback);

必需的 URL 参数规定您希望加载的 URL。

可选的 data 参数规定与请求一同发送的查询字符串键/值对集合。

可选的 callback 参数是 load() 方法完成后所执行的函数名称。

实例如下：

需要引入jquery-1.11.3.min.js

demo.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){
    		$("#btn").click(function(){
    			$("#div01").load("test.txt");
    		})
    	})	
    	
    </script>
    </head>
    <body>
    	<div id="div01">使用JQuery&AJAX</div>
    	<button id="btn" type="button" >改变内容</button>
    </body>
    </html>

test.txt

    内容更改了

**结果如下：**
更改前：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406230638884.png)
更改后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406230714353.png)

## 三、JQuery - AJAX get() 和 post() 方法
**$.get() 方法:**

$.get() 方法通过 HTTP GET 请求从服务器上请求数据。

    $.get(URL,callback);

必需的 URL 参数规定您希望请求的 URL。

可选的 callback 参数是请求成功后所执行的函数名。

demo.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){
    		$("button").click(function(){
    			$.get("GetDemoServlet", function(data, status){
    				alert("返回数据:" + data +"\n返回状态:" +status);
    			})
    		})
    	})
    
    </script>
    </head>
    <body>
    	<button>取得返回Servlet的信息</button>
    </body>
    </html>

GetDemoServlet.java

    package com.servlet;
    
    import java.io.IOException;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    
    /**
     * Servlet implementation class GetDemoServlet
     */
    public class GetDemoServlet extends HttpServlet {
    	private static final long serialVersionUID = 1L;
           
        /**
         * @see HttpServlet#HttpServlet()
         */
        public GetDemoServlet() {
            super();
            // TODO Auto-generated constructor stub
        }
    
    	/**
    	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
    	 */
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		response.setContentType("text/html;charset=UTF-8");
    		response.getWriter().println("数据返回了");
    	}
    
    	/**
    	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
    	 */
    	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		// TODO Auto-generated method stub
    		doGet(request, response);
    	}
    
    }


结果如下：
![
](https://img-blog.csdnimg.cn/20190407131157575.png)

点击后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190407131233539.png)
**$.post() 方法:**

$.post() 方法通过 HTTP POST 请求从服务器上请求数据。

    $.post(URL,data,callback);

必需的 URL 参数规定您希望请求的 URL。
可选的 data 参数规定连同请求发送的数据。
可选的 callback 参数是请求成功后所执行的函数名。


demo.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
    	$(document).ready(function(){
    		$("button").click(function(){
    			$.post("PostDemoServlet", {fname:"chen",lname:"starstar"},function(data, status){
    				alert("返回数据:" + data +"\n返回状态:" +status);
    			})
    		})
    	})
    
    </script>
    </head>
    <body>
    	<button>取得返回Servlet的信息</button>
    </body>
    </html>

PostDemoServlet.java

    package com.servlet;
    
    import java.io.IOException;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    
    /**
     * Servlet implementation class PostDemoServlet
     */
    public class PostDemoServlet extends HttpServlet {
    	private static final long serialVersionUID = 1L;
           
        /**
         * @see HttpServlet#HttpServlet()
         */
        public PostDemoServlet() {
            super();
            // TODO Auto-generated constructor stub
        }
    
    	/**
    	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
    	 */
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		request.setCharacterEncoding("UTF-8");
    		response.setContentType("text/html;charset=UTF-8");
    		String fname = request.getParameter("fname");
    		String lname = request.getParameter("lname");
    		response.getWriter().println("Welcome! " + fname +" "+ lname);
    		response.getWriter().print("数据返回了");
    	}
    
    	/**
    	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
    	 */
    	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		doGet(request, response);
    	}
    
    }

结果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190407132319259.png)

感觉JQuery使用AJAX，相比单纯的AJAX会更方便简洁一点


