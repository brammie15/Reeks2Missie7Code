import { world, system, MinecraftBlockTypes, Vector3, BlockType, Color } from "@minecraft/server";
import Level from "./Commandeer/level/level";
import { Mindkeeper, Store, StoreType } from "./Commandeer/mindKeeper";
import BlockCondition from "./Commandeer/completionCondition/BlockCondition";
import Pupeteer from "./Commandeer/pupeteer";
import { level1Conditions } from "./levels/level1";
import { level2Conditions } from "./levels/level2";
import { level3Conditions } from "./levels/level3";
import { levelExtra2Conditions } from "./levels/levelExtra2";
import { LevelCondition, Wall } from "./Commandeer/level/levelTypes";
import { startTrail } from "./trails/startTrail";
import { Trail } from "./Commandeer/trail/trailEngine";
import ButtonPushCondition from "./Commandeer/completionCondition/ButtonPushCondition";
import { levelExtra1Conditions } from "./levels/levelExtra1";
import { Vector3Add, Vector3ToString, vector3, vector3Scale } from "./Commandeer/utils/vectorUtils";
import { Firework } from "./Commandeer/utils/Firework";
import { spawnBaloonParticle, spawnParticle } from "./Commandeer/utils/particleUtils";
import { delay } from "./Commandeer/utils/waitUtil";

const mindKeeper = new Mindkeeper(world);
const pupeteer = new Pupeteer(world);

const isTestBuild = true;

const checkBlockCondition = (condition: LevelCondition): boolean => {
  let isComplete: boolean = true;
  condition.conditions.forEach((condition) => {
    if (!new BlockCondition(condition.position, condition.block).checkCondition()) {
      isComplete = false;
    }
  });
  return isComplete;
};

//#region LevelWalls
const level1Wall: Wall = {
  startPos: { x: 214, y: 74, z: 38 },
  endPos: { x: 247, y: 77, z: 38 },
};

const level2Wall: Wall = {
  startPos: { x: 214, y: 74, z: 31 },
  endPos: { x: 247, y: 77, z: 31 },
};

const extraLevel2Wall: Wall = {
  startPos: { x: 231, y: 74, z: 11 },
  endPos: { x: 231, y: 71, z: -11 },
};

const nullWall: Wall = {
  startPos: { x: -10, y: -10, z: -10 },
  endPos: { x: -10, y: -10, z: -10 },
};
//#endregion

//#region CommandBlock Positions
const noLevelCommandBlockPos: Vector3 = { x: 216, y: 72, z: 46 };
const level1CommandBlockPos: Vector3 = { x: 216, y: 72, z: 45 };
const level2CommandBlockPos: Vector3 = { x: 216, y: 72, z: 44 };
const level3CommandBlockPos: Vector3 = { x: 216, y: 72, z: 43 };
const levelExtra1CommandBlockPos: Vector3 = { x: 216, y: 72, z: 42 };
const levelExtra2CommandBlockPos: Vector3 = { x: 216, y: 72, z: 41 };
//#endregion

//#region level Start / End Positions
const level1StartPosition: Vector3 = vector3(224, 74, 43);
const level1EndPosition: Vector3 = vector3(245, 74, 43);

const level2StartPosition: Vector3 = vector3(224, 74, 36);
const level2EndPosition: Vector3 = vector3(245, 74, 36);

const level3StartPosition: Vector3 = vector3(224, 74, 29);
const level3EndPosition: Vector3 = vector3(245, 74, 29);

const levelExtra1StartPosition: Vector3 = vector3(224, 71, 10);
const levelExtra1EndPosition: Vector3 = vector3(224, 71, -9);

const levelExtra2StartPosition: Vector3 = vector3(234, 71, 10);
const levelExtra2EndPosition: Vector3 = vector3(234, 71, -9);
//#endregion

function setWall(wall: Wall, block: BlockType) {
  world.getDimension("overworld").fillBlocks(wall.startPos, wall.endPos, block);
}

function startLevel(commandBlockPos: Vector3) {
  world.getDimension("overworld").fillBlocks(commandBlockPos, commandBlockPos, MinecraftBlockTypes.redstoneBlock);
}

async function teleportAgent(position: Vector3) {
  world
    .getDimension("overworld")
    .runCommand(`/execute as @a run tp @e[type=agent] ${position.x} ${position.y} ${position.z}`);
}

