import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();
const router = express.Router();

router.get("/", statsCard);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);

app.use("/api", router);

// Lightweight liveness probe for self-hosting platforms (Railway, Fly, etc.).
// Does NOT touch the GitHub API, so it never consumes rate limit and stays
// green even when a PAT is exhausted — letting the platform tell "process up"
// apart from "GitHub API degraded".
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

const port = process.env.PORT || process.env.port || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
