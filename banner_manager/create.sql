CREATE DATABASE banner_manager;
CREATE USER 'user1'@'%' IDENTIFIED BY 'user1pass';
GRANT ALL PRIVILEGES ON banner_manager.* TO 'user1'@'%' WITH GRANT OPTION;