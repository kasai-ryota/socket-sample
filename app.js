const app = require("express")();
const http = require("http").Server(app);
var io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });

  socket.on("disconnect", function() {
    console.log("disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
