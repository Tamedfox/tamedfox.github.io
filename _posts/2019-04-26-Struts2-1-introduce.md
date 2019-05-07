---
layout: post
title: "Struts2（一）--入门及配置详情"
date: 2019-4-26
description: "Struts2,入门，配置"
tag: 博客
--- 

## 一、Struts2简介

Struts2 是目前较为普及和成熟的基于MVC设计模式的web应用程序框架，它不仅仅是Struts1 的升级版本，更是一个全新的Struts架构。

**Struts2文件夹内容：**

apps : Struts2提供的应用
docs : Struts2开发文档和API
lib     : Struts2框架开发的jar包
src    : Struts2的源码

## 二、入门案例：
创建动态web项目,导入struts所需的jar包

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425200617115.png)
**创建index.jsp页面**

默认扩展名 .action

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    	<h1>Struts2入门</h1>
    
    	<h3><a href="${ pageContext.request.contextPath}/hello.action"> Struts2入门</a></h3>
    </body>
    </html>

**Action的类**

    package com.struts.demo01;
    
    /**
     * struts2入门的action类
     * @author cf
     *
     */
    public class HelloAction {
    	
    	/**
    	 * 提供一个方法
    	 * 固定格式
    	 */
    	public String execute() {
    		System.out.println("HelloAction执行了。。。。");
    		return "success";
    	}
    }

**对Action进行配置**

在src下创建struts.xml的配置文件

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE struts PUBLIC
    	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
    	"http://struts.apache.org/dtds/struts-2.3.dtd">
    
    <struts>
    	<!-- 通过包进行管理Action的配置 -->
    	<!-- 配置struts2的包 -->
    	<package name="demo01" extends="struts-default" namespace="/">
       		<!-- 在包里配置Action -->
    		<action name="hello" class="com.struts.demo01.HelloAction">
    		<!-- 配置页面跳转 -->
    		<result name="success">/demo01/success.jsp</result>
    		</action>
    	
    	</package>
    </struts>

**配置前端控制器(核心过滤器)**

在web.xml中配置

    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
      <display-name>Struts2Demo_01</display-name>
      <welcome-file-list>
        <welcome-file>index.html</welcome-file>
        <welcome-file>index.htm</welcome-file>
        <welcome-file>index.jsp</welcome-file>
        <welcome-file>default.html</welcome-file>
        <welcome-file>default.htm</welcome-file>
        <welcome-file>default.jsp</welcome-file>
      </welcome-file-list>
      <!-- 配置struts2的核心过滤器 -->
      <filter>
      	<filter-name>struts2</filter-name>
      	<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
      </filter>
      
      <filter-mapping>
      	<filter-name>struts2</filter-name>
      	<url-pattern>/*</url-pattern>
      </filter-mapping>
    </web-app>

**Action的返回页面**

 在WebContent下新建demo01，在demo01中新建success.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    <h1>成功跳转页面</h1>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425201600493.png)
点击后

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425201619617.png)

## 三、配置详情

**3.1 struts.xml**

**package标签**

为更好的管理action的配置，采用package的说法

属性：
- name : 包的名称，不与其他包名重复就可以，为更好的管理action而是用
- extend ： 一般为struts-default，代表继承默认的struts-default，使用默认的方法。
- namespace ： 与`<action> `标签中的name属性一起决定了访问路径
- abstract ：允许别的package被继承

**action标签**

属性：

- name：与namespace共同决定访问路径
- class：Action类的全路径
- method：执行Action中的方法名，默认值 execute
- converter：设置类型转换器

**3.2 常量的配置**

在以下路径的default.properties文件中进行常量的配置

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019042521252773.png)
**部分配置选项：**

*Struts2中post请求编码UTF-8*

    struts.i18n.encoding=UTF-8

 *Struts2请求默认的扩展名*

    struts.action.extension=action,,

**修改常量：**

- struts.xml中进行修改

使用一下语句配置常量,一般在此文件中修改

    <!-- 配置常量 -->
	<constant name="struts.action.extension" value="action"></constant>


- struts.properties中进行修改

以下代码修改

    struts.action.extension=action

- web.xml中进行修改

添加一下代码修改

      <!-- 配置struts2的核心过滤器 -->
      <filter>
      	<filter-name>struts2</filter-name>
      	<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
      	<!-- 修改常量 -->
      	<init-param>
      		<param-name>struts.action.extension</param-name>
      		<param-value>action</param-value>
      	</init-param>
      </filter>

 **3.3 分模块开发的配置**

**include配置**

引入其他包的struts配置文件

文件路径如下图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425214721582.png)
struts.xml

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE struts PUBLIC
    	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
    	"http://struts.apache.org/dtds/struts-2.3.dtd">
    
    <struts>
    
    	<include file="/com/struts/demo01/struts_demo01.xml"></include>
    </struts>

## 四、Action详解
**4.1 Action类的创建规则**

- Action类为POJO的类

入门实例就为POJO的Action类

- Action类实现一个Action接口

实例如下：

    package com.struts.demo02;
    
    import com.opensymphony.xwork2.Action;
    
    /**
     * Action的编写方式二：实现一个action的接口
     * @author cf
     *
     */
    public class ActionDemo03 implements Action{
    
    	@Override
    	public String execute() throws Exception {
    		System.out.println("Action的编写方式：实现一个action的接口");
    		return null;
    	}
    }

