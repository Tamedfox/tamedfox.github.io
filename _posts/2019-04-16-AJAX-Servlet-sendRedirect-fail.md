---
layout: post
title: "JQuery&Ajax后台Servlet跳转踩坑"
date: 2019-4-16
description: "AJAX,Servlet"
tag: 博客
--- 

## 一.局部刷新和页面刷新

做一个简单的登陆页面，jsp页面使用JQuery来进行提交登陆的用户名和密码。使用JQuery&Ajax的目的是进行局部刷新，因此会在确定登陆的button绑定JQuery&Ajax的方法来发送数据给后端。

如果使用的按钮type=submit，则点击时，submit会向后台发送一次数据请求，JQuery&Ajax也会发送一次。因此如果用局部刷新，使用JQuery&Ajax；实现页面刷新时，则使用submit

采用局部刷新，数据量较小，为异步请求，请求和相应的速度快，用户体验更好。

## 二.后台的请求转发和重定向失效
使用JQuery&Ajax发送给后台数据时，后台的Servelt收到数据后，判断后使用

`request.getRequestDispatcher("").forward();`

或者

    response.sendRedirect();
执行跳转时，跳转失败，并不会去跳转。JQuery&Ajax就是为了防止发送请求后刷新真个页面，所以此处跳转都不会生效。

如果需要跳转网页，在JQuery中使用以下语句跳转：

    window.location.href="跳转的页面";