function generateLevel(
  translationString: string,
  levelCommandBlockPos: Vector3,
  levelWall: Wall,
  levelConditions: LevelCondition,
  levelStartPosition: Vector3 = { x: 225, y: 74, z: 48 },
  levelEndPosition: Vector3 = { x: 225, y: 74, z: 48 }
): Level {
  return new Level(
    () => {
      world.sendMessage(`%message.${translationString}.started`);
      pupeteer.setTitleTimed(`%message.${translationString}.name`, 2.5);
      startLevel(levelCommandBlockPos);
      teleportAgent(levelStartPosition);
    },
    () => {
      pupeteer.setActionBar(`%message.${translationString}.make`);
    },
    () => {
      pupeteer.clearActionBar();
      world.sendMessage(`%message.${translationString}.complete`);
      pupeteer.setTitleTimed(`%message.${translationString}.complete`, 5);
      if (levelWall != nullWall) {
        setWall(levelWall, MinecraftBlockTypes.air);
      }
      // delayedRun(() => {
      //   mindKeeper.increment("currentLevel");
      // }, 100);
      mindKeeper.increment("currentLevel"); // debating between delayed and this (cuz npc's text doesnt update right away with delay? ask Marieke)
    },
    () => {
      let areBlocksCorrect = checkBlockCondition(levelConditions);

      if (areBlocksCorrect) {
        return true;
      }

      if (isAgentAt(levelEndPosition)) {
        console.warn("AGENT IS IT AT: " + Vector3ToString(levelEndPosition));
        teleportAgent(levelStartPosition);
        pupeteer.setTitleTimed("%message.level.incorrect", 2.5);
        pupeteer.updateSubtitle("%message.level.incorrect.subtext");
      }
    }
  );
}

//#region Levels
const level1: Level = generateLevel(
  "level1",
  level1CommandBlockPos,
  level1Wall,
  level1Conditions,
  level1StartPosition,
  level1EndPosition
);
const level2: Level = generateLevel(
  "level2",
  level2CommandBlockPos,
  level2Wall,
  level2Conditions,
  level2StartPosition,
  level2EndPosition
);
const level3: Level = generateLevel(
  "level3",
  level3CommandBlockPos,
  nullWall,
  level3Conditions,
  level3StartPosition,
  level3EndPosition
);

const levelExtra1: Level = generateLevel(
  "level_extra1",
  levelExtra1CommandBlockPos,
  extraLevel2Wall,
  levelExtra1Conditions,
  levelExtra1StartPosition,
  levelExtra1EndPosition
);

const levelExtra2: Level = generateLevel(
  "level_extra2",
  levelExtra2CommandBlockPos,
  nullWall,
  levelExtra2Conditions,
  levelExtra2StartPosition,
  levelExtra2EndPosition
);
//#endregion

let trailStart: Trail = new Trail("startTrail", 2);
trailStart.fromTrail(startTrail);

function setNpcText(npcTag: string, sceneName: string) {
  world.getDimension("overworld").runCommand(`/dialogue change @e[tag=${npcTag}] ${sceneName} @a`);
}

function isAgentAt(position: Vector3): boolean {
  let isAgentAt: boolean = false;
  world
    .getDimension("overworld")
    .getEntitiesAtBlockLocation(position)
    .forEach((entity) => {
      if (!entity.isValid()) {
        world.sendMessage("INVALID ENTITY");
        return;
      }
      if (entity.typeId == "minecraft:agent") {
        isAgentAt = true;
      }
    });
  return isAgentAt;
}
let hasLaunchedNormalFireworks: boolean = false;
async function launchEndingNormalLevels() {
  if (hasLaunchedNormalFireworks) {
    return;
  }
  hasLaunchedNormalFireworks = true;
  let startPosL: Vector3 = vector3(224, 74, 27);
  let startPosR: Vector3 = vector3(224, 74, 31);

  let direction: Vector3 = vector3(1, 0, 0);

  let height: number = 10;

  let color: Color = { red: 255, green: 0, blue: 0, alpha: 255 };

  for (let i = 0; i < 20; i += 4) {
    launchFirework(Vector3Add(startPosL, vector3Scale(direction, i)), height, color);
    launchFirework(Vector3Add(startPosR, vector3Scale(direction, i)), height, color);
    await delay(10);
  }
}
let hasLaunchedExtraFireworks: boolean = false;
async function launchExtraLevel() {
  if (hasLaunchedExtraFireworks) {
    return;
  }
  hasLaunchedExtraFireworks = true;
  let startPosL: Vector3 = vector3(235, 71, 9);
  let startPosR: Vector3 = vector3(233, 71, 9);

  let direction: Vector3 = vector3(0, 0, 1);

  let height: number = 10;

  let color: Color = { red: 255, green: 0, blue: 0, alpha: 255 };

  for (let i = 0; i < 20; i += 4) {
    launchFirework(Vector3Add(startPosL, vector3Scale(direction, i)), height, color);
    launchFirework(Vector3Add(startPosR, vector3Scale(direction, i)), height, color);
    await delay(10);
  }
}

let fireworks: Firework[] = [];

let drawPos: Vector3 = vector3(223, 80, 26);

