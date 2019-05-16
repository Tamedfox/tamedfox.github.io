---
layout: post
title: "Spring教程（一）--入门&基本配置"
date: 2019-4-29
description: "Spring,入门,基本配置"
tag: 博客
--- 

## 一、Spring简介
**1.1 Spring概述**

> Spring 是最受欢迎的企业级 Java 应用程序开发框架，数以百万的来自世界各地的开发人员使用 Spring
> 框架来创建性能好、易于测试、可重用的代码。
> 
> Spring 框架是一个开源的 Java 平台，它最初是由 Rod Johnson 编写的，并且于 2003 年 6 月首次在 Apache
> 2.0 许可下发布。
> 
> Spring 是轻量级的框架，其基础版本只有 2 MB 左右的大小。
> 
> Spring 框架的核心特性是可以用于开发任何 Java 应用程序，但是在 Java EE 平台上构建 web 应用程序是需要扩展的。
> Spring 框架的目标是使 J2EE 开发变得更容易使用，通过启用基于 POJO 编程模型来促进良好的编程实践。

**1.2 IOC介绍：**

（Inversion of Control）控制反转，将对象的创建全反转给Spring

**1.3 Spring解压包介绍**

- docs:Spring开发规范和API
- libs:Spring开发jar和源码
- scheme:Spring配置文件的约束

## 二、Spring入门案列
Spring体系：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428173802847.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0RvdWJsZV9fX19D,size_16,color_FFFFFF,t_70)
 需引入的jar包：

其中日志纪录需下载Spring依赖包导入
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428174907770.png)
UserDao.java

    package com.spring4.demo01;
    
    /**
     * 用户管理业务层的接口
     * @author cf
     *
     */
    public interface UserDao {
    	public void save();
    }

UserDaoImpl.java

    package com.spring4.demo01;
    
    /**
     * 用户管理业务层的实现类
     * @author cf
     *
     */
    public class UserDaoImpl implements UserDao {
    
    	@Override
    	public void save() {
    		System.out.println("UserDao执行了保存...");
    	}
    
    }

测试类SpringDemo01.java

    package com.spring4.demo01;
    
    import org.junit.Test;
    import org.springframework.context.ApplicationContext;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    
    public class SpringDemo01 {
    
    	@Test
    	/**
    	 * 传统方式调用
    	 */
    	public void testDemo01() {
    		UserDao userDao = new UserDaoImpl();
    		userDao.save();
    	}
    	
    	@Test
    	/**
    	 * Spring方式的调用
    	 */
    	public void testDemo02() {
    		//创建Spring的工厂
    		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    		UserDao userDao = (UserDao) applicationContext.getBean("userDao");
    		userDao.save();
    		
    	}
    }

src下创建配置文件applicationContext.xml

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    	<!-- Spring的入门的配置 -->
    	<bean id="userDao" class="com.spring4.demo01.UserDaoImpl"></bean>
    </beans>

可以看出，使用spring的IoC模式可以更好的实现程序解耦合，其底层是利用工厂模式+反射+配置文件实现的

## 三、DI（依赖注入）
**DI：**

依赖注入。控制反转（IoC）是一个通用的概念，它可以用许多不同的方式去表达，依赖注入仅仅是控制反转的一个具体的例子。

> 当编写一个复杂的 Java 应用程序时，应用程序类应该尽可能的独立于其他的 Java
> 类来增加这些类可重用可能性，当进行单元测试时，可以使它们独立于其他类进行测试。依赖注入（或者有时被称为配线）有助于将这些类粘合在一起，并且在同一时间让它们保持独立。
> 
> 到底什么是依赖注入？让我们将这两个词分开来看一看。这里将依赖关系部分转化为两个类之间的关联。例如，类 A 依赖于类 B。现在，让我们看一看第二部分，注入。所有这一切都意味着类 B 将通过 IoC 被注入到类 A 中。
> 
> 依赖注入可以以向构造函数传递参数的方式发生，或者通过使用 setter 方法 post-construction。

**实例如下：**
UserDaoImpl.java类增加属性值及set方法

    package com.spring4.demo01;
    
    /**
     * 用户管理业务层的实现类
     * @author cf
     *
     */
    public class UserDaoImpl implements UserDao {
    	private String name;
    	
    	public void setName(String name) {
    		this.name = name;
    	}
    
    	@Override
    	public void save() {
    		System.out.println("UserDaoImpl执行了保存..." + name);
    	}
    }

applicationContext.xml增加name属性的设置

    <!-- Spring的入门的配置 -->
    <bean id="userDao" class="com.spring4.demo01.UserDaoImpl">
    	<property name="name" value="陈星星"></property>
    </bean>

