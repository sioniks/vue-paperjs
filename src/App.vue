<template>
  <div id="app">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import SubmitModal from "./components/submitModal";

export default {
  name: "app",
  components: {
    // SubmitModal,
  },
  data: () => {
    return {};
  },
  computed: {
    openModal() {
      return this.$store.state.modal;
    }
  }
};
</script>

<style lang="scss">
</style>
