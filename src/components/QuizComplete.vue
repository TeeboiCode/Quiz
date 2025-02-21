<template>
  <div class="complete" :class="{ hidden: !show }">
    <div class="complete-card">
      <span class="crown">👑</span>
      <p>
        You've completed the Quiz! <br />
        and congrats! 🎉, You got
        <span class="correct-score">{{ score }}</span> out of
        <span class="total-question">{{ totalQuestions }}</span> <br /><br />
        <span id="percentage" :class="percentageColorClass">
          (<span class="percentage-score">{{ percentage }}</span
          >%)
        </span>
      </p>
      <div class="btn-group">
        <button class="replay-btn" @click="$router.push('/userinput')">
          Replay Quiz
        </button>
        <button class="quit-btn" @click="$router.push('/')">Quit Quiz</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "QuizComplete",
  props: {
    show: Boolean,
    score: Number,
    totalQuestions: Number,
  },
  data() {
    return {
      playerName: "",
    };
  },
  computed: {
    percentage() {
      return Math.round((this.score / this.totalQuestions) * 100);
    },
    percentageColorClass() {
      if (this.percentage >= 80) return "score-excellent";
      if (this.percentage >= 70) return "score-good";
      if (this.percentage >= 50) return "score-fair";
      return "score-poor";
    },
  },
  methods: {
    saveResult() {
      const playerName = localStorage.getItem("playerName"); // Assuming playerName is stored in local storage
      const newResult = {
        name: playerName,
        score: this.score,
        total: this.totalQuestions,
        percentage: this.percentage,
        time: new Date()
      };

      let results = JSON.parse(localStorage.getItem("quizResults")) || [];
      results.push(newResult);
      localStorage.setItem("quizResults", JSON.stringify(results));

      fetch("http://localhost:3050/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newResult),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  mounted() {
    this.saveResult();
  },
};
</script>

<style scoped>
.complete {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0a3967 0%, #0a69ed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: containerFloat 3s ease-in-out infinite;
  backdrop-filter: blur(10px);
  transition: all 4s ease;
}

@keyframes containerFloat {
  0%,
  100% {
    transform: translateY(0) rotateX(4deg);
  }
  50% {
    transform: translateY(-20px) rotateX(-9deg);
  }
}

.complete-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.5s ease-out;
  max-width: 500px;
  width: 90%;
}

.crown {
  font-size: 5rem;
  animation: bounce 2s infinite;
}

#percentage {
  font-weight: bold;
  font-size: 3rem;
  display: block;
  margin: 10px 0;
}

.score-excellent {
  color: #28a745;
}

.score-good {
  color: #ffc107;
}

.score-fair {
  color: #fd7e14;
}

.score-poor {
  color: #dc3545;
}

.btn-group {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.replay-btn,
.quit-btn,
.save-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.replay-btn {
  background: #0a69ed;
  color: white;
}

.quit-btn {
  background: #dc3545;
  color: white;
}

.save-btn {
  background: #28a745;
  color: white;
}

.replay-btn:hover,
.quit-btn:hover,
.save-btn:hover {
  transform: scale(1.05);
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hidden {
  display: none;
}
</style>