// Subscribe to an event that calls every Minecraft tick
system.runInterval(() => {
  if (mindKeeper.initialised) {
    fireworks.forEach((firework) => {
      firework.update();
      if (firework.done()) {
        fireworks.splice(fireworks.indexOf(firework), 1);
      }
      firework.draw();
    });

    switch (mindKeeper.get("currentLevel")) {
      case 1:
        //waiting for the player to talk to Ramses
        pupeteer.setActionBar("%message.talkto.ramses");
        break;
      case 2:
        trailStart.spawnNext();
        pupeteer.setActionBar("%message.trail.follow");
        if (pupeteer.testForLocation({ x: 225, y: 74, z: 48 }, 2)) {
          mindKeeper.increment("currentLevel");
        }
        //Volg het lichtspoor
        break;

      case 3:
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 4:
        level1.update();
        break;
      case 5:
        setNpcText("chanel1", "chanel_level1_complete");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 6:
        level2.update();
        break;
      case 7:
        setNpcText("chanel1", "chanel_level2_complete");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 8:
        level3.update();
        break;
      case 9:
        setNpcText("chanel1", "chanel_level3_complete_1");
        launchEndingNormalLevels();
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 10:
      //end of level
      case 11:
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 12:
        levelExtra1.update();
        break;
      case 13: //still need text to goto extra level 2
        setNpcText("chanel2", "chanel_level2Extra_greeting_1");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 14:
        levelExtra2.update();
        break;
      case 15:
        setNpcText("chanel2", "chanel_level2Extra_complete_1");
        launchExtraLevel();
        pupeteer.setActionBar("%message.levels.completed");
        break;
      case 16: //finish ending
        break;
    }
  }
});

world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore("currentLevel", StoreType.number);
  mindKeeper.registerToWorld(propertyRegistry);
});

async function launchFirework(position: Vector3, height: number, color: Color) {
  for (let i = 0; i < height; i++) {
    spawnParticle("campfire_smoke_particle", vector3(position.x, position.y + i, position.z));
  }
  let newFirework = new Firework(vector3(position.x, position.y + height, position.z), 50);
  newFirework.explode();
  fireworks.push(newFirework);
}

world.beforeEvents.itemUseOn.subscribe((event) => {});

world.afterEvents.chatSend.subscribe((event) => {
  const command = event.message.split(" ")[0];
  const args = event.message.split(" ").slice(1);

  mindKeeper.chatCommands(event);

  if (event.message.startsWith("!reset")) {
    world.sendMessage("Resetting");
    mindKeeper.set("currentLevel", 1);
    level1.reset();
    level2.reset();
    level3.reset();
    hasLaunchedNormalFireworks = false;
    hasLaunchedExtraFireworks = false;
    levelExtra1.reset();
    levelExtra2.reset();

    setWall(level1Wall, MinecraftBlockTypes.barrier);
    setWall(level2Wall, MinecraftBlockTypes.barrier);
    setWall(extraLevel2Wall, MinecraftBlockTypes.barrier);

    startLevel(noLevelCommandBlockPos);

    setNpcText("chanel1", "chanel_greeting_1");
  }

  if (event.message.startsWith("!setNpcText")) {
    const npcTag = event.message.split(" ")[1];
    const sceneName = event.message.split(" ")[2];
    setNpcText(npcTag, sceneName);
  }

  if (command === "!startExtra") {
    world.sendMessage("Starting extra level");
    levelExtra1.reset();
    levelExtra2.reset();
    mindKeeper.set("currentLevel", 11);
    setNpcText("chanel2", "chanel_levelExtra1_greeting_1");
    startLevel(levelExtra1CommandBlockPos);
  }

  if (command == "!test") {
    fireworks.push(new Firework(world.getDimension("overworld").getPlayers()[0].location));
  }
  if (command == "!boom") {
    launchExtraLevel();
  }
  if (command == "!firework") {
    launchFirework(vector3(234, 75, 25), 20, {
      red: 255,
      green: 0,
      blue: 0,
      alpha: 255,
    });
  }

  if (command == "!marieke") {
    let levelID: string = event.message.split(" ")[1];
    world.sendMessage("OK " + levelID + " WE GO!");
    switch (levelID) {
      case "level1":
        level1.reset();
        mindKeeper.set("currentLevel", 4);
        break;
      case "level2":
        level2.reset();
        setWall(level1Wall, MinecraftBlockTypes.air);
        mindKeeper.set("currentLevel", 6);
        break;
      case "level3":
        setWall(level2Wall, MinecraftBlockTypes.air);
        level3.reset();
        mindKeeper.set("currentLevel", 8);
        break;
      case "levelExtra1":
        levelExtra1.reset();
        mindKeeper.set("currentLevel", 12);
        break;
      case "levelExtra2":
        setWall(extraLevel2Wall, MinecraftBlockTypes.air);
        levelExtra2.reset();
        mindKeeper.set("currentLevel", 14);
        break;
      default:
        world.sendMessage("No level found with that ID :(");
    }
  }
});

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id == "cc:startTrail") {
    if (mindKeeper.get("currentLevel") == 1) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startLevel1") {
    if (mindKeeper.get("currentLevel") == 3) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startLevel2") {
    if (mindKeeper.get("currentLevel") == 5) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startLevel3") {
    if (mindKeeper.get("currentLevel") == 7) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startExtraLevel1") {
    if (mindKeeper.get("currentLevel") == 11) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startExtraLevel2") {
    if (mindKeeper.get("currentLevel") == 13) {
      mindKeeper.increment("currentLevel");
    }
  }
});
