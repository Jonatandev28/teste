import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { configurePassport } from "./config/passportConfig";
import http from "http";
import { Server } from "socket.io";
import { configureMessageSocket } from "./messages";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

configurePassport();

const port = 3333;

app.use(
  session({
    secret: "sua-chave-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  },
});

export { io };

configureMessageSocket(io);

server.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
