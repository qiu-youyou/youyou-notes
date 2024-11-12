<script setup lang="ts">
import confetti from "canvas-confetti";
import { inBrowser } from "vitepress";

if (inBrowser) {
  var duration = 1 * 1000;
  var animationEnd = Date.now() + duration;
  var skew = 1;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var unicorn = confetti.shapeFromText({ text: "❄️", scalar: 2 });

  (function frame() {
    var timeLeft = animationEnd - Date.now();
    var ticks = Math.max(200, 500 * (timeLeft / duration));
    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      shapes: [unicorn],
      gravity: randomInRange(0.3, 0.5),
      scalar: randomInRange(0.6, 1.8),
      drift: randomInRange(-0, 0),
      flat: true,
    } as any);

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}
</script>

<template></template>
