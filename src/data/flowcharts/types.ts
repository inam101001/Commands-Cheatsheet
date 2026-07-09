export interface QuestionNode {
  id: string;
  type: "question";
  text: string;
  options: { label: string; next: string }[];
}

export interface ResolutionNode {
  id: string;
  type: "resolution";
  text: string;
  cause: string;
  fix: string;
  relatedCommands?: string[];
}

export type FlowchartNode = QuestionNode | ResolutionNode;

export interface Flowchart {
  id: string;
  title: string;
  description: string;
  startNodeId: string;
  nodes: Record<string, FlowchartNode>;
}
