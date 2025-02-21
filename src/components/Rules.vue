<template>
  <div class="rules-container">
    <div class="quiz-rules hidden" id="quiz_rules">
      <div class="card-top">
        <h2 class="heading">Some Rules of this Quiz</h2>
        <span class="hr-top"><hr /></span>
      </div>
      <div class="card-body">
        <ol type="1">
          <li>
            You will have only <span class="sec">30 seconds</span> per each
            question.
          </li>
          <li>Once you select your answer, it can't be undone.</li>
          <li>You can't select any option ance time goes off.</li>
          <li>You can't exit from the Quiz while you're playing.</li>
          <li>You'll get points on the basis of your correct answers.</li>
        </ol>
      </div>
      <div class="btn-group">
        <button class="btn btn-exit" id="exitBtn">Exit</button>
        <button class="btn btn-continue" id="continueBtn" @click="$router.push('/quizcard')">Quiz Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "RulesVue",
  methods: {
    handleExit() {
      Swal.fire({
        title: "Are you sure you want to exit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0a69ed",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        customClass: {
          popup: "swal-custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/");
        }
      });
    },
  },
  mounted() {
    document
      .getElementById("exitBtn")
      .addEventListener("click", this.handleExit);
  },
  beforeUnmount() {
    document
      .getElementById("exitBtn")
      .removeEventListener("click", this.handleExit);
  },
};
</script>

<style scoped>
/* quiz-rules */

.quiz-rules {
  background: #fff;
  width: 80%;
  /* height: 80%; */
  max-width: 600px;
  margin: 0 auto;
  padding: 1.2em 0;
  position: absolute;
  top: 25%;
  left: 28.5%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  overflow: hidden;
  animation: containerFloat 3s ease-in-out infinite;
  backdrop-filter: blur(10px);
  transition: all 4s ease;
}

@keyframes containerFloat {
  0%,
  100% {
    transform: translateY(0) rotateX(1deg);
  }
  50% {
    transform: translateY(-20px) rotateX(-3deg);
  }
}

.quiz-rules .card-top {
  position: relative;
}
.quiz-rules .card-top .heading {
  font-size: 16px;
  margin: 0;
  padding: 10px 15px;
  /* margin-left: -15px; */
  position: relative;
}

/* .hr-top {
  width: 800px;
  position: absolute;
  right: -50px;
  margin-top: 10px;
  background: #bfbfbf;
} */

.quiz-rules ol {
  margin-top: 30px;
}
.quiz-rules ol li {
  font-size: 11px;
  font-weight: 600;
  padding: 0 0 15px 0;
  text-align: justify;
}

.btn-group {
  position: relative;
  margin-top: 30px;
  display: flex;
  justify-content: end;
  gap: 15px;
  padding-right: 30px;
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

.sec {
  color: #0a69ed;
}

.btn.btn-exit {
  border: 1px solid #0a69ed;
  color: #0a69ed;
}

.btn.btn-next,
.btn.btn-continue {
  background: #0a69ed;
  color: #fff;
  cursor: pointer;
}

.btn:hover {
  background: #0a69ed;
  color: #fff;
}

.hr-down {
  width: 800px;
  position: absolute;
  right: -50px;
  background: #bfbfbf;
  margin-top: -20px;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 321px) {
  .quiz-rules ol li {
    font-size: 13px;
  }
}

@media (min-width: 410px) {
  .quiz-rules ol li {
    font-size: 15px;
  }
  .quiz-rules .card-top .heading {
    font-size: 20px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 576px) {
  .quiz-rules .card-top .heading {
    font-size: 24px;
  }
}

/* SweetAlert custom styling */
:global(.swal-custom-popup) {
  font-family: your-google-font-name, sans-serif; /* Replace 'your-google-font-name' with your actual Google Font name */
}
</style>
