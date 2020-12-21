create table if not exists user (
    id int auto_increment not null,
    username varchar(100) not null,
    password varchar(100) not null,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    email varchar(100) not null,
    UNIQUE(email, username),
    primary key (id)
)