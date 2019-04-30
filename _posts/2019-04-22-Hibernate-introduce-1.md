---
layout: post
title: "Hibernate系列---(一)入门及映射文件配置"
date: 2019-4-22
description: "Hibernate,入门，映射文件配置"
tag: 博客
--- 

## 一、Hibernate
**Hibernate简介：**

Hibernate 是由 Gavin King 于 2001 年创建的开放源代码的对象关系框架。它强大且高效的构建具有关系对象持久性和查询服务的 Java 应用程序。

Hibernate 将 Java 类映射到数据库表中，从 Java 数据类型中映射到 SQL 数据类型中，并把开发人员从 95% 的公共数据持续性编程工作中解放出来。

Hibernate 是传统 Java 对象和数据库服务器之间的桥梁，用来处理基于 O/R 映射机制和模式的那些对象。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190421203244718.png)

**Hibernate 优势：**

Hibernate 使用 XML 文件来处理映射 Java 类别到数据库表格中，并且不用编写任何代码。

为在数据库中直接储存和检索 Java 对象提供简单的 APIs。

如果在数据库中或任何其它表格中出现变化，那么仅需要改变 XML 文件属性。

抽象不熟悉的 SQL 类型，并为我们提供工作中所熟悉的 Java 对象。

Hibernate 不需要应用程序服务器来操作。

操控你数据库中对象复杂的关联。

最小化与访问数据库的智能提取策略。

提供简单的数据询问。

## 二、ORM概览
**ORM :**
ORM--Object Relational Mapping，是一个方便在关系数据库和类似java面想对象的编程语言中转换数据的技术。

**相比JDBC的优点：**
 - 使用业务层代码访问对象而不是数据库中的表
 - 从面向对象逻辑中隐藏SQL查询的细节
 - 没有必要去处理数据库实现
 - 实体是基于业务的概念而不是数据库的概念
 - 事务管理和键的自动生成
 - 应用程序的快速开发

**ORM解决方案的实体组成：**
1.一个API在持久类的对象上实现基本的CRUD操作；
2.一个API或语言来制定引用类和属性的查询；
3.一个可配置的服务用来制定映射元数据；
4.一个技术和事务对象交互来执行 dirty checking, lazy association fetching 和其它优化的功能。

## 三、Hibernate配置
**hibernate中的文件介绍：**

documentation : hibernate先关的文档资源，如API，参考手册等；
lib ： 存放Hibernate框架的核心类库以及第三方类库。其中required子目录存放了hibernate项目所必需的的核心类库
project：hibernate中各个项目的源代码

使用前需要buildpath所有必须的jar包，lib下required中的所有jar包，以及连接MySQL的jar包

