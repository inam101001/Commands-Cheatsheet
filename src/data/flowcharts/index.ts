import { podCrashLoop } from "./podCrashLoop";
import { dockerExitsImmediately } from "./dockerExitsImmediately";
import { ciPipelineFailing } from "./ciPipelineFailing";
import type { Flowchart } from "./types";

export const flowcharts: Flowchart[] = [podCrashLoop, dockerExitsImmediately, ciPipelineFailing];

export type { Flowchart, FlowchartNode, QuestionNode, ResolutionNode } from "./types";
