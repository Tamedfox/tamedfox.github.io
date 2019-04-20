---
layout: post
title: "JSP教程--（二）JSTL&EL"
date: 2019-4-6
description: "JSP,JSTL,EL"
tag: 博客
--- 

## 一、JSTL&EL

**JSTL**是JSP标准标签库（JSP Standard Tag Library），提供一组标准标签,可用于编写各种动态功能.JSTL通常会与EL表达式合作实现JSP页面的编码.

**EL表达式**是Expression Language（表达式语言）可以替代JSP页面中数据访问时的复杂编码可以自动转换类型，并且使JSP的开发变得更加简单。
使用EL表达式获取数据语法："${标识符}"


## 二、EL表达式
当JSP编译器在属性中见到"${}"格式后，它会产生代码来计算这个表达式，并且产生一个替代品来代替表达式的值。

获取user-agent和进行数值计算

getuseragent.jsp


    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    	<p>user-agent</p>
    	<p>${header["user-agent"] }</p>
    	<p>3+6= ${3+6 }</p>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190406105103608.png)


## 三、JSTL

标签
JSTL使用需要先引入standard.jar 和 jstl.jar两个jar包

**核心标签：**
引入语法如下：

    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:out>	用于在JSP中显示数据，就像<%= ... >

<c:set>	用于保存数据

<c:remove>	用于删除数据

<c:catch>	用来处理产生错误的异常状况，并且将错误信息储存起来

<c:if>	与我们在一般程序中用的if一样

<c:choose>	本身只当做<c:when>和<c:otherwise>的父标签

<c:when>	<c:choose>的子标签，用来判断条件是否成立

<c:otherwise>	<c:choose>的子标签，接在<c:when>标签后，当<c:when>标签判断为false时被执行

<c:import>	检索一个绝对或相对 URL，然后将其内容暴露给页面

<c:forEach>	基础迭代标签，接受多种集合类型

<c:forTokens>	根据指定的分隔符来分隔内容并迭代输出

<c:param>	用来给包含或重定向的页面传递参数

<c:redirect>	重定向至一个新的URL.

<c:url>	使用可选的查询参数来创造一个URL

outdemo.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
        <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    	<c:out value="这里的值会输出"></c:out>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190405143608992.png)
foreach.jsp

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
    	<c:forEach var="i" begin="1" end="10" step="2" >
    		<c:out value="${i }"></c:out>
    	</c:forEach>
    </body>
    </html>

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190405143937537.png)
**格式化标签:**
JSTL格式化标签用来格式化并输出文本、日期、时间、数字。引用格式化标签库的语法如下：

    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<fmt:formatNumber> : 使用指定的格式或精度格式化数字

<fmt:parseNumber> :	解析一个代表着数字，货币或百分比的字符串

<fmt:formatDate> :	使用指定的风格或模式格式化日期和时间

<fmt:parseDate>:	解析一个代表着日期或时间的字符串

<fmt:bundle>	:绑定资源

<fmt:setLocale>:	指定地区

<fmt:setBundle>:	绑定资源

<fmt:timeZone>	:指定时区

<fmt:setTimeZone>:	指定时区

<fmt:message>	:显示资源配置文件信息

<fmt:requestEncoding>:	设置request的字符编码

**SQL 标签:**
JSTL SQL标签库提供了与关系型数据库（Oracle，MySQL，SQL Server等等）进行交互的标签。引用SQL标签库的语法如下：

    <%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>

<sql:setDataSource>:指定数据源

<sql:query>	:运行SQL查询语句

<sql:update>	:运行SQL更新语句

<sql:param>	:将SQL语句中的参数设为指定值

<sql:dateParam>	:将SQL语句中的日期参数设为指定的java.util.Date 对象值

<sql:transaction>	:在共享数据库连接中提供嵌套的数据库行为元素，将所有语句以一个事务的形式来运行

**XML 标签:**
JSTL XML标签库提供了创建和操作XML文档的标签。引用XML标签库的语法如下：

    <%@ taglib prefix="x" uri="http://java.sun.com/jsp/jstl/xml" %>
<x:out>	与<%= ... >,类似，不过只用于XPath表达式

<x:parse>	解析 XML 数据

<x:set>	设置XPath表达式

<x:if>	判断XPath表达式，若为真，则执行本体中的内容，否则跳过本体

<x:forEach>	迭代XML文档中的节点

<x:choose>	<x:when>和<x:otherwise>的父标签

<x:when>	<x:choose>的子标签，用来进行条件判断

<x:otherwise>	<x:choose>的子标签，当<x:when>判断为false时被执行

<x:transform>	将XSL转换应用在XML文档中

<x:param>	与<x:transform>共同使用，用于设置XSL样式表

**JSTL 函数:**
JSTL包含一系列标准函数，大部分是通用的字符串处理函数。引用JSTL函数库的语法如下：

    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

fn:contains():测试输入的字符串是否包含指定的子串

fn:containsIgnoreCase():测试输入的字符串是否包含指定的子串，大小写不敏感

fn:endsWith():测试输入的字符串是否以指定的后缀结尾

fn:escapeXml()	:跳过可以作为XML标记的字符

fn:indexOf()	:返回指定字符串在输入字符串中出现的位置

fn:join():将数组中的元素合成一个字符串然后输出

fn:length():返回字符串长度

fn:replace():将输入字符串中指定的位置替换为指定的字符串然后返回

fn:split():将字符串用指定的分隔符分隔然后组成一个子字符串数组并返回

fn:startsWith():测试输入字符串是否以指定的前缀开始

fn:substring():返回字符串的子集

fn:substringAfter():返回字符串在指定子串之后的子集

fn:substringBefore():返回字符串在指定子串之前的子集

fn:toLowerCase():将字符串中的字符转为小写

fn:toUpperCase():将字符串中的字符转为大写

fn:trim():移除首位的空白符


