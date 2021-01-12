create table if not exists lesson (
   id int auto_increment not null,
   lessonName varchar(1000),
   courseId varchar(100) not null,
   lessonVideo LONGBLOB,
   lessonSection varchar(1000),
   content text,
   primary key(id)
 );