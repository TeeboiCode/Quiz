<template>
  <div class="quiz-card-container">
    <!-- Add countdown message -->
    <div
      v-if="isCountingDown"
      class="countdown-message"
      v-html="countdownText"
    ></div>
    <!-- Add v-show to quiz-card to hide it during countdown -->
    <div
      class="quiz-card"
      id="quiz_card"
      v-show="!isCountingDown && !showComplete && !isLoading"
    >
      <div class="quiz-card-top">
        <h3 class="heading">Awesome Quiz Application</h3>
        <div class="left-time">
          <p>
            Time Left <span class="tym">{{ formattedTime }}</span>
          </p>
        </div>
      </div>
      <div class="quiz-card-body">
        <h2 v-if="currentQuestion">
          <span class="questionNextNum">{{ currentQuestionIndex + 1 }}</span>
          <span class="question" id="question"
            >. {{ currentQuestion.question }}</span
          >
        </h2>
        <div class="options" v-if="currentQuestion">
          <div
            v-for="(option, index) in shuffledOptions"
            :key="index"
            class="answer-option"
            :class="{
              'correct-answer':
                selectedOption && option === currentQuestion.correct,
              'wrong-answer':
                selectedOption === option && option !== currentQuestion.correct,
            }"
            @click="selectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
      <!-- <hr class="line-down" /> -->
      <div class="question-num">
        <p>
          <span class="next-question">{{ currentQuestionIndex + 1 }}</span> of
          <span class="total-question2">{{ questions.length }}</span> Questions
        </p>
        <button
          class="btn btn-next"
          :class="{ hidden: !showNextButton }"
          @click="handleNextClick"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Add loading spinner -->
    <div v-if="isLoading" class="loader">
      <div class="spinner"></div>
    </div>

    <!-- Add completion screen -->
    <quiz-complete
      v-if="showComplete"
      :show="showComplete"
      :score="score"
      :total-questions="questions.length"
    />
  </div>
</template>

<script>
import quizData from "@/data/quizQuestions.json";
import QuizComplete from "./QuizComplete.vue";

export default {
  name: "QuizCardVue",
  components: {
    QuizComplete,
  },
  data() {
    return {
      countdown: 3,
      isCountingDown: true,
      countdownText: "Get ready... The game starts in 3",
      questions: [],
      currentQuestionIndex: 0,
      currentQuestion: {
        question: "",
        options: [],
      },
      shuffledOptions: [],
      timeLeft: 30,
      timer: null,
      showNextButton: false,
      selectedOption: null,
      nextTimeout: null,
      score: 0,
      showComplete: false,
      isLoading: false,
    };
  },
  computed: {
    formattedTime() {
      return this.timeLeft < 10
        ? `0${this.timeLeft}`
        : this.timeLeft.toString();
    },
  },
  mounted() {
    window.addEventListener("beforeunload", this.submitQuizResults);
    this.initializeQuiz();
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown > 0) {
          this.countdownText = `Get ready... The game starts in <br/> ${this.countdown}`;
        } else {
          clearInterval(countdownInterval);
          this.isCountingDown = false;
          this.startQuestionTimer(); // Start the question timer after countdown
        }
      }, 1500);
    },
    startQuestionTimer() {
      this.timeLeft = 30; // Reset timer for new question
      if (this.timer) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.handleTimeUp();
        }
      }, 1000);
    },
    handleTimeUp() {
      clearInterval(this.timer);
      this.showNextButton = false;
      this.selectedOption = null;
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.setCurrentQuestion();
        this.startQuestionTimer();
      } else {
        // Handle quiz completion
        clearInterval(this.timer);
      }
    },
    initializeQuiz() {
      // Shuffle all questions
      this.questions = [...quizData.quizQuestions].sort(
        () => Math.random() - 0.5
      );
      this.setCurrentQuestion();
    },
    setCurrentQuestion() {
      if (this.questions.length > 0) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        // Shuffle options for current question
        this.shuffledOptions = [...this.currentQuestion.options].sort(
          () => Math.random() - 0.5
        );
      }
    },
    selectOption(option) {
      if (this.selectedOption) return;
      this.selectedOption = option;

      // Update score if correct
      if (option === this.currentQuestion.correct) {
        this.score++;
      }

      this.showNextButton = true;

      this.nextTimeout = setTimeout(() => {
        this.handleNextClick();
      }, 2000);
    },
    handleNextClick() {
      if (this.nextTimeout) {
        clearTimeout(this.nextTimeout);
      }
      this.showNextButton = false;
      this.selectedOption = null;

      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.showQuizComplete();
      } else {
        this.nextQuestion();
      }
    },
    showQuizComplete() {
      clearInterval(this.timer); // Stop the timer
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.showComplete = true;
      }, 3000);
    },
    restartQuiz() {
      this.score = 0;
      this.currentQuestionIndex = 0;
      this.showComplete = false;
      this.initializeQuiz();
      this.startQuestionTimer();
    },
    quitQuiz() {
      // Handle quit action (emit event to parent or use router)
      console.log("Quiz quit");
    },
    submitQuizResults() {
      // Logic to submit quiz results to the server or local storage
      const playerName = localStorage.getItem("playerName");
      const newResult = {
        name: playerName,
        score: this.score,
        total: this.questions.length,
        percentage: ((this.score / this.questions.length) * 100).toFixed(1),
        date: new Date().toLocaleDateString(),
      };

      // Save to local storage
      let results = JSON.parse(localStorage.getItem("quizResults")) || [];
      results.push(newResult);
      localStorage.setItem("quizResults", JSON.stringify(results));

      // Save to the server
      fetch("http://localhost:3000/results", {
        // Adjust the URL as needed
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
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.submitQuizResults);
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.nextTimeout) {
      clearTimeout(this.nextTimeout);
    }
  },
};
</script>

