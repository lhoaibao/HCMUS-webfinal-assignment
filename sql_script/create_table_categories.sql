DROP TABLE IF EXISTS `category`;
create table if not exists categories (
    category_id int auto_increment not null,
    category_name varchar(100),
    primary key(category_id)
);