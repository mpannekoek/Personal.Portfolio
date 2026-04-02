import { Router } from "express";
import { getCurrentProject } from "../lib/project";

const router = Router();

router.get("/current", (_req, res) => {
  try {
    const project = getCurrentProject();

    return res.json(project);
  } catch (error) {
    console.error("Error fetching current project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch current project",
    });
  }
});

export default router;
