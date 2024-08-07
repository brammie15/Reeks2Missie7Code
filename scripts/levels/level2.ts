import { BlockVolume, Vector3, world } from "@minecraft/server";
import Level from "../Commandeer/level/level";
import { teleportAgent, isAgentAt } from "../Commandeer/utils/agentUtils";
import { startLevel } from "../Commandeer/utils/levelUtils";
import { Vector3Add, vector3 } from "../Commandeer/utils/vectorUtils";
import { CURRENT_LEVEL, mindKeeper, pupeteer } from "../main";
import * as agentUtils from "../Commandeer/utils/agentUtils";
import { level2Conditions } from "../levelConditions/level2";
import { MinecraftBlockTypes } from "../vanilla-data/mojang-block";

const Level2CommandBlockPos: Vector3 = vector3(58, 66, 278);
const level2StartPosition: Vector3 = vector3(46, 70, 220);
const Level2EndPosition: Vector3 = vector3(46, 70, 212);
const level2ResetCommandBlockPos: Vector3 = vector3(44, 68, 216);
const level2: Level = new Level(
  () => {
    world.sendMessage("%message.level2.started");
    pupeteer.setTitleTimed("%message.level2.name", 2.5);
    startLevel(Level2CommandBlockPos);
    teleportAgent(level2StartPosition);
  },
  () => {
    pupeteer.setActionBar("%message.level2.make");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("%message.level2.complete");
    pupeteer.setTitleTimed("%message.level2.complete", 2.5);

    mindKeeper.increment(CURRENT_LEVEL);
  },
  () => {
    let isComplete = true;
    let isOutOfBounds = false;

    //check the position under the agent
    let agentLocation = agentUtils.getAgentLocation();
    let blockUnderAgent = world.getDimension("overworld").getBlock(Vector3Add(agentLocation, vector3(0, -1, 0)));
    if (blockUnderAgent?.type.id == MinecraftBlockTypes.Water) {
      isOutOfBounds = true;
    }

    level2Conditions.conditions.forEach((condition) => {
      if (condition.block != world.getDimension("Overworld").getBlock(condition.position)?.type.id) {
        isComplete = false;
      }
    });
    if (isComplete && !isOutOfBounds) {
      return true;
    }

    if (isOutOfBounds) {
      teleportAgent(level2StartPosition);
      pupeteer.setTitleTimed("%message.level.outofbounds", 2.5);
      pupeteer.updateSubtitle("%message.level.outofbounds.subtext");
      startLevel(level2ResetCommandBlockPos);
      return false;
    }

    //level is done, but wrong
    if (isAgentAt(Level2EndPosition)) {
      teleportAgent(level2StartPosition);
      pupeteer.setTitleTimed("%message.level.incorrect", 2.5);
      pupeteer.updateSubtitle("%message.level.incorrect.subtext");
      world
        .getDimension("overworld")
        .fillBlocks(
          new BlockVolume(level2ResetCommandBlockPos, level2ResetCommandBlockPos),
          MinecraftBlockTypes.RedstoneBlock
        );
    }
  }
);

export default level2;
