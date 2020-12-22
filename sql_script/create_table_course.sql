DROP TABLE IF EXISTS `course`;
create table if not exists course (
    id int auto_increment not null,
    category_id int not null,
    course_name varchar(1000),
    course_image LONGBLOB not null,
    course_description text,
    course_detail text,
    rating_scoce decimal(2,2) not null,
    rating_students int not null default 0,
    enroll_number int not null default 0,
    course_fee int not null,
    last_modify datetime not null,
    course_program LONGBLOB not null,
    primary key(id)
)