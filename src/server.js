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
  socket.on("seller data", (msg) => {
    if (isNaN(Number(msg.operation_code)) || isNaN(Number(msg.product_value))) {
      socket.emit("error", "Os dados 'Código da operação', 'Valor da venda' e 'Nome do vendedor' precisam ser números ")
    } else {
      socket.emit("success", "Venda cadastrada com sucesso")
      socket.broadcast.emit("seller data", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

app.get("/manager", (req, res) => {
  return res.sendFile(__dirname + "/view/manager/manager.html");
});

server.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
