// src/app.ts
import express from "express";
import cookieParser from "cookie-parser";
import { verify } from "./utils/authUtils";
import authRoutes from "./routes/auth";
import contentRoutes from "./routes/contentRoutes"; // ✅ ADICIONAR
import cors from "cors";
import { handleError } from "./utils/errorHandler";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Rotas
app.use(authRoutes);
app.use("/api", contentRoutes); // ✅ ADICIONAR

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
