import { Vector3 } from "@minecraft/server";

function vector3(x: number, y: number, z: number): Vector3 {
  return { x: x, y: y, z: z };
}

function Vector3ToString(vector: Vector3) {
  return vector.x + "," + vector.y + "," + vector.z;
}

function Vector3Add(vector1: Vector3, vector2: Vector3): Vector3 {
  return { x: vector1.x + vector2.x, y: vector1.y + vector2.y, z: vector1.z + vector2.z };
}

function Vector3Subtract(vector1: Vector3, vector2: Vector3): Vector3 {
  return { x: vector1.x - vector2.x, y: vector1.y - vector2.y, z: vector1.z - vector2.z };
}

function Vector3Multiply(vector1: Vector3, vector2: Vector3): Vector3 {
  return { x: vector1.x * vector2.x, y: vector1.y * vector2.y, z: vector1.z * vector2.z };
}

function vector3Scale(vector: Vector3, scale: number): Vector3 {
  return { x: vector.x * scale, y: vector.y * scale, z: vector.z * scale };
}

function Vector3Divide(vector1: Vector3, vector2: Vector3): Vector3 {
  return { x: vector1.x / vector2.x, y: vector1.y / vector2.y, z: vector1.z / vector2.z };
}

function Vector3Floor(vector: Vector3): Vector3 {
  return { x: Math.floor(vector.x), y: Math.floor(vector.y), z: Math.floor(vector.z) };
}

function Vector3Ceil(vector: Vector3): Vector3 {
  return { x: Math.ceil(vector.x), y: Math.ceil(vector.y), z: Math.ceil(vector.z) };
}

function Vector3Round(vector: Vector3): Vector3 {
  return { x: Math.round(vector.x), y: Math.round(vector.y), z: Math.round(vector.z) };
}

function Vector3Abs(vector: Vector3): Vector3 {
  return { x: Math.abs(vector.x), y: Math.abs(vector.y), z: Math.abs(vector.z) };
}

function RandomVector3(min: number, max: number) {
  return vector3(
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min,
    Math.random() * (max - min) + min
  );
}

export {
  Vector3ToString,
  Vector3Add,
  Vector3Subtract,
  Vector3Multiply,
  vector3Scale,
  Vector3Divide,
  Vector3Floor,
  Vector3Ceil,
  Vector3Round,
  Vector3Abs,
  RandomVector3,
  vector3,
};