- 继承ActionSupport

实例如下：

    package com.struts.demo02;
    
    import com.opensymphony.xwork2.ActionSupport;
    
    /**
     * Action编写方式三：继承ActionSupport类
     * 功能较多，ActionSupport中提供了很多操作方法
     * @author cf
     *
     */
    public class ActionDemo04 extends ActionSupport{
    	@Override
    	public String execute() throws Exception {
    		System.out.println("Action编写方式三：继承ActionSupport类");
    		return null;
    	}
    }

**4.2 Action的访问**

- 通过method设置

package内的struts_demo03.xml中的method属性配置如下：

    <?xml version="1.0" encoding="UTF-8" ?>
    <!DOCTYPE struts PUBLIC
    	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
    	"http://struts.apache.org/dtds/struts-2.3.dtd">
    
    <struts>
    	<!-- 通过包进行管理Action的配置 -->
    	<!-- 配置struts2的包 -->
    	<package name="demo03" extends="struts-default" namespace="/">
    		<action name="userFind" class="com.struts.demo03.UserAction" method="find"></action>	
    		<action name="userUpdate" class="com.struts.demo03.UserAction" method="update"></action>	
    		<action name="userDelete" class="com.struts.demo03.UserAction" method="delete"></action>	
    		<action name="userSave" class="com.struts.demo03.UserAction" method="save"></action>	
    	</package>
    		
    </struts>

Action类UserAction.java实例如下：

    package com.struts.demo03;
    
    import com.opensymphony.xwork2.ActionSupport;
    
    public class UserAction extends ActionSupport {
    
    	public String find() {
    		System.out.println("查询用户!!!");
    		return null;
    	}
    
    	public String update() {
    		System.out.println("修改用户!!!");
    		return null;
    	}
    
    	public String delete() {
    		System.out.println("删除用户!!!");
    		return null;
    	}
    
    	public String save() {
    		System.out.println("保存用户!!!");
    		return null;
    	}
    }

jsp页面demo01,jsp如下：

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    
    <h1>Action的访问</h1>
    <h3>通过method方式</h3>
    <a href=" ${pageContext.request.contextPath }/userFind.action">查询用户</a><br>
    <a href=" ${pageContext.request.contextPath }/userUpdate.action">修改用户</a><br>
    <a href=" ${pageContext.request.contextPath }/userDelete.action">删除用户</a><br>
    <a href=" ${pageContext.request.contextPath }/userSave.action">保存用户</a><br>
    
    </body>
    </html>


访问页面结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425233256580.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425233312840.png)
- 通过通配符的方式进行配置

package内的struts_demo03.xml增加通配符方式的action配置

<!-- 通配符的方式 -->
		<!-- method取值为name的第一个*位置数据 -->
		<action name="product_*" class="com.struts.demo03.ProductAction" method="{1}"></action>

新增Action类ProductActon.java

    package com.struts.demo03;
    
    import com.opensymphony.xwork2.ActionSupport;
    
    public class ProductAction extends ActionSupport{
    	
    	public String find() {
    		System.out.println("查找商品");
    		return null;
    	}
    	
    	public String update() {
    		System.out.println("修改商品");
    		return null;
    	}
    	
    	public String delete() {
    		System.out.println("删除商品");
    		return null;
    	}
    	
    	public String save() {
    		System.out.println("保存商品");
    		return null;
    	}
    }

jsp页面增加通配符控制语句

    <h3>通过通配符方式</h3>
    <a href=" ${pageContext.request.contextPath }/product_find.action">查询商品</a><br>
    <a href=" ${pageContext.request.contextPath }/product_update.action">修改商品</a><br>
    <a href=" ${pageContext.request.contextPath }/product_delete.action">删除商品</a><br>
    <a href=" ${pageContext.request.contextPath }/product_save.action">保存商品</a><br>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425234640575.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190425234650484.png)
相对来说，通配符方式访问更方便。

- 动态方法访问

package内的struts_demo03.xml增加动态方法访问的action配置

    <!-- 动态方法访问,默认关闭 -->
    		<action name="category" class="com.struts.demo03.CategoryAction"></action>

默认关闭，修改常量属性开启

    <constant name="struts.enable.DynamicMethodInvocation" value="true"></constant>

Action类的建立

    package com.struts.demo03;
    
    import com.opensymphony.xwork2.ActionSupport;
    
    public class CategoryAction extends ActionSupport{
    	
    	public String find() {
    		System.out.println("查找分类");
    		return null;
    	}
    	
    	public String update() {
    		System.out.println("修改分类");
    		return null;
    	}
    	
    	public String delete() {
    		System.out.println("删除分类");
    		return null;
    	}
    	
    	public String save() {
    		System.out.println("保存分类");
    		return null;
    	}
    }

JSP页面路径的设置：其中category为action配置的的name属性

    <h3>通过动态方法访问的方式</h3>
    <a href=" ${pageContext.request.contextPath }/category!find.action">查询分类</a><br>
    <a href=" ${pageContext.request.contextPath }/category!update.action">修改分类</a><br>
    <a href=" ${pageContext.request.contextPath }/category!delete.action">删除分类</a><br>
    <a href=" ${pageContext.request.contextPath }/category!save.action">保存分类</a><br>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190426000220781.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190426000234215.png)