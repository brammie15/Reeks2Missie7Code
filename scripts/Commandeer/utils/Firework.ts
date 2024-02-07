import { Vector3, world } from "@minecraft/server";
import { RandomVector3, Vector3Add, Vector3Multiply, Vector3ToString, vector3, vector3Scale } from "./vectorUtils";
import { spawnBaloonParticle, spawnParticle } from "./particleUtils";

class Particle {
  pos: Vector3;
  vel: Vector3;
  gravity: Vector3 = vector3(0, -0.02, 0);
  lifetime: number;
  constructor(pos: Vector3, vel: Vector3, lifetime: number) {
    this.pos = pos;
    this.vel = vel;
    this.lifetime = lifetime;
  }

  update() {
    this.vel = Vector3Add(this.vel, this.gravity);
    this.pos = Vector3Add(this.pos, this.vel);

    this.lifetime--;
  }

  done() {
    return this.lifetime <= 0;
  }

  draw() {
    spawnParticle("villager_happy", this.pos);
  }
}

class Firework {
  particles: Particle[] = [];
  pos: Vector3;
  numParticles: number;
  constructor(pos: Vector3, numParticles: number = 100) {
    this.pos = pos;
    this.numParticles = numParticles;
  }

  explode(maxIterations: number = 10) {
    for (let i = 0; i < this.numParticles; i++) {
      const particle = new Particle(this.pos, vector3Scale(RandomVector3(-0.3, 0.3), 1), 20);
      this.particles.push(particle);
    }
  }

  update() {
    for (const particle of this.particles) {
      particle.update();
      if (particle.done()) {
        this.particles.splice(this.particles.indexOf(particle), 1);
      }
    }
  }

  done() {
    return this.particles.length === 0;
  }

  draw() {
    for (const particle of this.particles) {
      particle.draw();
    }
  }
}

export { Firework };
