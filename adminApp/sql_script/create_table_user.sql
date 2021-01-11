DROP TABLE IF EXISTS `user`;
create table if not exists user (
    id int auto_increment not null,
    username varchar(100) not null,
    password varchar(100) not null,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    email varchar(100) not null,
    dob date not null,
    permission int(11) not null,
    UNIQUE(email, username),
    primary key (id)
)

insert into user (username,password,firstName,lastName,email, dob,permission)
values (
    'admin', '$2y$12$35BLLfR1pnh6u3yNMZrUF.Hv3DmGtNoTJFgWEsySBDFwME1caM16u', 'Hoai Bao', 'Le', 'admin@admin.com.vn', '1999-08-02', 0
)