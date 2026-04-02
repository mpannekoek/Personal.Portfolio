import { getJson } from "./api-client";

export type CurrentProject = {
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
};

export const fallbackCurrentProject: CurrentProject = {
    status: "",
    timeline: "",
    title: "",
    summary: "",
    progress: 0,
    stack: [],
    progressLabel: "",
    inProgress: "",
    progressAria: "",
    widgetLabel: "",
    currentBuild: "",
    openPanel: "",
    closePanel: "",
    closeWidget: "",
};

export async function getCurrentProject(): Promise<CurrentProject> {
    return getJson<CurrentProject>("/api/project/current");
}
