---
layout: post
title: "MySQL数据库基本操作 "
date: 2019-3-21
description: "MySQL,数据库"
tag: 博客
---   



## **1.MySQL数据类型：**
****数字类型**：

 - 整型：tinyint、smallint、mediumint、int、bigint	
 - 浮点型：float、double、real、decimal

**日期和时间：**
	date				日期 '2008-12-2'
	time				时间 '12:25:36'
	datetime		日期时间 '2008-12-2 22:06:44'
	timestamp	自动存储记录修改时间
	
**字符串类型：****
char、varchar、tinytext、text、mediumtext、longtext
char长度固定，如char(10)，若存入长度不够已空格填满
varchar长度可变，如char(10)，若存入长度不够则自动修改长度

**数据类型属性：**
MySQL关键字	含义
NULL	数据列可包含NULL值
NOT NULL	数据列不允许包含NULL值
DEFAULT	默认值
PRIMARY KEY	主键
AUTO_INCREMENT	自动递增，适用于整数类型
UNSIGNED	无符号
CHARACTER SET name	指定一个字符集

## 2.登录SQL数据库
mysql -u用户名 -p密码

    mysql -uroot -proot

![登录命令](https://img-blog.csdnimg.cn/20190307102311926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)

## 3.查询数据库

    show databases;

![show databases;](https://img-blog.csdnimg.cn/20190307104932977.png)

//尾部需加  ；  分号结尾
否则出现以下界面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307105114228.png)
使用exit; 退出 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307105135709.png)

## 4.创建数据库

    create database sample_01 character set gbk;
创建一个名为sample_01的数据库，使用 character set gbk将数据库字符编码设置为gbk，方便显示中文

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307121553717.png)
查询数据库，显示已创建sample_01
![在这里插入图片描述](https://img-blog.csdnimg.cn/201903071216127.png)

## 5.选择数据库

    use sample_01
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307121824595.png)

## 6.创建数据库表

    create table sutdents(
    sid int primary key auto_increment,
    name char(10),
    sex char(4),
    age tinyint
    );

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307122153591.png)
sid(student id) : 
int:指明类型
primary key:表明此列为主键，且值唯一
auto_increment:整数列中，自增长

    show tables;
  
  显示sample_01下的数据库表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307122450666.png)
students打错了没留意到，修改表名

    ALTER TABLE sutdents RENAME TO students

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307123052234.png)

## 7.向数据库表中插入数据

    insert into students values(null, "小胖", "男", 25);

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307134312396.png)
若产生以下错误，需要在修改MySQL的my.ini配置文件
因为MySQL设置的字符集与创建的数据库字符集冲突，修改为相同即可。
在MySQL目录下找到找到my.ini，打开后修改

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307134352869.png)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307134834101.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)

## 8. 插入多条数据

    insert into students 
    (name, sex, age)
    values
    ("王大胖", "男", 35),
    ("王小胖", "男", 30),
    ("周晓明", "男", 22),
    ("刘霆锋", "男", 26),
    ("胡润", "男", 24),
    ("何丹", "男", 27),
    ("胡霞", "女", 22);

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019030713560831.png)

## 9.查询表中数据
表中内容全部查询

    select * from students
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307135654109.png)
按特定条件查询：
	select 列名称 from 表名称 where 条件;

    select * from students where sid = 2;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307144931275.png)
选择列查询：

    select name from students;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307145037204.png)
选择范围条件查询：

    select * from students where age > 26 and age <35;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307145449701.png)
文字条件查询：

    select * from students where name like "%小%";

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307145838484.png)

## 10.修改表中数据
   update 表名称 set 列名称=新值 where 更新条件;

    update students set name="苗条",sex = "女", age = 18 where sid = 1;

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307150604941.png)
修改后查询结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307150738409.png)

## 11.删除表中数据
 delete from 表名称 where 删除条件;

    delete from students where name = "周晓明";

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307152305289.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)

## 12.表元素的修改
列名及类型的修改：
alter table 表名 change 列名称 列新名称 新数据类型;

    alter table students change sex gender char(6);
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307153548605.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
添加列：
alter table 表名 add 列名 列数据类型 after 插入位置;

    alter table students add tel varchar(20) after age;
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307155718144.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
删除列：
alter table 表名 drop 列名称;

    alter table students drop tel;
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307160708840.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
重命名表：
 alter table 表名 rename 新表名;

     alter table students rename employee;
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307160822188.png)
删除整张表：
drop table 表名;

    drop table employee;
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019030716091056.png)
删除数据库：
drop database 数据库名;

    drop database sample_01;
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190307161005530.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
Continue...