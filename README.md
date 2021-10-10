# Banner manager
## Description:
It\`s a web-application for managing banners and categories. Using the web interface, you can create, modify and delete banners and categories.
Banners have such parameters as: name, price, category, text. Each banner belongs to only one category.
Categories have two parameters: name and request ID.
You can get a banner by category using HTTP request `http://localhost:<SPRING_PORT>/bid?category=<Request ID>` when Request ID is a category parameter.
The same banner cannot be shown to the user with the same UserAgent and IP more than once a day.
Each request returns the banner with the highest available price in that category.
## Deployment and configuration instructions:
The service can be launched in two ways:
+ Using docker compose
+ Separately - spring boot server, react server, mysql

### The first way, Docker:
+ ##### 0. If some ports are already in use, you can change parameters in file .env:
  + `MYSQL_TCP_PORT` – port for mysql deployment
  + `SPRING_PORT` – port for backend
  + `REACT_PORT` – port for frontend

+ ##### 1. Сompile spring backend with a command `mvn package` in folder /banner_manager.
+ ##### 2. Install docker desktop.
+ ##### 3. Execute a command `docker-compose up --build` in a root folder and wait for a message that the frontend has successfully started.



### The second way, separately:
+ ##### 0. Install MySQL and JDK 8.
+ ##### 1. Create MySQL database and user (see example in `/banner_manager/create.sql`), then setup relevant parameters in
 + \banner_manager\src\main\resourcesapplication.properties:
   + `DB_USERNAME` – database user name. Default `user1`
   + `DB_PASS` – user password. Default `user1pass`
   + `DB_PORT` - port for mysql deployment. Default `3306`
   + `DB_NAME` – database name. Default `banner_manager`
   + `SPRING_PORT` - spring boot server port. Default `8090`

 + \bm_front\.env:
   + `REACT_APP_API_PORT` - port, to which the frontend will be sending requests (probably similar to SPRING_PORT). Default ` 8090`
   + `REACT_APP_API_IP` - IP, to which the frontend will be addressing. Default `"http://localhost"`

+ ##### 2. In folder /banner_manager execute `mvn spring-boot:run`
+ ##### 3. In folder /bm_front execute `npm start`