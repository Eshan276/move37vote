# Move37 Real-Time Polling Backend

This is a **real-time polling backend** built with Node.js, Express, Prisma, PostgreSQL, and Socket.IO. It allows users to create polls, vote on options, and receive **live updates** in real-time.

---

## **Technologies**

* Node.js (v18+)
* Express.js
* PostgreSQL (Neon or local)
* Prisma ORM
* Socket.IO for real-time updates
* Nodemon for development

---

## **Project Structure**

```
move37vote/
├── prisma/
│   └── schema.prisma       # Prisma schema
├── src/
│   ├── routes/
│   │   ├── users.js
│   │   ├── polls.js
│   │   └── votes.js
│   ├── services/
│   │   └── voteService.js
│   ├── sockets/
│   │   └── pollSocket.js
│   ├── prismaClient.js
│   ├── app.js
│   └── index.js
├── .env                    # Database URL, PORT
├── package.json
└── README.md
```

---

## **Setup**

1. **Clone the repository**

```bash
git clone https://github.com/Eshan276/move37vote.git
cd move37vote
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
PORT=4000
```

4. **Generate Prisma client and migrate database**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## **Running the Server**

Start in **development mode** (with nodemon):

```bash
npm run dev
```

Start in **production mode**:

```bash
npm start
```

Server will run at:

```
http://localhost:4000
```

---

## **REST API Endpoints**

### **Users**

* **POST /users** — Create a new user

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "passwordHash": "hashedpassword"
}
```

* **GET /users/\:id** — Get user by ID

### **Polls**

* **POST /polls** — Create a new poll

```json
{
  "question": "What is your favorite color?",
  "creatorId": 1,
  "options": ["Red", "Blue", "Green"]
}
```

* **GET /polls** — Get all polls
* **GET /polls/\:id** — Get poll by ID (with options and vote counts)

### **Votes**

* **POST /votes** — Cast a vote

```json
{
  "userId": 1,
  "pollId": 1,
  "optionId": 2
}
```

* **GET /polls/\:id/results** — Get poll results

---

## **WebSocket (Real-time Updates)**

### **Connect**

```javascript
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");
```

### **Join a Poll Room**

```javascript
socket.emit('joinPoll', 1); // Join poll with ID 1
```

### **Listen for Vote Updates**

```javascript
socket.on('voteUpdate', (data) => {
  console.log('Updated poll results:', data);
});
```

### **Leave Poll Room**

```javascript
socket.emit('leavePoll', 1);
socket.disconnect();
```

---

## **Notes & Improvements**

* Add **authentication (JWT)** and password hashing.
* Add input validation, rate-limiting, and ownership checks.
* Use **Prisma aggregate queries** for performance on large datasets.
* For scaling WebSockets, use **Socket.IO Redis adapter**.
* Add **unit/integration tests** for endpoints and socket events.

---

## **License**

MIT License
