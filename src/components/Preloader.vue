<template>
  <div>
    <div class="preload-container">
      <div class="preload">
        <div class="loading-container">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreloaderVue'
}
</script>

<style scoped>
.preload {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

/* loading */

.loading-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  width: 40px;
}

.dot {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}
.dot::before {
  content: '';
  height: 20%;
  width: 20%;
  border-radius: 50%;
  background-color: #fff;
  transform: scale(0);
  opacity: 0.5;
  animation: pulse calc(0.9s * 1.111) ease-in-out infinite;
  transition: background-color 0.3s ease;
}

.dot:nth-child(2) {
  transform: rotate(45deg);
}

.dot:nth-child(2)::before {
  animation-delay: calc(0.9s * -0.875);
}

.dot:nth-child(3) {
  transform: rotate(90deg);
}

.dot:nth-child(3)::before {
  animation-delay: calc(0.9s * -0.75);
}

.dot:nth-child(4) {
  transform: rotate(135deg);
}

.dot:nth-child(4)::before {
  animation-delay: calc(0.9s * -0.625);
}

.dot:nth-child(5) {
  transform: rotate(180deg);
}

.dot:nth-child(5)::before {
  animation-delay: calc(0.9s * -0.5);
}

.dot:nth-child(6) {
  transform: rotate(225deg);
}

.dot:nth-child(6)::before {
  animation-delay: calc(0.9s * -0.375);
}

.dot:nth-child(7) {
  transform: rotate(270deg);
}

.dot:nth-child(7)::before {
  animation-delay: calc(0.9s * -0.25);
}

.dot:nth-child(8) {
  transform: rotate(315deg);
}

.dot:nth-child(8)::before {
  animation-delay: calc(0.9s * -0.125);
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  50% {
    transform: scale(1);
    opacity: 1;
  }
}

.preload-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a3967 0%, #0a69ed 100%);
  perspective: 1000px;
}
</style>
