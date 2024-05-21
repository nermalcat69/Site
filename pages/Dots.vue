<script setup lang="ts">
import { p5i } from "p5i";
import type { P5I } from "p5i";
import { onMounted, onUnmounted, ref } from "vue";

const el = ref<HTMLCanvasElement | null>(null);

const {
  mount,
  unmount,
  createCanvas,
  background,
  noFill,
  stroke,
  noise,
  noiseSeed,
  resizeCanvas,
  cos,
  sin,
  TWO_PI,
} = p5i();

let w = window.innerWidth;
let h = window.innerHeight;
let offsetY = window.scrollY;

const SCALE = 200;
const LENGTH = 10;
const SPACING = 15;

function getForceOnPoint(x: number, y: number, z: number) {
  return (noise(x / SCALE, y / SCALE, z) - 0.5) * 2 * TWO_PI;
}

const existingPoints = new Set<string>();
const points: { x: number; y: number; opacity: number }[] = [];

function addPoints() {
  for (let x = -SPACING / 4; x < w + SPACING; x += SPACING) {
    for (let y = -SPACING / 2; y < h + offsetY + SPACING; y += SPACING) {
      const id = `${x}-${y}`;
      if (existingPoints.has(id)) continue;
      existingPoints.add(id);
      points.push({ x, y, opacity: Math.random() * 0.5 + 0.5 });
    }
  }
}

function setup() {
  createCanvas(w, h);
  background("#000");
  stroke("#ccc");
  noFill();
  noiseSeed(Date.now());
  addPoints();
}

function draw({ circle }: P5I) {
  background("#000");
  const t = Date.now() / 10000;

  for (const p of points) {
    const { x, y } = p;
    const rad = getForceOnPoint(x, y, t);
    const length = (noise(x / SCALE, y / SCALE, t * 12) + 0.5) * LENGTH;
    const nx = x + cos(rad) * length;
    const ny = y + sin(rad) * length;
    stroke(130, 170, 160, (Math.abs(cos(rad)) * 0.4 + 0.2) * p.opacity * 190);
    circle(nx, ny - offsetY, 1);
  }
}

function restart() {
  if (el.value) mount(el.value, { setup, draw });
}

function handleResize() {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
  addPoints();
}

onMounted(() => {
  restart();
  window.addEventListener("resize", handleResize);

  // Uncomment to enable scroll-based animation
  // window.addEventListener('scroll', () => {
  //     offsetY = window.scrollY
  //     addPoints()
  // }, { passive: true })
});

onUnmounted(() => {
  unmount();
  window.removeEventListener("resize", handleResize);
  // window.removeEventListener('scroll', () => {
  //     offsetY = window.scrollY
  //     addPoints()
  // })
});
</script>

<template>
  <div
    ref="el"
    class="fixed ease-in duration-300 inset-0 pointer-events-none invert dark:invert-0"
  />
</template>
