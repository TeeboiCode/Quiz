import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StartQuiz from "../components/StartQuiz.vue";
import QuizCard from "../components/QuizCard.vue";
import UserInput from "../components/UserInput.vue";
import ApiRegisteredPlayersVue from "../components/API Display Components/Api-Registered-Players.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/startquiz",
    name: "startquiz",
    component: StartQuiz,
  },
  {
    path: "/quizcard",
    name: "quizcard",
    component: QuizCard,
  },
  {
    path: "/userinput",
    name: "userinput",
    component: UserInput,
  },
  {
    path: "/registeredplayersapi",
    name: "registeredplayersapi",
    component: ApiRegisteredPlayersVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
