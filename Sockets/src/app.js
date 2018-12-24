const io = require("socket.io")();
const fetch = require("node-fetch");
const uuidv4 = require("uuid/v4");
require("dotenv").load();

io.on("connection", client => {
  client.on("message", async message => {
    const url = `${process.env.API}/v1/users/me`;
    const response = await fetch(url, {
      headers: {
        cookie: client.request.headers.cookie
      },
      credentials: "include",
      method: "GET"
    });

    if (response.ok) {
      const data = await response.json();
      const { admin, username } = data.data;
      const d = new Date();
      const n = d.getTime();
      const id = uuidv4();

      io.to(message.room).emit("newMessage", {
        id,
        message: message.input,
        admin,
        username,
        timestamp: n
      });
    } else {
      console.log("??????");
    }
  });

  setInterval(function() {
    const d = new Date();
    const n = d.getTime();
    const id = uuidv4();

    io.to("715209").emit("newMessage", {
      id,
      message: "testing " + Math.random(),
      admin: false,
      username: "Stress Test",
      timestamp: n
    });
  }, 1500);

  client.on("subscribe", room => {
    try {
      // console.log("[client]", "join room :", room);
      client.join(room);
      // io.to(room).emit("joined", client.id);
    } catch (e) {
      // console.log("[error]", "join room :", e);
      // client.emit("error", "couldnt perform requested action");
    }
  });

  client.on("unsubscribe", room => {
    try {
      // console.log("[client]", "leave room :", room);
      client.leave(room);
      // client.to(room).emit("user left", client.id);
    } catch (e) {
      // console.log("[error]", "leave room :", e);
      // client.emit("error", "couldnt perform requested action");
    }
  });
});
const port = process.env.PORT;
io.listen(port);
console.log("listening on port ", port);
