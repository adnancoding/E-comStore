const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const mongoose = require("mongoose");
require('dotenv').config();
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: process.env.ORIGIN,
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})

const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);

mongoose
  .connect(process.env.MongoUrl, { useNewUrlparser: true })
  .then(() => console.log("MongoDB Connection Succesfull"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});


server.listen(process.env.PORT, ()=> {
  console.log('server running at port', process.env.PORT)
})

app.set('socketio', io);
