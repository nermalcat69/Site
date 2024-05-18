<script setup lang="ts">
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { onMounted, onUnmounted, ref } from 'vue'

// Vue ref to hold the canvas element
const el = ref<HTMLCanvasElement | null>(null)

// Destructuring p5i methods
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
} = p5i()

// Canvas dimensions
let w = window.innerWidth
let h = window.innerHeight
let offsetY = window.scrollY

// Constants for the noise field
const SCALE = 400
const LENGTH = 18
const SPACING = 13

// Function to calculate the force on a point based on Perlin noise
function getForceOnPoint(x: number, y: number, z: number) {
    return (noise(x / SCALE, y / SCALE, z) - 0.5) * 2 * TWO_PI
}

// Set to track existing points and array to store points
const existingPoints = new Set<string>()
const points: { x: number, y: number, opacity: number }[] = []

// Function to add points to the grid
function addPoints() {
    for (let x = -SPACING / 2; x < w + SPACING; x += SPACING) {
        for (let y = -SPACING / 2; y < h + offsetY + SPACING; y += SPACING) {
            const id = `${x}-${y}`
            if (existingPoints.has(id)) continue
            existingPoints.add(id)
            points.push({ x, y, opacity: Math.random() * 0.5 + 0.5 })
        }
    }
}

// Setup function for p5
function setup() {
    createCanvas(w, h)
    stroke('#777')
    noFill()
    noiseSeed(Date.now())
    addPoints()
}

// Draw function for p5
function draw({ circle }: P5I) {
    background('#000')
    const t = Date.now() / 10000

    for (const p of points) {
        const { x, y } = p
        const rad = getForceOnPoint(x, y, t)
        const length = (noise(x / SCALE, y / SCALE, t * 2) + 0.50) * LENGTH
        const nx = x + cos(rad) * length
        const ny = y + sin(rad) * length
        stroke(150, 200, 200, (Math.abs(cos(rad)) * 0.4 + 0.2) * p.opacity * 200)
        circle(nx, ny - offsetY, 0.35)
    }
}

// Restart function to remount p5
function restart() {
    if (el.value) mount(el.value, { setup, draw })
}

// Vue lifecycle hooks
onMounted(() => {
    restart()

    // Resize event listener
    window.addEventListener('resize', () => {
        w = window.innerWidth
        h = window.innerHeight
        resizeCanvas(w, h)
        addPoints()
    })
})

onUnmounted(() => {
    unmount()
})
</script>

<template>
    <div ref="el" z--1 fixed left-0 right-0 top-0 bottom-0 pointer-events-none dark:invert />
</template>
