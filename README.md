## 🔥 **BACKEND TECHNICAL TEST**
### 🏤 **PT.Klik Digital Sinergi**
### ➿ **BASE URL : http://localhost:1000**
![img](https://i.postimg.cc/BvG8NrN6/1-fsse-XIPGEhwmg6kfg-Xy-Ij-A.jpg)
### 🔹 **Tech Stack** :
1. Backend + Documentation : Node.Js & Express + Swagger
2. DBMS : MongoDB & Elastic
3. Elastic GUI Client : https://elasticvue.com/
4. Payment Gateway : Midtrans - Gopay

### 🔹 **Step Installation** :
1. make sure connected to the internet & local Elastic server is already running
2. change **.env.example** to **.env** & fill the secret key below:
    * ##### MONGO_URI=mongodb://localhost:27017/klik
    * ##### ELASTIC_URI=http://localhost:9200
    * ##### JWT_SECRET_ACCESS_TOKEN=76k1bgpHmC
    * ##### MIDTRANS_SERVER_KEY=SB-Mid-server-vMgJOtss_zGeLfqAK_KNolSh
    * ##### MIDTRANS_CLIENT_KEY=SB-Mid-client-9HOSFzP6dyj593ww
3. for install package type : **npm install**
4. for running the server type : **npm run dev**
5. Last, go to the main routes for details endpoints docs :
**http://localhost:1000**


### 🔹 **Folder Structure:**
* controller : contains backend logic
* model : contain mongodb database schema
* routes : contain routing endpoint
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

### 🔹 **Result:**

Example Postman Payments API Respons :

Midtrans Dashboard :

Elastic Search Logs (via GUI CLient) : 

MongoDB User Collections :

MongoDB Session Collections :

MongoDB Payments Collections :