## 四、使用hibernate实现数据的增删改操作
**1.数据库准备：**

    CREATE TABLE user_hibernate (
    	id int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
    	name varchar(32) NOT NULL COMMENT '用户名',
    	password varchar(32) DEFAULT NULL COMMENT '用户密码',
    	email varchar(32) DEFAULT NULL COMMENT '邮箱',
    	telephone varchar(32) DEFAULT NULL COMMENT '电话',
    	PRIMARY KEY(id)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

在数据库中创建以上table

**2.实体类准备：**

User.java

    package com.hibernate.user.demo;
    
    public class User {
    	private int id;
    	private String name;
    	private String password;
    	private String email;
    	private String telephone;
    	public int getId() {
    		return id;
    	}
    	public void setId(int id) {
    		this.id = id;
    	}
    	public String getName() {
    		return name;
    	}
    	public void setName(String name) {
    		this.name = name;
    	}
    	public String getPassword() {
    		return password;
    	}
    	public void setPassword(String password) {
    		this.password = password;
    	}
    	public String getEmail() {
    		return email;
    	}
    	public void setEmail(String email) {
    		this.email = email;
    	}
    	public String getTelephone() {
    		return telephone;
    	}
    	public void setTelephone(String telephone) {
    		this.telephone = telephone;
    	}
    }
    
    创建实体类java代码

**3.创建映射：**
   
   通过XML的配置文件完成映射，建立在user包内

User.hbm.xml

<?xml version="1.0" encoding="UTF-8"?>

<!-- hibernate约束 -->
<!DOCTYPE hibernate-mapping PUBLIC 
    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
    "http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">
    
     <hibernate-mapping>
     	<!-- 建立类于表的映射 -->
     	<class name="com.hibernate.user.demo.User" table="user_hibernate">
     	<!-- id标签建立类中的属性与表中主键映射关系 -->
     		<id name="id" column="id">
     		<!-- 主键生成策略 -->
     			<generator class="native"></generator>
     		</id>
     		
     		<!-- 建立表中的普通属性和表的其他字段的映射关系 -->
     		<property name="name" column="name"></property>
     		<property name="password" column="password"></property>
     		<property name="email" column="email"></property>
     		<property name="telephone" column="telephone"></property>
     	</class>
     </hibernate-mapping>

**4.Hibernate核心配置文件：**

可在hibernate-release-5.0.7.Final\project\etc下hibernate.properties文件中找到相关数据库的配置信息

建立在src下

hibernate.cfg.xml

       <?xml version="1.0" encoding="UTF-8"?>
    <!-- 引入约束 -->
    <!DOCTYPE hibernate-configuration PUBLIC
    	"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
    	"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
    	
    <hibernate-configuration>
    	<session-factory>
    	<!-- 连接数据库的基本参数 -->
    		<property name="hibernate.connection.driver_class">com.mysql.jdbc.Driver</property>
    		<property name="hibernate.connection.url">jdbc:mysql://localhost:3305/hibernate_01</property>
    		<property name="hibernate.connection.username">root</property>
    		<property name="hibernate.connection.password">root</property>
    	
    	<!-- 配置hibernate方言 -->
    	<property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
    	
    	<!-- 以下为可选配置 -->
    	<!-- 打印Sql语句 -->
    	<property name="hibernate.show_sql">true</property>
    	<!-- 格式化sql语句 -->
    	<property name="hibernate.format_sql">true</property>
    	<!-- 以上为可选配置 -->
    	
    	<!-- 引入映射文件 -->
    	<mapping resource="com/hibernate/user/demo/User.hbm.xml"/>
    	</session-factory>
    </hibernate-configuration>

**5.测试文件：**

HibernateTestDemo01.java


    package com.hibernate.user.demo;
    
    import org.hibernate.Session;
    import org.hibernate.SessionFactory;
    import org.hibernate.Transaction;
    import org.hibernate.cfg.Configuration;
    import org.junit.Test;
    
    /**
     * hibernate测试案例
     * @author cf
     *
     */
    public class HibernateTestDemo01 {
    
    	@Test
    	//保存用户
    	public void demo01(){
    		//1.加载Hibernate核心配置文件
    		Configuration configuration = new Configuration().configure();
    		//2、创建SessionFactory对象:类似于JDBC连接池
    		SessionFactory sessionFactory = configuration.buildSessionFactory();
    		//3.通过SessionFactory获取到Session对象：类似于JDBC中的Connection
    		Session session = sessionFactory.openSession();
    		//4.手动开启事务
    		Transaction transaction = session.beginTransaction();
    		//5.执行代码
    		User user = new User();
    		user.setName("陈星星");
    		session.save(user);
    		//6.事务提交
    		transaction.commit();
    		//7.资源释放
    		session.close();
    	}
    }

执行完毕结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190421215616497.png)
**6.主要步骤：**

 1. 加载Hibernate核心配置文件 
 2. 创建SessionFactory对象
 3. 通过SessionFactory获取到Session对象
 4. 手动开启事务
 5. 执行代码
 6. 事务提交
 7. 资源释放

## 五.映射配置文件详解
***关于class标签配置：***

name属性:类的全名称

table 表的名称,可以省略，这时表的名称就与类名一致

catalog属性:数据库名称 可以省略.如果省略，参考核心配置文件中url路径中的库名称 

***关于id标签：***

首先它必须存在。<id>是用于建立类中的属性与表中的主键映射。

name 类中的属性名称 

column 表中的主键名称  column它也可以省略，这时列名就与类中属性名称一致

length 字段长度

type属性 指定类型 

<generator>它主要是描述主键生成策略.

***关于property标签：***

它是描述类中属性与表中非主键的映射关系

name 类中的属性名
column 表中的字段名
length 长度
type 类型
not-null 设置非空
unique 设置唯一

## 六.核心配置文件详解
**必须配置：**
驱动类

url路径

数据库用户名

数据库密码

数据库方案

**可选配置**

显示SQL语句 : hibernate.show_sql

格式化SQL语句 : hibernate.format_sql

自动建表 : hibernate.hbm2ddl.auto   
 - none: 不自动建表
 - create:如果数据库中已经有表，则删除后新建；如果没有则新建
 - create-drop:如果已经有表，则删除后新建，执行完操作后，删除此表；如果没有，则新建，执行完操作后删除
 - update:如果有表，则使用原表进行更新；如果没有则新建表
 - validate:不会创建表，只能使用已经存在的表

**映射文件映入**
引入映射文件

## 七、Hibernate常用API
**1.Configuration:**

用于加载hibernate配置

1.加载src下hibernate.cfg.xml文件

	Configuration configuration = new Configuration().configure();

2.加载src下hibernate.properties文件。但使用此文件无法在文件中引入map映射配置。需手动加载

    Configuration configuration =new Configuration();

手动加载映射

    configuration.addResource("/包的路径名/User.hbm.xml");

3.加载指定的名称的配置文件

    Configuration configuration =new Configuration().config(配置文件名称);

