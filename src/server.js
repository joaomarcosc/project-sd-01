const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3333;

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/view/index/index.html");
});

app.get("/seller", (req, res) => {
  return res.sendFile(__dirname + "/view/seller/seller.html");
});

io.on("connection", (socket) => {
  console.log("user connect");

  socket.on("seller data", (msg) => {
    socket.broadcast.emit("seller data", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

app.get("/manager", (req, res) => {
  return res.sendFile(__dirname + "/view/manager/manager.html");
});

server.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
