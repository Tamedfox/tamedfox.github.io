---
layout: post
title: "数据库连接池(自定义、JDBC、C3P0&DBUtils)"
date: 2019-4-13
description: "JDBC,C3P0,DBUtils,Connection Pool"
tag: 博客
--- 

## 一、数据库连接池：
对于一个简单的数据库应用，由于对于数据库的访问不是很频繁。这时可以简单地在需要访问数据库时，就新创建一个连接，用完后就关闭它，这样做也不会带来什么明显的性能上的开销。但是对于一个复杂的数据库应用，情况就完全不同了。频繁的建立、关闭连接，会极大的减低系统的性能，因为对于连接的使用成了系统性能的瓶颈。

数据库连接是一种关键的有限的昂贵的资源,这一点在多用户的网页应用程序中体现的尤为突出.对数据库连接的管理能显著影响到整个应用程序的伸缩性和健壮性,影响到程序的性能指标.数据库连接池正式针对这个问题提出来的.数据库连接池负责分配,管理和释放数据库连接,它允许应用程序重复使用一个现有的数据库连接,而不是重新建立一个。

外部使用者可通过方法获取连接，使用完毕后再通过方法将连接返回，注意此时连接并没有关闭，而是由连接池管理器回收，并为下一次使用做好准备。

# 二、 自定义数据库连接池：

jdbc针对数据库连接池定义了接口java.sql.DataSource，所有的数据库连接池实现都要实现该接口，该接口中定义了重载的方法。

**步骤：**
1. 定义一个类实现java.sql.DataSource接口；
2. 定义一个集合用于保存Connection对象；
3. 实现getConnection方法，在方法中取出List集合中的一个连接对象返回；
4. 用户用完Connection，会调用close方法释放资源，此时要保证连接换回连接池，而不是关闭连接，因而需要对其close方法进行增强，采用装饰者模式

**代码示例如下：**

