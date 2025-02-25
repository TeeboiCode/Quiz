<template>
  <div class="registerPlayer-container">
    <div
      class="users-container hidden"
      id="usersContainer"
      data-aos="fade-right"
    >
      <h1 v-if="!showResults">
        Registered Players (<span id="count">{{ players.length }}</span
        >)
      </h1>
      <h1 v-if="showResults">
        Quiz Results (<span id="count">{{ quizResults.length }}</span
        >)
      </h1>
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th v-if="!showResults">Rank</th>
              <th>Name</th>
              <th v-if="!showResults">Time</th>
              <th v-if="showResults">Score</th>
              <th v-if="showResults">Percentage</th>
              <th v-if="showResults">Date</th>
              <th v-if="showResults">Time</th>
            </tr>
          </thead>
          <tbody id="usersBody">
            <tr
              v-for="(player, index) in showResults ? quizResults : players"
              :key="index"
              :class="{ 'animate-left': isAnimating }"
            >
              <td v-if="!showResults">{{ index + 1 }}</td>
              <td>{{ player.full_name }}</td>
              <td v-if="!showResults">
                {{ formatTimeTime(player.created_at) }}
              </td>
              <td v-if="showResults">{{ player.score }}</td>
              <td v-if="showResults">{{ player.percentage }}%</td>
              <td v-if="showResults">{{ formatDate(player.created_at) }}</td>
              <td v-if="showResults">{{ formatTime(player.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button class="btn" @click="toggleResults">
        {{ showResults ? "Registered Players" : "Quiz Results" }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ApiRegisteredPlayersVue",
  data() {
    return {
      players: [],
      quizResults: [],
      showResults: false,
      isAnimating: false,
    };
  },
  mounted() {
    this.fetchPlayers();
  },
  methods: {
    async fetchPlayers() {
      try {
        const response = await axios.get(
          "https://task.fashion-life-agency.com/create-quiz.php"
        );
        this.players = response.data.data;
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    },
    async fetchQuizResults() {
      try {
        const response = await axios.get(
          "https://task.fashion-life-agency.com/get-score.php"
        );
        this.quizResults = response.data.data;
        console.log(this.quizResults);
      } catch (error) {
        console.error("Error fetching quiz results:", error);
      }
    },
    toggleResults() {
      this.isAnimating = true;
      setTimeout(() => {
        this.showResults = !this.showResults;
        if (this.showResults) {
          this.fetchQuizResults();
        }
        this.isAnimating = false;
      }, 300);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    formatTime(timeString) {
      const date = new Date(timeString);
      return date.toLocaleTimeString();
    },
    formatTimeTime(timetimeString) {
      const date = new Date(timetimeString);
      return date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

.registerPlayer-container {
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

.registerPlayer-container::-webkit-scrollbar {
  display: none;
}

.users-container {
  width: 90%;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(10, 105, 237, 0.3);
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(8, 81, 188, 0.2), 0 0 60px rgba(8, 81, 188, 0.1);
  animation: containerFloat 3s ease-in-out infinite;
  backdrop-filter: blur(10px);
  transition: all 4s ease;
  padding: 1.5rem;
  transition: transform 0.3s ease; /* Animation for moving left */
}

.users-container {
  max-width: 840px;
}

@keyframes containerFloat {
  0%,
  100% {
    transform: translateY(0) rotateX(1deg);
  }
  50% {
    transform: translateY(-10px) rotateX(-1deg);
  }
}

h1 {
  color: #0a3967;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(8, 81, 188, 0.1);
  position: relative;
}

h1::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #0a69ed, transparent);
}

.results-table,
.users-table {
  height: 365px;
  overflow-y: auto;
  border-radius: 12px;
  border: 1px solid rgba(10, 105, 237, 0.2);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px rgba(8, 81, 188, 0.1);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

thead {
  background: linear-gradient(90deg, #0851bc, #0a69ed);
  color: white;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
}

thead tr th:first-child {
  border-top-left-radius: 12px;
}

thead tr th:last-child {
  border-top-right-radius: 12px;
}

th,
td {
  padding: 1rem 1.5rem;
  text-align: left;
}

th {
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

td {
  border-bottom: 1px solid rgba(10, 105, 237, 0.1);
  color: #2c3e50;
  font-size: 1.2rem;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: all 0.3s ease;
  position: relative;
}

tbody tr:hover {
  background: linear-gradient(
    90deg,
    rgba(10, 105, 237, 0.05),
    rgba(10, 105, 237, 0.02)
  );
  transform: translateY(-2px) scale(1.005);
  /* box-shadow: 0 4px 20px rgba(8, 81, 188, 0.1); */
  box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 57px -58px inset;
}

.btn {
  background: linear-gradient(45deg, #0851bc, #0a69ed);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: block;
  margin: 1rem auto 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(8, 81, 188, 0.2), 0 0 20px rgba(8, 81, 188, 0.1);
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(8, 81, 188, 0.25), 0 0 30px rgba(8, 81, 188, 0.15);
}

.btn:hover::before {
  animation: shine 1.5s infinite;
}

@keyframes shine {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
  }
}

.btn:active {
  transform: translateY(0);
}

.animate-left {
  transform: translateX(-20px); /* Move left during animation */
}

@media (max-width: 600px) {
  .users-container {
    padding: 1.5rem;
    width: 95%;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  th,
  td {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
