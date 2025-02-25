<template>
  <div class="user-input-container">
    <div class="name-container" id="nameContainer">
      <form class="player-form" id="playerForm" @submit="submitName">
        <h2>Enter Your Full Name</h2>
        <input
          type="text"
          id="playerName"
          v-model="playerName"
          placeholder="Your Full Name"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "UserInputVue",
  data() {
    return {
      playerName: "",
    };
  },
  // mounted() {
  //   // Check if the player name is already saved in local storage
  //   const savedName = localStorage.getItem("playerName");
  //   if (savedName) {
  //     this.playerName = savedName; // Set the playerName to the saved name
  //     // Optionally, you can redirect to the quiz or show a message
  //     this.$router.push("/startquiz"); // Redirect to the quiz if name exists
  //   }
  // },
  methods: {
    async submitName(e) {
      e.preventDefault();
      try {
        // Save to localStorage
        localStorage.setItem("playerName", this.playerName);

        // Prepare data to send to the server
        // const userData = {
        //   full_name: this.playerName,
        //   // time: new Date().toLocaleTimeString(), // Save the current time
        // };

        // Save to the server
        await axios.post(
          "https://task.fashion-life-agency.com/create-quiz.php",
          {
            full_name: this.playerName,
          }
        );

        // Show success message with custom styling
        await Swal.fire({
          icon: "success",
          title: `Welcome ${this.playerName}!`,
          text: "Click Start Quiz when you're ready to begin.",
          confirmButtonText: "OK",
          confirmButtonColor: "#0a69ed",
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
            confirmButton: "swal-button",
            content: "swal-content",
          },
        });

        // Redirect to HomeView
        this.$router.push("/startquiz");

        this.playerName = ""; // Clear the input field after submission
      } catch (error) {
        // Show error message with custom styling
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `There was an error saving your name: ${error.message}. Please try again.`,
          confirmButtonColor: "#0a69ed",
          customClass: {
            title: "swal-title",
            popup: "swal-popup",
            confirmButton: "swal-button",
            content: "swal-content",
          },
        });
        console.error("Error saving name:", error);
      }
    },
  },
};
</script>

<style scoped>
.user-input-container {
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

.name-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #fff; */
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1.2em 2.4em;
  position: absolute;
  border-radius: 10px;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px; */
  overflow: hidden;
  box-shadow: 0 0 30px rgba(8, 81, 188, 0.2), 0 0 60px rgba(8, 81, 188, 0.1);
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

.player-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
  animation: fadeIn 0.5s ease-in;
}

.player-form h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
}

.player-form input {
  width: 90%;
  padding: 12px 15px;
  margin-bottom: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  outline: none;
}

.player-form input:focus {
  border-color: #0a69ed;
}

.player-form button {
  background: #0a69ed;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
  font-weight: 500;
}

.player-form button:hover {
  background: #0851bc;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .player-form {
    margin: 0 1rem;
    padding: 1.5rem;
  }

  .player-form h2 {
    font-size: 1.5rem;
  }
}

/* Add these styles at the end of your style section */
:global(.swal-popup) {
  font-family: "Arial", sans-serif; /* Change to your preferred font */
}

:global(.swal-title) {
  font-family: "Arial", sans-serif;
  font-size: 24px !important;
  font-weight: 600 !important;
}

:global(.swal-content) {
  font-family: "Arial", sans-serif;
  font-size: 16px !important;
}

:global(.swal-button) {
  font-family: "Arial", sans-serif;
  font-weight: 500 !important;
}
</style>
