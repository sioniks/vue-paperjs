<template>
  <div class>
    <button @click="createPoint">click</button>
    <canvas resize id="main-canvas"></canvas>
  </div>
</template>
<script>
// import Button from "./Buttons";
import paper from "paper";
export default {
  name: "editor",
  components: {
    // Button
  },
  data: () => {
    return {
      path: {},
      dotPosition: 50
    };
  },
  mounted() {
    paper.install(window);
    paper.setup(document.getElementById("main-canvas"));
    window.addEventListener("mousedown", this.onMouseMove);
  },
  methods: {
    createPoint: function() {
      this.path = new paper.Path.Circle(
        new paper.Point(80, this.dotPosition),
        10
      );
      this.path.style = {
        fillColor: new paper.Color(1, 0, 0),
        strokeColor: "black",
        strokeWidth: 5
      };
      this.dotPosition += 50;
    },

    onMouseMove: function(event) {
      console.log(event.point);
      this.path.position = event.point;
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  background-color: #ccc;
}
</style>