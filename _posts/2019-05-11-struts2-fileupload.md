---
layout: post
title: "Struts2实现上传文件"
date: 2019-05-11
description: "Struts2,上传文件"
tag: 博客
--- 

## 一、上传实例
代码如下：

web.xml

    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
      <display-name>FileUpload</display-name>
      <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
        <welcome-file>index.jsp</welcome-file>
        <welcome-file>default.html</welcome-file>
        <welcome-file>default.htm</welcome-file>
        <welcome-file>default.jsp</welcome-file>
      </welcome-file-list>
      
      <!-- Struts2的核心过滤器配置 -->
      <filter>
      	<filter-name>struts2</filter-name>
      	<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
      </filter>
      
      <filter-mapping>
      	<filter-name>struts2</filter-name>
      	<url-pattern>/*</url-pattern>
      </filter-mapping>
    </web-app>

index.jsp 上传文件的jsp页面

    <%@ page language="java" contentType="text/html; charset=UTF-8"
    	pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>文件上传</title>
    </head>
    <body>
    
    	<h3>请上传图片文件</h3>
    	<form action="upload" method="post" enctype="multipart/form-data">
    		<input type="file" name="myFile">
    		<input type="submit">
    	</form>
    
    </body>
    </html>

success.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
        <%@ taglib prefix="s" uri="/struts-tags" %>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>文件成功上传</title>
    </head>
    <body>
    
    <h3><s:property value="myFileFileName"/>文件已成功上传</h3>
    
    </body>
    </html>

error.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    
    	<h3>文件上传错误</h3>
    </body>
    </html>

Action类

    package com.cf.upload.demo;
    
    import java.io.File;
    import java.io.IOException;
    
    import org.apache.commons.io.FileUtils;
    
    import com.opensymphony.xwork2.ActionSupport;
    
    public class UploadDemo extends ActionSupport {
    	// 设置上传文件属性参数,固定参数
    	private File myFile;
    	private String myFileContentType;
    	private String myFileFileName;
    	//上传文件夹路径
    	private String destPath; 
    
    	@Override
    	public String execute() throws Exception {
    		
    		//设置上传文件夹
    		destPath = "D:/demo01";
    		
    		File destFile = new File(destPath, myFileFileName);
    		
    		FileUtils.copyFile(myFile, destFile);
    		
    		return SUCCESS;
    	}
    	
    	//设置get&set方法
    	public File getMyFile() {
    		return myFile;
    	}
    
    	public void setMyFile(File myFile) {
    		this.myFile = myFile;
    	}
    
    	public String getMyFileContentType() {
    		return myFileContentType;
    	}
    
    	public void setMyFileContentType(String myFileContentType) {
    		this.myFileContentType = myFileContentType;
    	}
    
    	public String getMyFileFileName() {
    		return myFileFileName;
    	}
    
    	public void setMyFileFileName(String myFileFileName) {
    		this.myFileFileName = myFileFileName;
    	}
    
    }

struts.xml

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE struts PUBLIC
    	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
    	"http://struts.apache.org/dtds/struts-2.3.dtd">
    
    <struts>
    	<package name="demo01" extends="struts-default" namespace="/">
    		<action name="upload" class="com.cf.upload.demo.UploadDemo">
    			<result name="success">/success.jsp</result>
    			<result name="input">/error.jsp</result>
    
    			<!-- 设置拦截器 -->
    			<interceptor-ref name="defaultStack">
    				<param name="fileUpload.maximumSize">2000000</param>
    				<param name="fileUpload.allowedExtensions">.jpg,.bmp,.png</param>
    			</interceptor-ref>
    		</action>
    	</package>
    </struts>

即可实现上传文件

结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190511231510276.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190511231526685.png)

上传非图片格式文件：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190511231554794.png)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019051123160884.png)

## 二、配置解释

**Action类中的三个固定参数：**

上传文件的三个参数是固定的，Struts2拦截器使这三个参数供上传使用，命名方式是固定的，命名规则如下

- [文件名参数] - 这是用户已上传的实际文件。在这个例子中它将是“myFile”，与index.jsp页面中的`<input type="file" name="myFile"> `name属性必须相同

- [文件名参数]ContentType - 这是上传的文件的内容类型。在这个例子中，它将是“myFileContentType”

- [文件名参数]FileName - 这是上传的文件的名称。在这个例子中，它将是“myFileFileName”

且需提供get和set方法

**拦截器**

使用defaultStrack拦截器，FileUpload拦截器是其一部分

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190511232232564.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
可以在源码中看到有上传文件大小及类型属性，上例中设置了图片类型，因此html文件上传失败。

在拦截器中设置内容

    <!-- 设置拦截器 -->
		<interceptor-ref name="defaultStack">
			<param name="fileUpload.maximumSize">2000000</param>
			<param name="fileUpload.allowedExtensions">.jpg,.bmp,.png</param>
		</interceptor-ref>






