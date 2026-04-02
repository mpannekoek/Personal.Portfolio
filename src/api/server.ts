import express from "express";
import path from "node:path";
import blogsRouter from "./routes/blogs";
import projectRouter from "./routes/project";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.use("/api/blogs/assets", express.static(path.resolve(process.cwd(), "content/blog")));
app.use("/api/blogs", blogsRouter);
app.use("/api/project", projectRouter);

app.listen(port, "127.0.0.1", () => {
  console.log(`API listening on http://127.0.0.1:${port}`);
});
