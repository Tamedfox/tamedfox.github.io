---
layout: post
title: "JQuery&AJAX--(一)AJAX简介 "
date: 2019-4-1
description: "JQuery,AJAX"
tag: 博客
--- 

## 一、AJAX简介
AJAX：Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）

AJAX并不是新的编程语言，而是一种使用现有标准的新方法。

AJAX是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下。

传统的网页(不使用AJAX)如果需要更新内容，必须重载整个网页。而AJAX无需重新加载整个网页，能够更新部分网页的技术。

## 二、AJAX使用步骤
**1.创建XMLHttpRequest对象：**

    var xmlhttp;
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }

所有现代的浏览器均内建XMLHttpRequest对象，而老版的IE5和IE6使用ActiveX对象

**2.设置回调函数：**

    xmlhttp.onreadystatechagne = function myFunction()
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
     		alert("设置回调函数");
        }
    }

**3.向服务器发送请求：**

XMLHttpRequest对象用于和服务器交换数据。

可以使用open（）和send（）方法

**open(method, url, async)**
method:请求类型；GET或POST
url:文件在服务器上的位置
async:true(异步)或false(同步)

**send(String)**
string:仅用于POST请求

**GET和POST的区别：**
GET较简单也更快，大部分情况下都可以使用

以下情况建议使用POST请求：

 - 无法使用缓存文件（更新服务器上的文件或数据库）
 - 向服务器发送大量数据（POST无数据量限制）
 - 发送包含未知字符，POST较稳定和可靠

## 三、AJAX实例

demo.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
    	pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>使用AJAX修改内容</title>
    <script type="text/javascript">
    function getXMLHttpRequest() {  
        var xmlhttp;
    	if (window.XMLHttpRequest)
    	{
    		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    		xmlhttp=new XMLHttpRequest();
    	}
    	else
    	{
    		// IE6, IE5 浏览器执行代码
    		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    	}
        return xmlhttp;  
    }  
    
    //执行请求
    function change() {
    	//1.创建xmlhttprequest对象
    	var request = getXMLHttpRequest();
    	//2.接收请求
    	// 请求类型 请求路径   是否异步
    	request.open("GET", "ChangeText",true );	
    	//3.获取相应数据，注册监听 一旦状态发生改变，就执行等号右边的方法
    	request.onreadystatechange=function(){
    		//前半段表示已经可以正常，在判断状态吗是否是200
    		if(request.readyState == 4 && request.status == 200){
    			//更新div01的内容
    			document.getElementById("div01").innerHTML = request.responseText;
    		}
    	}
    	request.send();	
    }
    </script>
    
    </head>
    <body>
    	<div id="div01">使用AJAX修改内容</div>
    	<button type="button" onclick="change()">修改内容</button>
    </body>
    </html>

ChangeText.java

    package com.servlet;
    
    import java.io.IOException;
    import javax.servlet.ServletException;
    import javax.servlet.http.HttpServlet;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpServletResponse;
    
    /**
     * Servlet implementation class ChangeText
     */
    public class ChangeText extends HttpServlet {
    	private static final long serialVersionUID = 1L;
           
        /**
         * @see HttpServlet#HttpServlet()
         */
        public ChangeText() {
            super();
            // TODO Auto-generated constructor stub
        }
    
    	/**
    	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
    	 */
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		response.setContentType("text/html;charset=utf-8");
    		response.getWriter().write("内容改变了 ");
    	}
    
    	/**
    	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
    	 */
    	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    		
    		doGet(request, response);
    	}
    
    }

**结果如下：**

点击前：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406223744610.png)

点击后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406223914844.png)


