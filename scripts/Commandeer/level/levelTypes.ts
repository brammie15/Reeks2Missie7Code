import { BlockType, Vector3 } from "@minecraft/server";

export type blockCondition = {
  block: BlockType;
  position: Vector3;
};

export type LevelCondition = {
  conditions: blockCondition[];
};

export type Wall = {
  startPos: Vector3;
  endPos: Vector3;
};