**JDBCUtil.class** 

    import java.io.IOException;
    import java.io.InputStream;
    import java.sql.Connection;
    import java.sql.DriverManager;
    import java.sql.PreparedStatement;
    import java.sql.ResultSet;
    import java.sql.SQLException;
    import java.util.Properties;
    
    
    public class JDBCUtil {
    	static String driverClass = null;
    	static String url = null;
    	static String name = null;
    	static String password = null;
    
    	static {
    		try {
    			// 创建配置对象
    			Properties properties = new Properties();
    			InputStream is = JDBCUtil.class.getClassLoader().getResourceAsStream("jdbc.properties");
    			// 导入输入流
    			properties.load(is);
    
    			// 读取配置文件
    			driverClass = properties.getProperty("driverClass");
    			url = properties.getProperty("url");
    			name = properties.getProperty("name");
    			password = properties.getProperty("password");
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    	}
    
    	public static Connection getConn() {
    		Connection conn = null;
    		try {
    			Class.forName(driverClass);
    			conn = DriverManager.getConnection(url, name, password);
    		} catch (Exception e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    		return conn;
    	}
    
    	public static void closeConn(Connection conn) {
    		try {
    			if (conn != null)
    				conn.close();
    		} catch (SQLException e) {
    			e.printStackTrace();
    		}
    	}
    	
    	public static void closePs(PreparedStatement ps) {
    		try {
    			if (ps != null)
    				ps.close();
    		} catch (SQLException e) {
    			e.printStackTrace();
    		}
    	}
    	
    	public static void closeRs(ResultSet rs) {
    		try {
    			if (rs != null)
    				rs.close();
    		} catch (SQLException e) {
    			e.printStackTrace();
    		}
    	}
    }

**MyDataSource.class**

    package com.util;
    
    import java.io.PrintWriter;
    import java.sql.Connection;
    import java.sql.SQLException;
    import java.sql.SQLFeatureNotSupportedException;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.logging.Logger;
    
    import javax.sql.DataSource;
    
    /**
     * 这是数据库的连接池 一开始先往池子里放10个连接
     * 
     * @author cf
     *
     */
    public class MyDataSource implements DataSource {
    	// 该连接池对外公布的获取连接的方法
    	List<Connection> list = new ArrayList<Connection>();
    
    	public MyDataSource() {
    		for (int i = 0; i < 10; i++) {
    			Connection conn = JDBCUtil.getConn();
    			list.add(conn);
    		}
    	}
    
    	// 获取连接池中的连接
    	@Override
    	public Connection getConnection() throws SQLException {
    		if (list.size() == 0) {
    			for (int i = 0; i < 5; i++) {
    				Connection conn = JDBCUtil.getConn();
    				list.add(conn);
    			}
    		}
    		Connection conn = list.remove(0);
    		Connection connection = new ConnectionWrap(conn, list);
    		return connection;
    	}
    	
    	// 使用完连接后归还连接
    	public void addBack(Connection conn) {
    		list.add(conn);
    	}
    	
    	@Override
    	public Connection getConnection(String arg0, String arg1) throws SQLException {
    		return null;
    	}
    
    	@Override
    	public PrintWriter getLogWriter() throws SQLException {
    		// TODO Auto-generated method stub
    		return null;
    	}
    
    	@Override
    	public int getLoginTimeout() throws SQLException {
    		// TODO Auto-generated method stub
    		return 0;
    	}
    
    	@Override
    	public Logger getParentLogger() throws SQLFeatureNotSupportedException {
    		// TODO Auto-generated method stub
    		return null;
    	}
    
    	@Override
    	public void setLogWriter(PrintWriter arg0) throws SQLException {
    		// TODO Auto-generated method stub
    
    	}
    
    	@Override
    	public void setLoginTimeout(int arg0) throws SQLException {
    		// TODO Auto-generated method stub
    
    	}
    
    	@Override
    	public boolean isWrapperFor(Class<?> arg0) throws SQLException {
    		// TODO Auto-generated method stub
    		return false;
    	}
    
    	@Override
    	public <T> T unwrap(Class<T> arg0) throws SQLException {
    		// TODO Auto-generated method stub
    		return null;
    	}
    
    
    }

**ConnectionWrap.class**

    package com.util;
    
    import java.sql.Array;
    import java.sql.Blob;
    import java.sql.CallableStatement;
    import java.sql.Clob;
    import java.sql.Connection;
    import java.sql.DatabaseMetaData;
    import java.sql.NClob;
    import java.sql.PreparedStatement;
    import java.sql.SQLClientInfoException;
    import java.sql.SQLException;
    import java.sql.SQLWarning;
    import java.sql.SQLXML;
    import java.sql.Savepoint;
    import java.sql.Statement;
    import java.sql.Struct;
    import java.util.List;
    import java.util.Map;
    import java.util.Properties;
    import java.util.concurrent.Executor;
    
    public class ConnectionWrap implements Connection {
    	
    	Connection connection = null;
    	List<Connection> list;
    	public ConnectionWrap(Connection connection, List<Connection> list) {
    		super();
    		this.connection = connection;
    		this.list = list;
    	}
    
    	@Override
    	public void close() throws SQLException {
    		//connection.close()
    		System.out.println("有连接对象被归还。归还之前，池子里面是：" + list.size());
    		list.add(connection);
    		System.out.println("归还后" + list.size());
    	}
    
    	@Override
    	public PreparedStatement prepareStatement(String sql) throws SQLException {
    		return connection.prepareStatement(sql);
    	}
    }

**JDBCUtilTest.class**

    package com.util;
    
    import java.sql.Connection;
    import java.sql.SQLException;
    
    import org.junit.Test;
    
    import com.mysql.jdbc.PreparedStatement;
    
    public class JDBCUtilTest {
    
    	@Test
    	public void testPool() {
    		MyDataSource dataSource = new MyDataSource();
    		Connection conn = null;
    		PreparedStatement ps = null;
    
    		try {
    			conn = dataSource.getConnection();
    
    			String sql = "insert into tb_account values (null,'xilali', 10)";
    			ps = (PreparedStatement) conn.prepareStatement(sql);
    			ps.executeUpdate();
    		} catch (SQLException e) {
    			e.printStackTrace();
    		} finally {
    			try {
    				if (ps != null)
    					ps.close();
    			} catch (SQLException e) {
    				e.printStackTrace();
    			}
    			// 不关闭连接，归还连接
    			/* dataSource.addBack(conn); */
    			JDBCUtil.closePs(ps);
    			JDBCUtil.closeConn(conn);
    		}
    	}
    }

**/ConnectorPool/src/jdbc.properties**

    driverClass=com.mysql.jdbc.Driver
    url=jdbc:mysql://localhost:3305/db_bank
    name=root
    password=root



## 三、DBCP连接池
DBCP：（DataBase Connection Pool），由Apache开发，通过数据库连接池，可以让程序自动管理数据库连接的释放和断开。

**所依赖jar包：**
 commons-dbcp2-2.1.1.jar       
 commons-logging-1.2.jar       
 commons-pool2-2.4.2.jar
 以及mysql的jar包

**步骤：**
1.创建的是BasicDataSource 对象；
2.从BasicDataSource实例中获得连接。

**无配置文件：**

    package com.dbcp;
    
    import java.sql.Connection;
    import java.sql.PreparedStatement;
    import java.sql.SQLException;
    
    import org.apache.commons.dbcp.BasicDataSource;
    import org.junit.Test;
    
    import com.util.JDBCUtil;
    
    public class DBCPDemo {
    
    	@Test
    	public void testDBCP01() {
    		Connection conn = null;
    		PreparedStatement ps = null;
    		
    		try {
    			//1.构建数据源对象
    			BasicDataSource  dataSource = new BasicDataSource();
    			
    			//连接数据库
    			dataSource.setDriverClassName("com.mysql.jdbc.Driver");
    			dataSource.setUrl("jdbc:mysql://localhost:3305/db_bank");
    			dataSource.setUsername("root");
    			dataSource.setPassword("root");
    			
    			//2.得到连接对象
    			conn = dataSource.getConnection();
    			String sql = "insert into tb_account values(null,?,?)";
    			ps = conn.prepareStatement(sql);
    			ps.setString(1, "admin");
    			ps.setInt(2, 1000);
    			
    			ps.executeUpdate();
    			
    		} catch (SQLException e) {
    
    			e.printStackTrace();
    		} finally {
    			JDBCUtil.closePs(ps);
    			JDBCUtil.closeConn(conn);
    		}
    	}
    }

****配置文件：****

配置文件路径：ConnectorPool/src/dbcpconfig.properties

    #连接设置
    driverClass=com.mysql.jdbc.Driver
    url=jdbc:mysql://localhost:3305/db_bank
    username=root
    password=root
    
    #<!--初始化连接-->
    initialSize=10
    
    #最大连接数量
    maxActive=50
    
    #<!--最大空闲连接-->
    maxIdle=20
    
    #<!--最小空闲连接-->
    minIdle=5
    
    #<!--超时等待时间以毫秒为单位 6000毫秒/1000 等于60秒-->
    maxWait=60000
    
    #JDBC驱动建立连接时附带的连接属性的格式必须为这样：[属性名=property;]
    #注意："user"与"password"两个属性会被明确地传递，因此这里不需要包含他们。
    connectionProperties=useUnicode=true;characterEncoding=utf8
    
    #指定由连接池所创建的连接自动提交(auto-commit)状态
    defaultAutoCommit=true
    
    #driver default 指定由连接池所创建的连接的只读（read-only）状态。
    #如果没有设置该值，则“setReadOnly”方法将不被调用。（某些驱动并不支持只读模式，如：Informix）
    defaultReadOnly=
    
    #driver default 指定由连接池所创建的连接的事务级别（TransactionIsolation）。
    #可用值为下列之一：（详情可见javadoc。）NONE,READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE
    defaultTransactionIsolation=REPEATABLE_READ

**demo**

    package com.dbcp;
    
    import java.sql.Connection;
    import java.sql.PreparedStatement;
    import java.sql.SQLException;
    
    import org.apache.commons.dbcp.BasicDataSource;
    import org.junit.Test;
    
    import com.util.JDBCUtil;
    
    public class DBCPDemo {
    
    	@Test
    	public void testDBCP01() {
    		Connection conn = null;
    		PreparedStatement ps = null;
    		
    		try {
    			//1.构建数据源对象
    			BasicDataSource  dataSource = new BasicDataSource();
    			
    			//连接数据库
    			dataSource.setDriverClassName("com.mysql.jdbc.Driver");
    			dataSource.setUrl("jdbc:mysql://localhost:3305/db_bank");
    			dataSource.setUsername("root");
    			dataSource.setPassword("root");
    			
    			//2.得到连接对象
    			conn = dataSource.getConnection();
    			String sql = "insert into tb_account values(null,?,?)";
    			ps = conn.prepareStatement(sql);
    			ps.setString(1, "admin");
    			ps.setInt(2, 1000);
    			
    			ps.executeUpdate();
    			
    		} catch (SQLException e) {
    
    			e.printStackTrace();
    		} finally {
    			JDBCUtil.closePs(ps);
    			JDBCUtil.closeConn(conn);
    		}
    	}
    }

## **四、C3P0连接池:**

C3P0是一个开源的JDBC连接池

依赖jar包：
 c3p0-0.9.2.1.jar
 mchange-commons-java-0.2.3.4.jar
 mysql的jar包

**步骤：**
1.导入核心类：ComboPooledDataSource；
2.从ComboPooledDataSource实例中获得连接。

**无配置文件**

    package com.c3p0;
    
    import java.sql.Connection;
    import java.sql.PreparedStatement;
    import java.sql.SQLException;
    
    import org.junit.Test;
    
    import com.mchange.v2.c3p0.ComboPooledDataSource;
    
    public class C3P0Demo {
    	
    	@Test
    	public void testC3P0() {
    		Connection conn = null;
    		PreparedStatement ps = null;	
    		
    		try {
    			//1.创建datasource
    			ComboPooledDataSource dataSource = new ComboPooledDataSource();
    			//2.设置连接数据库信息
    			dataSource.setDriverClass("com.mysql.jdbc.Driver");
    			dataSource.setJdbcUrl("jdbc:mysql://localhost:3305/db_bank");
    			dataSource.setUser("root");
    			dataSource.setPassword("root");
    			//获得连接对象
    			conn = dataSource.getConnection();
    			String sql = "insert into tb_account values(null,?,?)";
    			ps = conn.prepareStatement(sql);
    			ps.setString(1, "amindr1h");
    			ps.setInt(2, 100);
    			
    			ps.executeUpdate();
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    	}
    }

**配置文件**

配置文件路径：/ConnectorPool/src/c3p0-config.xml

    <?xml version="1.0" encoding="UTF-8"?>
    <c3p0-config>
      <default-config>
        <property name="driverClass">com.mysql.jdbc.Driver</property>
        <property name="jdbcUrl">jdbc:mysql://localhost:3305/db_bank</property>
        <property name="user">root</property>
          <property name="password">root</property>
        
        <property name="initialPoolSize">10</property>
        <property name="maxIdleTime">30</property>
        <property name="maxPoolSize">100</property>
        <property name="minPoolSize">10</property>
        <property name="maxStatements">200</property>
    
      </default-config>
    </c3p0-config>

**Demo**

    package com.c3p0;
    
    import java.sql.Connection;
    import java.sql.PreparedStatement;
    
    import org.junit.Test;
    
    import com.mchange.v2.c3p0.ComboPooledDataSource;
    
    public class C3P0Demo02 {
    	
    	@Test
    	public void testC3P0() {
    		Connection conn = null;
    		PreparedStatement ps = null;	
    		
    		try {
    			//1.创建datasource
    			ComboPooledDataSource dataSource = new ComboPooledDataSource();
    			
    			//获得连接对象
    			conn = dataSource.getConnection();
    			String sql = "insert into tb_account values(null,?,?)";
    			ps = conn.prepareStatement(sql);
    			ps.setString(1, "wangwu");
    			ps.setInt(2, 2000);
    			
    			ps.executeUpdate();
    		} catch (Exception e) {
    			e.printStackTrace();
    		}
    	}
    }

# 五、DBUtils
Commons DbUtils是Apache组织提供的一个对JDBC进行简单封装的开源工具类库，使用它能够简化JDBC应用程序的开发，同时也不会影响程序的性能。简单来说就是数据库简化CRUD操作。

以下例子使用DBUtils和C3P0：

**依赖jar包：**
commons-dbutils-1.1.jar
C3P0和Mysql的jar包

**步骤：**
1.创建datasource；
2.创建一个与数据库关联的queryRunner对象，后期再操作数据库的时候，不需要Connection对象，自动管理事务；
3.使用queryRunner对象管理数据。

    package com.dbutils;
    
    import java.sql.SQLException;
    import java.util.List;
    
    import org.apache.commons.dbutils.QueryRunner;
    import org.apache.commons.dbutils.handlers.BeanHandler;
    import org.apache.commons.dbutils.handlers.BeanListHandler;
    import org.junit.Test;
    
    import com.mchange.v2.c3p0.ComboPooledDataSource;
    
    import domain.Account;
    
    public class TestDButils {
    
    	@Test
    	public void testInsert() throws SQLException {
    
    		ComboPooledDataSource dataSource = new ComboPooledDataSource();
    		// dbtuils仅简化CRUD代码，但是连接的创建及获取需自行创造
    		QueryRunner queryRunner = new QueryRunner(dataSource);
    
    		// 增删改
    	//	queryRunner.update("insert into tb_account values(null,?,?)", "aa", 1000);
    
    		// 查询,查询到的数据还是在那个result里面，然后调用下面的handle方法，由用户手动去封装
    //		Account account = queryRunner.query("select * from tb_account where id = ?", new ResultSetHandler<Account>() {
    //
    //			@Override
    //			public Account handle(ResultSet rs) throws SQLException {
    //				Account account = new Account();
    //				while (rs.next()) {
    //					String name = rs.getString("name");
    //					int money = rs.getInt("money");
    //					account.setName(name);
    //					account.setMoney(money);
    //				}
    //				return account;
    //			}
    //		}, 2);
    //		System.out.println(account.toString());
    		
ResultSetHandle：封装数据的策略对象------将封装结果集中的数据，转换到另一个对象

用法：封装数据到对象的方式（示例：将数据库保存在User、保存到数组、保存到集合）

也可以使用ResultSetHandler的实现类，常用的BeanHandler、BeanListHandler和ScalarHandler

    		//查询单个对象
    //		Account account = queryRunner.query("select * from tb_account where id = ?",new BeanHandler<Account>(Account.class),2);
    //		System.out.println(account.toString());
    		//查询多个对象
    		List<Account> list = queryRunner.query("select * from tb_account",new BeanListHandler<Account>(Account.class));
    		for (Account account : list) {
    			System.out.println(account.toString());
    		}
    	}
    }

ScalarHandler后面再更