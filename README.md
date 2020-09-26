## 🔥 **BACKEND TECHNICAL TEST**
### 🏤 **PT.Klik Digital Sinergi**
### ➿ **BASE URL : http://localhost:1000**
![img](https://i.postimg.cc/BvG8NrN6/1-fsse-XIPGEhwmg6kfg-Xy-Ij-A.jpg)
### 🔹 **Step Installation** :
1. change **.env.example** to **.env** & fill the secret key below:
    * ##### MONGO_URI=mongodb://localhost:27017/klik
    * ##### ELASTIC_URI=http://localhost:9200
    * ##### JWT_SECRET_ACCESS_TOKEN=76k1bgpHmC
    * ##### MIDTRANS_SERVER_KEY=SB-Mid-server-vMgJOtss_zGeLfqAK_KNolSh
    * ##### MIDTRANS_CLIENT_KEY=SB-Mid-client-9HOSFzP6dyj593ww
2. for install package type : **npm install**
3. for running the server type : **npm run dev**

### 🔹 **List Endpoint:** 
All details Endpoint is documented with Swagger, just go to the main routes:
**http://localhost:1000**


### 🔹 **Folder Structure:**
* controller : contains backend logic
* model : contain mongodb database schema
* routes = contain routing endpoint
* middleware : contain tiny function
* The entrypoint is server.js

### 🔹 **Dependency:**
* express = The main framework for building an API
* nodemon = for automatically restart server
* chalk = give color to spesific log
* morgan = http request logger
* cors = used to enable CORS with various options.
* winston = logger transporter 
* winston-elasticsearch = connector for elastic search
* mongoose = ODM for mongodb to create schema, relation etc.
* connect-mongodb-session = for saving session inside mongodb 
* bcryptjs = password encryption
* jsonwebtoken = Auth Mechanism library
* midtrans-client= payment gateway driver library