<style scoped>
/* ===== quiz-card =====*/
.quiz-card-container {
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

.quiz-card {
  background: #fff;
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  overflow: hidden;
  transition: all 1s ease !important;
}

.quiz-card-top {
  width: 100%;
  padding: 10px 15px;
  max-width: 600px;
  box-shadow: 0 2px 10px rgba(50, 50, 93, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.btn {
  padding: 0.75rem 1.75rem;
  font-weight: 600;
  border: none;
  outline: none;
  border-radius: 4px;
  background: transparent;
  transition: all 0.3s ease;
}

.quiz-card-top .heading {
  font-weight: 700;
}

.quiz-card-top .left-time {
  background: #cce6ff;
  padding: 8px 10px;
  border-radius: 8px;
  color: #0a3967;
  border: 1px solid #c6d8f0;
  width: fit-content;
}

.left-time p {
  white-space: nowrap;
  margin: 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.tym {
  background: #333740;
  color: #fff;
  padding: 2px 10px;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  -o-border-radius: 8px;
}

.question-num,
.quiz-card-body {
  padding: 1.2em 2.4em;
}

.quiz-card .options {
  width: 100%;
  margin: 10px 0;
}

.answer-option {
  border: 1px solid #bdcdda;
  background: #f1f8ff;
  border-radius: 5px;
  padding: 7px 9px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.correct-answer {
  background: #d4edda;
  border-color: #28a745;
  color: #155724;
}

.wrong-answer {
  background: #f8d7da;
  border-color: #dc3545;
  color: #721c24;
}

/* Disable clicking after selection */
.answer-option.correct-answer,
.answer-option.wrong-answer {
  cursor: default;
}

.question-num {
  border-top: 1px solid #bfbfbf;
  display: flex;
  justify-content: space-between;
}

.question-num p {
  font-weight: 600;
  font-size: smaller;
}

.line-down {
  background: #bfbfbf;
  color: #bfbfbf;
}

.btn.btn-next {
  background: #0a69ed;
  color: #fff;
  cursor: pointer;
}

/* Update countdown styles */
.countdown-message {
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(10, 105, 237, 0.7);
  animation: pulse 1s infinite;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 20px rgba(10, 105, 237, 0.3);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.hidden {
  display: none;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0a3967 0%, #0a69ed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0a69ed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
