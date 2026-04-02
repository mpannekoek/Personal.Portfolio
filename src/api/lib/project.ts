import fs from "node:fs";
import path from "node:path";

const CURRENT_PROJECT_FILE = path.resolve(process.cwd(), "content/project/current-project.json");

export interface CurrentProject {
  status: string;
  timeline: string;
  title: string;
  summary: string;
  progress: number;
  stack: string[];
  progressLabel: string;
  inProgress: string;
  progressAria: string;
  widgetLabel: string;
  currentBuild: string;
  openPanel: string;
  closePanel: string;
  closeWidget: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isCurrentProject(candidate: unknown): candidate is CurrentProject {
  if (typeof candidate !== "object" || candidate === null) {
    return false;
  }

  const parsed = candidate as Record<string, unknown>;

  return (
    isNonEmptyString(parsed.status) &&
    isNonEmptyString(parsed.timeline) &&
    isNonEmptyString(parsed.title) &&
    isNonEmptyString(parsed.summary) &&
    typeof parsed.progress === "number" &&
    Number.isFinite(parsed.progress) &&
    parsed.progress >= 0 &&
    parsed.progress <= 100 &&
    Array.isArray(parsed.stack) &&
    parsed.stack.length > 0 &&
    parsed.stack.every(isNonEmptyString) &&
    isNonEmptyString(parsed.progressLabel) &&
    isNonEmptyString(parsed.inProgress) &&
    isNonEmptyString(parsed.progressAria) &&
    isNonEmptyString(parsed.widgetLabel) &&
    isNonEmptyString(parsed.currentBuild) &&
    isNonEmptyString(parsed.openPanel) &&
    isNonEmptyString(parsed.closePanel) &&
    isNonEmptyString(parsed.closeWidget)
  );
}

export function getCurrentProject(): CurrentProject {
  const raw = fs.readFileSync(CURRENT_PROJECT_FILE, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  if (!isCurrentProject(parsed)) {
    throw new Error(`Invalid current project payload in "${CURRENT_PROJECT_FILE}".`);
  }

  return parsed;
}
