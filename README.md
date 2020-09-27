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
1. Make sure connected to the internet & local Elastic server is already running.
2. Change **.env.example** to **.env** & fill the secret key below:
    * ##### MONGO_URI=mongodb+srv://faeshal:toshibac855d@cluster0.9k0n7.mongodb.net/klik?retryWrites=true&w=majority
    * ##### ELASTIC_URI=http://localhost:9200
    * ##### JWT_SECRET_ACCESS_TOKEN=76k1bgpHmC
    * ##### MIDTRANS_SERVER_KEY=SB-Mid-server-vMgJOtss_zGeLfqAK_KNolSh
    * ##### MIDTRANS_CLIENT_KEY=SB-Mid-client-9HOSFzP6dyj593ww
3. Install package type : **npm install**
4. Run the server type : **npm run dev**
5. Last, go to the main routes for details endpoints docs (Swagger):
**http://localhost:1000**


### 🔹 **Folder Structure:**
* controller : contains backend logic
* model : contain mongodb database schema
* routes : contain routing endpoint
* middleware : contain tiny function
* The entrypoint is server.js

### 🔹 **Dependency:**
* express : The main framework for building an API  
* nodemon : for automatically restart server
* dotenv : environment variable loader
* chalk : give color to spesific log
* morgan : http request logger
* cors : used to enable CORS with various options.
* winston : logger transporter 
* winston-elasticsearch : logger connector for elastic search
* mongoose : ODM for mongodb to create schema, relation etc.
* express session : express middleware for session management
* connect-mongodb-session : saving session inside mongodb 
* bcryptjs : password encryption
* express-winston : express logger middleware 
* jsonwebtoken : Auth Mechanism library
* swagger-ui-express : documentation generator
* midtrans-client : payment gateway driver library

### 🔹 **Result:**

**📌Example Postman Payments API Respons :**
```json
{
    "success": true,
    "data": {
        "_id": "5f6fffa51421390b247f1a0c",
        "user": {
            "_id": "5f6ffad9e13f7a22ec61c6d4",
            "username": "faeshal",
            "email": "faeshal@gmail.com"
        },
        "productName": "pecel lele",
        "quantity": 2,
        "price": 20000,
        "total": 40000,
        "createdAt": "2020-09-27T02:57:41.982Z",
        "__v": 0
    },
    "chargeResponse": {
        "status_code": "201",
        "status_message": "GO-PAY transaction is created",
        "transaction_id": "93519dea-24d2-4d1e-b95b-b82b23786529",
        "order_id": "5f6fffa51421390b247f1a0c",
        "merchant_id": "G998502637",
        "gross_amount": "40000.00",
        "currency": "IDR",
        "payment_type": "gopay",
        "transaction_time": "2020-09-27 09:57:41",
        "transaction_status": "pending",
        "fraud_status": "accept",
        "actions": [
            {
                "name": "generate-qr-code",
                "method": "GET",
                "url": "https://api.sandbox.veritrans.co.id/v2/gopay/93519dea-24d2-4d1e-b95b-b82b23786529/qr-code"
            },
            {
                "name": "deeplink-redirect",
                "method": "GET",
                "url": "https://simulator.sandbox.midtrans.com/gopay/ui/checkout?referenceid=l1XOms5Iaj&callback_url=http%3A%2F%2Flocalhost%3A1000%2F%3Forder_id%3D5f6fffa51421390b247f1a0c"
            },
            {
                "name": "get-status",
                "method": "GET",
                "url": "https://api.sandbox.veritrans.co.id/v2/93519dea-24d2-4d1e-b95b-b82b23786529/status"
            },
            {
                "name": "cancel",
                "method": "POST",
                "url": "https://api.sandbox.veritrans.co.id/v2/93519dea-24d2-4d1e-b95b-b82b23786529/cancel"
            }
        ]
    }
}
```

**📌Elastic Search Logs (via GUI CLient https://elasticvue.com/) 1 request - 1 logs :**

![elastic](https://i.postimg.cc/qMPGPXT5/Screenshot-3.png)

**📌Example Elastic logs docs :**
```json
{
	"_index": "logs-2020.09.27",
	"_type": "_doc",
	"_id": "SsN_zXQBZalo9m9BySLm",
	"_version": 1,
	"_seq_no": 39,
	"_primary_term": 1,
	"found": true,
	"_source": {
		"@timestamp": "2020-09-27T02:58:58.148Z",
		"message": "HTTP GET /api/auth/me - 23ms",
		"severity": "info",
		"fields": {
			"meta": {
				"req": {
					"url": "/api/auth/me",
					"headers": {
						"authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNmZmYWQ5ZTEzZjdhMjJlYzYxYzZkNCIsImlhdCI6MTYwMTE3NDg4NSwiZXhwIjoxNjAzNzY2ODg1fQ.Wex1La1hpdF6PxGXqysnWYU1EsZB2xED-F4dZp8jJMM",
						"user-agent": "PostmanRuntime/7.26.1",
						"accept": "*/*",
						"cache-control": "no-cache",
						"postman-token": "3fe59e9b-8399-4ebf-9357-821cf4b1b719",
						"host": "localhost:1000",
						"accept-encoding": "gzip, deflate, br",
						"connection": "keep-alive",
						"cookie": "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNGZjYzYyMTNiYzIzMTUxMGVhMzdkMyIsImlhdCI6MTYwMDcwMjkzNiwiZXhwIjoxNjAwNzAyOTY2fQ.Wet3F1toDgb4smN_JBo3Wr75tQbrzQmQbLmbHxyfjdE; connect.sid=s%3Ad4LQzW9QbVeooJqx07I6r_-1RDs2aT4j.cj%2FE9%2BtJ1pkqsEQvRwbC0k1jjyiTconRAM4oTGeezdQ"
					},
					"method": "GET",
					"httpVersion": "1.1",
					"originalUrl": "/api/auth/me",
					"query": {}
				},
				"res": {
					"statusCode": 200
				},
				"responseTime": 23
			}
		}
	}
}
```
**📌Midtrans Dashboard :**

![mid](https://i.postimg.cc/yNPX3MSM/mid.png)


**📌MongoDB User, **Session** & Payment Collections :**

![users](https://i.postimg.cc/fy3xFkgs/users.png)
![session](https://i.postimg.cc/Y9CN6d6h/sessions.png)
![pay](https://i.postimg.cc/1t7GJDBM/payment.png)


### 🏅 **Thank You - September 2020 - [faeshal.com](https://faeshal.com)**


