use elearning;
alter table subcategory add constraint FK_CategorySubcategory foreign key (categoryId) references category(id) ON DELETE CASCADE;