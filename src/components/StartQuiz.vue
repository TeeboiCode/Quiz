<template>
  <div class="start-quiz-container">
    <div class="btn-start" id="btn_start" v-if="!showRules">
      <!-- HTML !-->
      <button
        class="button-19 start-btn"
        role="button"
        id="start_btn"
        @click="showRules = true"
      >
        Start Quiz
      </button>
    </div>

    <div class="rules" v-if="showRules">
      <RulesVue />
    </div>
  </div>
</template>

<script>
import RulesVue from "./Rules.vue";
export default {
  name: "StartQuizVue",
  components: {
    RulesVue,
  },
  data() {
    return {
      showRules: false,
    };
  },
};
</script>

<style scoped>
.start-quiz-container {
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

/* CSS */
.button-19 {
  appearance: button;
  background-color: #60bde9;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #0a3967;
  cursor: pointer;
  display: inline-block;
  font-family: din-round, sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 25px 40px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter 0.2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
}

.button-19:after {
  background-clip: padding-box;
  background-color: #1cb0f6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

.button-19,
.button-19:focus {
  user-select: auto;
}

.button-19:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

.button-19:disabled {
  cursor: auto;
}

.button-19:active {
  border-width: 4px 0 0;
  background: none;
}
</style>
