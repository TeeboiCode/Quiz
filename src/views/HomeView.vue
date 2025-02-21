<template>
  <div class="home">
    <CoverPageVue />
  </div>
</template>

<script>
import CoverPageVue from "@/components/CoverPage.vue";
// @ is an alias to /src
export default {
  name: "HomeView",
  components: {
    CoverPageVue,
  },
};
</script>
