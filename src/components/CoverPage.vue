<template>
  <div>
    <div class="container">
      <div class="overlay"></div>
      <div class="brand">
        <img
          class="animate__animated animate__fadeInDown"
          src="../assets/download.png"
          alt=""
        />
      </div>

      <h1 class="heading animate__animated animate__flipInX">HTML</h1>
      <div class="btn">
        <button id="startBtn" @click="$router.push('/userinput')">
          Start Quiz
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoverPageVue",
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.container .overlay {
  position: absolute;
  width: 100%;
  height: 170vh;
  transform: translateY(-100px);
  background: url(https://web.tta.ng/assets/autotype_bg-RxJuyHws.svg);
  background-color: #f1f4fc;
  background-position-x: 0px;
  background-position-y: 0;
  background-size: 100%;
  background-repeat: repeat-y;
  z-index: -3;
}

.brand {
  margin-bottom: 2rem;
}

.heading {
  font-size: clamp(4em, 2.2em, 8vw);
  font-weight: 800;
  color: #171754;
  margin-top: 0px;
  text-align: center;
}

.btn button {
  padding: 12px 35px;
  border-radius: 30px;
  text-decoration: none;
  outline: none;
  border: none;
  color: #fff;
  background: #4242ab;
  font-size: 1.3em;
  font-weight: 700;
  transition: 0.3s ease;
  margin-top: 20px;
  cursor: pointer;
}

.btn button:hover {
  background: #171754;
}
</style>
