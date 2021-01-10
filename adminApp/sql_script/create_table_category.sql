DROP TABLE IF EXISTS `category`;
create table if not exists category (
    id int auto_increment not null, 
    category_name varchar(100),
    category_des varchar(100),
    primary key (id)
);
