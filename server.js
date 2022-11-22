const net = require("net");
const PORT = 6969;
const HOST = "127.0.0.1";

const server = net.createServer();

const userList = ["Wendell", "Raymond", "Dena"];
const css = "HTTP/1.1 200 OK\nContent-Type: text/html\n\nh1 {color: red;}";

const UserPageComponent = () => {
  const users = userList.map((user) => {
    return `<a href='/${user}'>${user}</a>`;
  });
  const userLinks = users.join("");
  console.log("userLinks", userLinks);
  return `HTTP/1.1 200 OK\nContent-Type: text/html\n\n<html><head><link rel='stylesheet' href='styles.css'></head><body><h1>${userLinks}</h1><a href='/home'>Go Home</a></body></html>`;
};
const LoginPageComponent = () =>
  "HTTP/1.1 200 OK\nContent-Type: text/html\n\n<html><body><h1>Login, Fool</h1></body></html>";
const HomePageComponent = () =>
  "HTTP/1.1 200 OK\nContent-Type: text/html\n\n<html><body><h1>Mediocre Home Page</h1></body></html>";
const ErrorPageComponent = () =>
  "HTTP/1.1 404 Not Found\nContent-Type: text/html\n\n<html><body><h1>404 Piikoi</h1></body></html>";

server.listen(PORT, HOST, () => {
  console.log(`Listening on ${HOST}:${PORT}`);
});

server.on("connection", (socket) => {
  console.log("connection created");
  socket.on("data", (data) => {
    console.log(`${data}`);
    const resource = data.toString().split("\n")[0].split(" ")[1];
    console.log(resource);
    switch (resource) {
      case "/login":
        socket.write(LoginPageComponent());
        break;
      case "/home":
        socket.write(HomePageComponent());
        break;
      case "/user":
        socket.write(UserPageComponent());
        break;
      case "/styles.css":
        console.log(css);
        socket.write(css);
        break;
      default:
        socket.write(ErrorPageComponent());
    }
    socket.destroy();
  });
});
