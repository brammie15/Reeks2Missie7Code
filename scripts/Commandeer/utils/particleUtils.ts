import { MolangVariableMap, Vector3, world } from "@minecraft/server";

function spawnParticle(particleName: String, position: Vector3) {
  world.getDimension("overworld").spawnParticle(`minecraft:${particleName}`, position, new MolangVariableMap());
}

function spawnBaloonParticle(position: Vector3) {
  world.getDimension("overworld").spawnParticle("minecraft:balloon_gas_particle", position, new MolangVariableMap());
}

export { spawnParticle, spawnBaloonParticle };
