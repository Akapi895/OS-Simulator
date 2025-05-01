export type Resource = Record<string, number>;

export interface Process {
  id: number;
  allocation: Resource;
  max: Resource;
}