**2.SessionFactory:**
SessionFactory接口负责初始化Hibernate。它充当数据存储源的代理，并负责创建Session对象。这里用到了工厂模式。需要注意的是SessionFactory并不是轻量级的，因为一般情况下，一个项目通常只需要一个SessionFactory就够，当需要操作多个数据库时，可以为每个数据库指定一个SessionFactory。

SessionFactory不是轻量级，不要频繁的创建和关闭它。可以创建Uitls在一个项目中使用同一个SessionFactory

HibernateUtils .java

    package com.hibernate.utils;
    /**
     * Hibernate的工具类
     * @author cf
     *
     */
    
    import org.hibernate.Session;
    import org.hibernate.SessionFactory;
    import org.hibernate.cfg.Configuration;
    
    public class HibernateUtils {
    	public static final Configuration cfg;
    	public static final SessionFactory sf;
    	
    	static {
    		cfg = new Configuration().configure();
    		sf = cfg.buildSessionFactory();
    	}
    	
    	public static Session openSession() {
    		return sf.openSession();
    	}
    }

SessionFactory内部还维护了一个连接池，如果使用C3P0连接池，步骤如下：
1.导入C3P0相关jar包；
2.在hibernate.cfg.xml中配置c3p0：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190421232842232.png)
**3.Session:**
Session接口负责执行被持久化对象的CRUD操作(CRUD的任务是完成与数据库的交流，包含了很多常见的SQL语句)。但是Session对象是非线程安全的,所以使用session时注意此对象的作用域。

*常用方法：*

*3.1 保存方法：*

       Serializable	save(Object object);
       //Persist the given transient instance, first assigning a generated identifier.

查询方法：

    <T> T	get(Class<T> entityType, Serializable id);
    //Return the persistent instance of the given entity class with the given identifier, or null if there is no such persistent instance.

    <T> T	load(Class<T> theClass, Serializable id);
    //Return the persistent instance of the given entity class with the given identifier, assuming that the instance exists.

*get和load方法区别：*  

区别需要使用断点查看出区别

- get方法
1.因为get方法，知道至查询时，立即发送sql语句查询
2.查询后返回的是真实对象
3.查询一个找不到的对象时，返回null

- load方法
1.load方法，延时加载，执行至查询时，不发送哦sql语句查询，使用对象时才会发送
2.查询后返回的是代理对象
3.查询找不到的对象时，报错，可从API的描述中看出

断点过程不做纪录了，所用代码如下：

 - get方法查询：

    	//get方法查询
    	@Test
    	public void demo02() {
    		Session session = HibernateUtils.openSession();
    		Transaction tx = session.beginTransaction();
    		
    		//使用get方法查询
    		User user = session.get(User.class, 1);
    		System.out.println(user);
    		
    		tx.commit();
    		session.close();
    	} 

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190421235756539.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)

- load方法查询:
	

//load方法查询
		@Test
		public void demo03() {
			Session session = HibernateUtils.openSession();
			Transaction tx = session.beginTransaction();
			
			//使用load方法查询
			User user = session.load(User.class, 1);
			System.out.println(user);
			
			tx.commit();
			session.close();
		}

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190422000151156.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)

*3.2 修改方法*

    //修改方法
    		@Test
    		public void demo04() {
    			Session session = HibernateUtils.openSession();
    			Transaction tx = session.beginTransaction();
    			
    			//先查询再修改
    			User user = session.get(User.class, 1);
    			user.setPassword("aaaa");
    			session.update(user);
    			
    			tx.commit();
    			session.close();
    		}

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190422001851259.png)

*3.3 删除操作*

    //删除方法
    		@Test
    		public void demo05() {
    			Session session = HibernateUtils.openSession();
    			Transaction tx = session.beginTransaction();
    			
    			//先查询再删除
    			User user = session.get(User.class, 1);
    			session.delete(user);
    			
    			tx.commit();
    			session.close();
    		}

*3.4 查询所有*

Query查询：
	

    // 查询所有
    	@Test
    	public void demo07() {
    		Session session = HibernateUtils.openSession();
    		Transaction tx = session.beginTransaction();
    
    		//接受HQL：Hibernate Query Language 面向对象的查询语言
    		Query query = session.createQuery("from User");
    		List<User> list = query.list();
    		for (User user : list) {
    			System.out.println(user);
    		}
    
    		tx.commit();
    		session.close();
    	}

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019042200334911.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
Criteria查询：

@Test
// Criteria查询
public void demo07() {
	Session session = HibernateUtils.openSession();
	Transaction transaction = session.beginTransaction();
	
	//通过session获取Criteria对象
	Criteria criteria = session.createCriteria(User.class);
	List<User> list = criteria.list();
	// 遍历
	for (User user : list) {
		System.out.println(user);
	}
	
	transaction.commit();
	session.close();
}
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190422223906628.png)

