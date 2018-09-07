USE master
GO
CREATE DATABASE CarRental
GO

USE [CarRental]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 12/08/2018 14:40:11 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[userId] [int] IDENTITY(1,1) NOT NULL,
	[fullName] [nvarchar] (25) NOT NULL,
	[identityNumber] [nvarchar] (9) NOT NULL UNIQUE,
	[userName] [nvarchar] (15) NOT NULL UNIQUE,
	[birthDay] [date] NULL,
	[gender] [bit] NOT NULL,
	[email] [nvarchar] (30) NOT NULL,
	[password] [nvarchar](6) NOT NULL,
	[userRole] [nvarchar](10) NULL,
	[image] [nvarchar](MAX),
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


USE [CarRental]
GO

/****** Object:  Table [dbo].[CarTypes]    Script Date: 12/08/2018 14:45:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[CarTypes](
	[carTypeId] [int] IDENTITY(1,1) NOT NULL,
	[manufacturer] [nvarchar](25) NOT NULL,
	[model] [nvarchar](20)  NOT NULL UNIQUE,
	[dailyCost] [money] NOT NULL,
	[dayDelayCost] [money] NOT NULL,
	[manufactureYear] [int] NOT NULL,
	[gear] [bit] NOT NULL,
 CONSTRAINT [PK_CarTypes] PRIMARY KEY CLUSTERED 
(
	[carTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


USE [CarRental]
GO

/****** Object:  Table [dbo].[Cars]    Script Date: 12/08/2018 14:46:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Cars](
	[carId] [int] IDENTITY(1,1) NOT NULL,
	[carTypeId] [int] NOT NULL,
	[currentKilometerage] [int] NOT NULL,
	[image] [nvarchar](MAX) NULL,
	[isFitForRental] [bit] NOT NULL,
	[carNumber] [nvarchar](10) UNIQUE NOT NULL,
	[branchId] [int] NOT NULL,
 CONSTRAINT [PK_Cars] PRIMARY KEY CLUSTERED 
(
	[carId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_Branches] FOREIGN KEY([branchId])
REFERENCES [dbo].[Branches] ([BranchId])
GO

ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_Branches]
GO

ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_CarTypes] FOREIGN KEY([carTypeId])
REFERENCES [dbo].[CarTypes] ([carTypeId])
GO

ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_CarTypes]
GO


USE [CarRental]
GO

/****** Object:  Table [dbo].[Branches]    Script Date: 12/08/2018 14:48:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Branches](
	[BranchId] [int] IDENTITY(1,1) NOT NULL,
	[address] [nvarchar](40) NOT NULL,
	[latitude] [int] NOT NULL,
	[longitude] [int] NOT NULL,
	[branchName] [nvarchar](20) NOT NULL UNIQUE,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


USE [CarRental]
GO

/****** Object:  Table [dbo].[Orders]    Script Date: 12/08/2018 14:44:28 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Orders](
	[orderId] [int] IDENTITY(1,1) NOT NULL,
	[startDate] [date] NOT NULL,
	[returnDate] [date] NOT NULL,
	[actualReturnDate] [date] NULL,
	[userId] [int] NOT NULL,
	[carId] [int] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[orderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Cars] FOREIGN KEY([carId])
REFERENCES [dbo].[Cars] ([carId])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Cars]
GO

ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Users] FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([userId])
GO

ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Users]
GO


INSERT INTO [Users]
VALUES('yehuda cooper',043123165,'yehuda',NULL,'false','yght@gmail.com',123456,'manager',NULL)
INSERT INTO [Users]
VALUES('yael cooper',334878600,'yael',NULL,'false','yght@gmail.com',234567,'worker',NULL)
INSERT INTO [Users]
VALUES('yakov cooper',327651915,'yakov',NULL,'true','yght@gmail.com',345678,'user',NULL)
INSERT INTO [Users]
VALUES('tamar cooper',217978899,'tamar',NULL,'false','yght@gmail.com',456789,'user',NULL)
INSERT INTO [Users]
VALUES('zvi cooper',338457401,'zvi',NULL,'true','yght@gmail.com',567890,'user',NULL)
INSERT INTO [Users]
VALUES('avital cooper',338682743,'avital',NULL,'false','yght@gmail.com',678901,'user',NULL)
INSERT INTO [Users]
VALUES('yoni cooper',338682735,'yoni',NULL,'true','yght@gmail.com',789012,'worker',NULL)
INSERT INTO [Users]
VALUES('shmuel cooper',338457419,'shmuel',NULL,'true','yght@gmail.com',890123,'user',NULL)

INSERT INTO [CarTypes]
VALUES('volvo','XC90 Hybrid',100,130,2018,'true')
INSERT INTO [CarTypes]
VALUES('mazda','CX-5',80,100,2016,'false')
INSERT INTO [CarTypes]
VALUES('marcedes-benz','S-560-4MATIC',140,180,2018,'true')
INSERT INTO [CarTypes]
VALUES('toyota','corolla',80,100,2017,'true')
INSERT INTO [CarTypes]
VALUES('mitsubishi','outlander',100,140,2018,'true')

INSERT INTO [Branches]
VALUES('Alenbi 30-Tel-Aviv',45,78,'Tel-Aviv')
INSERT INTO [Branches]
VALUES('King-Gorg 38-Jersalem',35,98,'Jerusalem')
INSERT INTO [Branches]
VALUES('Rothsield 78-Haifa',78,43,'Haifa')


INSERT INTO [Cars]
VALUES(2,14000,'mazda.png','true',12345678,1)
INSERT INTO [Cars]
VALUES(4,14000,'corolla-front.jpg','true',23456789,1)
INSERT INTO [Cars]
VALUES(5,14000,'mitsubishi.jpg','true',34567890,2)
INSERT INTO [Cars]
VALUES(1,14000,'volvo.jpg','true',45678901,1)
INSERT INTO [Cars]
VALUES(3,14000,'s_class.png','true',56789012,1)

INSERT INTO [Orders]
VALUES('2018-04-23','2018-05-23','2018-05-23',4,2)
INSERT INTO [Orders]
VALUES('2018-06-17','2018-08-23','2018-08-23',5,1)
INSERT INTO [Orders]
VALUES('2018-07-23','2018-08-23','2018-08-23',6,3)
INSERT INTO [Orders]
VALUES('2018-05-23','2018-07-23','2018-07-23',7,4)
INSERT INTO [Orders]
VALUES('2018-04-23','2018-05-23','2018-05-28',9,5)
INSERT INTO [Orders]
VALUES('2018-06-23','2018-07-10','2018-07-20',4,3)
INSERT INTO [Orders]
VALUES('2018-07-23','2018-09-23',NULL,5,2)
INSERT INTO [Orders]
VALUES('2018-07-25','2018-09-23',NULL,6,4)









