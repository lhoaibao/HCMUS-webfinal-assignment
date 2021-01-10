create table if not exists course (
   id int auto_increment not null,
   category varchar(100) not null,
   courseName varchar(1000),
   courseImage LONGBLOB not null,
   shortDesc varchar(100) not null,
   detailDesc text not null,
   ratingScoce decimal(2,1) not null default 0.0,
   ratingNumber int not null default 0,
   enrollNumber int not null default 0,
   tuition int not null,
   lastModify datetime not null,
   authorId int not null,
   promotionInfo varchar(100),
   status varchar(20) not null default "incompleted", 
   primary key(id)
 );