再次执行testDemo02, 结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428201133896.png)
IOC是将类交给Spring管理创建，DI是Spring在管理类的时候将类的属性注入进来。

## 四、Spring的工厂类

**4.1 BeanFactory**

- 较早版本的工厂类

- 调用getBean的时候，才会生成类的实例


**4.2 ApplicationContext**

- 较新的版本

- ApplicationContext继承了BeanFactory，所以会有更多的方法

- 加载配置文件时，就会将Spring管理的类都实例化

**两个实现类：**

ClassPathApplicationContext : 加载类路径下的配置文件
FileSystemXmlApplicationContext : 加载文件系统下的配置文件

## 五、Spring的详细配置
**5.1 Bean标签的配置**

- id属性：唯一约束，不能出现特殊字符

- name属性：不是唯一约束，但是一般不重复，可以出现个数字符

-class ：类实例的全路径 

**5.2 Bean生命周期的配置**

- init-method：Bean被初始化的时候执行的方法

- destory-method：Bean被销毁的时候执行的方法(Bean是单列创建，工厂关闭)

**5.3 Bean的作用范围的配置**

- scope：Bean的作用范围
  singleton:默认选项，Spring采用单例模式创建对象
  prototype:多例模式。
  reqeust:Spring创建类后，将类存入request的范围中，应用在web项目中
  session:同request，放入session范围中
  globalsession:在porlet环境下(子网站)使用，如果无此环境，则相当于session，应用在web项目 

## 六、Spring的Bean管理

**6.1 Bean的实例化方式**

- 无参构造

 即入门案例的构造方式，Bean类中需提供无参构造

    <bean id="userDao" class="com.spring4.demo01.UserDaoImpl">

- 静态工厂方法

创建一个工厂类，在工厂类中提供一个static方法返回UserDaoImpl对象

    package com.spring4.demo01;
    
    public class UserFactory {
    	public static UserDao creatUser() {
    		return new UserDaoImpl();
    	}
    }

修改配置文件

    <!-- 静态工厂方法 -->
    <bean id="userDao" class="com.spring4.demo01.UserFactory" factory-method="creatUser"></bean>

- 实例工厂方法

创建工厂类，提供非static方法返回UserDaoImpl对象

    package com.spring4.demo01;
    
    public class UserFactory02 {
    	public UserDao createUser() {
    		return new UserDaoImpl();
    	}
    }

配置文件修改，需配置工厂，还需配置创建方法

<!-- 实例工厂方法 -->
<bean id="userFactory02" class="com.spring4.demo01.UserFactory02"></bean>
<bean id="userDao" factory-bean="userFactory02" factory-method="createUser"></bean>

**6.2 Spring的属性注入**

-  **构造方法**

实体类product.java

    package com.spring4.demo02;
    
    public class Product {
    	private String name;
    	private double price;
    	
    	public Product() {
    		super();
    	}
    
    	public Product(String name, double price) {
    		super();
    		this.name = name;
    		this.price = price;
    	}
    
    	@Override
    	public String toString() {
    		return "Product [name=" + name + ", price=" + price + "]";
    	}	
    }

 
 配置文件：

    <!-- Spring属性注入的方式 -->
    <!-- 构造方法的方式 -->
    <bean id="product" class="com.spring4.demo02.Product">
    	<constructor-arg name="name" value="Tesla Model S"></constructor-arg>
    	<constructor-arg name="price" value="450000"></constructor-arg>
    </bean>

TestDemo02.java

    package com.spring4.demo02;
    
    import org.junit.Test;
    import org.springframework.context.ApplicationContext;
    import org.springframework.context.support.ClassPathXmlApplicationContext;
    
    /*
     * 属性注入方式
     */
    public class TestDemo02 {
    	
    	@Test
    	//构造方法属性注入
    	public void testDemo01() {
    		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    		Product product = (Product) applicationContext.getBean("product");
    		System.out.println(product);
    	}
    }

结果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428220801692.png)
- **set方法**

**（1）注入普通类型**

实体类Phone.java

    package com.spring4.demo02;
    
    /**
     * set方法属性注入
     * 
     * @author cf
     *
     */
    public class Phone {
    	private String name;
    	private Double price;
    
    	public void setName(String name) {
    		this.name = name;
    	}
    
    	public void setPrice(Double price) {
    		this.price = price;
    	}
    
    	@Override
    	public String toString() {
    		return "Phone [name=" + name + ", price=" + price + "]";
    	}
    }

