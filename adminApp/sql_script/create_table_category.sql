DROP TABLE IF EXISTS `category`;
create table if not exists category (
    id int auto_increment not null, 
    categoryName varchar(100) not null,
    categoryDesc varchar(100),
    primary key (id)
);