配置文件applicationContext.xml

    <!-- set方法的方式 -->
    <bean id="phone" class="com.spring4.demo02.Phone">
    	<property name="name" value="iphone XR"></property>
    	<property name="price" value="4999"></property>
    </bean>

TestDemo02.java

	@Test
	//set方法属性注入
	public void testDemo02() {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
		Phone phone = (Phone) applicationContext.getBean("phone");
		System.out.println(phone);
	}

结果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428221448393.png)
**（2）注入对象类型**

实体类Category.java

    package com.spring4.demo02;
    
    public class Category {
    	private String name;
    	private Phone phone;
    	public void setName(String name) {
    		this.name = name;
    	}
    	public void setPhone(Phone phone) {
    		this.phone = phone;
    	}
    	@Override
    	public String toString() {
    		return "Category [name=" + name + ", phone=" + phone + "]";
    	}
    }

配置文件内容，设置其他类需使用ref属性

    <!-- set方法注入对象类型的属性 -->
    <bean id="category" class="com.spring4.demo02.Category">
    	<property name="name" value="手机数码"></property>
    	<!-- 使用ref设置其他类的id或name，value只能设置普通类型属性 -->
    	<property name="phone" ref="phone"></property>
    </bean>

TestDemo02.java

    @Test
    //set方法属性注入对象
    public void testDemo03() {
    	ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    	Category category = (Category) applicationContext.getBean("category");
    	System.out.println(category);
    }

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428222258969.png)
- **p名称空间**

需在Spring 2.5版本以后使用此方法

配置文件修改，需先引入p名称空间引用

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
    	xmlns:p="http://www.springframework.org/schema/p"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!-- P名称空间引入  xmlns:p="http://www.springframework.org/schema/p"-->

引入后再修改配置

	<!-- P名称空间注入属性的方式 -->
	<!-- 注入普通属性 -->
	<bean id="phone" class="com.spring4.demo02.Phone" p:name="iphone XS" p:price="6999"></bean>
	
	<!-- 注入对象类型的属性 -->
	<bean id="category" class="com.spring4.demo02.Category" p:name="手机数码" p:phone-ref="phone"></bean>

TestDemo02.java

    @Test
    //p名称空间注入
    public void testDemo04() {
    	ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    	Phone phone = (Phone) applicationContext.getBean("phone");
    	System.out.println(phone);
    	
    	Category category = (Category) applicationContext.getBean("category");
    	System.out.println(category);
    }

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428224002476.png)
- **SpEL的属性注入**

需在Spring 3.0版本后使用此方法

SpEL： Spring Expression Language，即Spring的表达式

语法： #{SpEL}

 **普通属性和对象类型的属性注入**

修改配置文件内容，SpEL可以进行计算

 	<!-- SpEL的属性注入 -->
 	<bean id="phone" class="com.spring4.demo02.Phone">
 		<property name="name" value="#{'华为P30'}"></property>
 		<property name="price" value="#{5000-1001}"></property>
 	</bean>
 	
 	<!-- 注入对象类型属性 -->
 	<bean id="category" class="com.spring4.demo02.Category">
 		<property name="name" value="#{'手机数码'}"></property>
 		<property name="phone" value="#{phone}"></property>
 	</bean>

结果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190428225224755.png)
- **集合属性的注入**

实体类:

    package com.spring4.demo03;
    
    import java.util.Arrays;
    
    public class CollectionBean {
    	private String[] arrs;
    
    	public void setArrs(String[] arrs) {
    		this.arrs = arrs;
    	}
    
    	@Override
    	public String toString() {
    		return "CollectionBean [arrs=" + Arrays.toString(arrs) + "]";
    	}	
    }

配置文件：

    <!-- Spring集合属性的注入 -->
    <!-- 数组类型 -->
    <bean id="collectionBean" class="com.spring4.demo03.CollectionBean">
    	<!-- 使用property的子标签list -->
    	<property name="arrs" >
    		<list>
    			<value>Tesla Model 3</value>
    			<value>iphone XR MAX</value>
    			<value>华为P30</value>
    		</list>
    	</property>
    </bean>

TestDemo03.java

    @Test
    public void testDemo01() {
    	ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml");
    	CollectionBean bean = (CollectionBean) applicationContext.getBean("collectionBean");
    	
    	System.out.println(bean);
    }

结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019042823133762.png)

## 七、Spring的分模块开发配置

**7.1 同时加载多个配置文件**

使用可变参数，读取多个配置文件

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("applicationContext.xml","applicationContext02.xml");

**7.2 在一个配置文件中引入其他配置文件**

    <import resource="applicationContext02.java"/>



