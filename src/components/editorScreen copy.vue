<template>
  <div class>
    <canvas resize id="main-canvas"></canvas>
  </div>
</template>
<script>
// import Button from "./Buttons";
import paper, { Path, Point, Color } from "paper";
// let myPath = new paper.Path();
// let segment, path;
// let movePath = false;

export default {
  name: "editor",
  components: {
    // Button
  },
  data: () => {
    return {
      segment: "",
      path: {},
      movePath: false,
      values: {
        paths: 5,
        minPoints: 5,
        maxPoints: 15,
        minRadius: 30,
        maxRadius: 90
      },
      hitOptions: {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5
      }
    };
  },
  // created() {
  //   paper = paper;
  // },
  mounted() {
    //paper.install(this);
    paper.setup(document.getElementById("main-canvas"));
    // window.addEventListener("mousedown", this.onMouseDown);
    // window.addEventListener("mousemove", this.onMouseMove);
    // window.addEventListener("mousedrag", this.onMouseDrag);

    this.createPaths();
    this.createPoint();
    // paper.view.onMouseDown = () => {
    //   console.log("asasasasasas");
    // };
  },
  methods: {
    createPoint: function() {
      let path = new Path.Circle(new Point(80, this.dotPosition), 10);
      path.style = {
        fillColor: new Color(1, 0, 0),
        strokeColor: "black",
        strokeWidth: 5
      };
      this.dotPosition += 50;
    },

    createPaths: function() {
      let radiusDelta = this.values.maxRadius - this.values.minRadius;
      let pointsDelta = this.values.maxPoints - this.values.minPoints;
      for (let i = 0; i < this.values.paths; i++) {
        let radius = this.values.minRadius + Math.random() * radiusDelta;
        let points =
          this.values.minPoints + Math.floor(Math.random() * pointsDelta);
        console.log(paper.view.size);
        let path = this.createBlob(
          paper.view.size.multiply(Point.random()),
          radius,
          points
        );
        // let lightness = (Math.random() - 0.5) * 0.4 + 0.4;
        // let hue = Math.random() * 360;
        path.fillColor = new paper.Color(1, 0, 0);
        // path.fillColor = { hue: hue, saturation: 1, lightness: lightness };
        path.strokeColor = "black";
        path.onMouseDown = () => {
          console.log("path down");
          this.onMouseDown(path);
        };
        path.onMouseMove = () => {
          console.log("path move");
          this.onMouseMove(path);
        };
        path.onMouseDrag = () => {
          console.log("path drag");
          this.onMouseDrag(path);
        };
      }
    },

    createBlob: function(center, maxRadius, points) {
      let path = new Path();
      path.closed = true;
      for (let i = 0; i < points; i++) {
        // let delta = new Point({
        //   length: maxRadius * 0.5 + Math.random() * maxRadius * 0.5,
        //   angle: (360 / points) * i
        // });
        let delta = new Point({
          length: maxRadius * 0.5 + Math.random() * maxRadius * 0.5,
          angle: (360 / points) * i
        });
        path.add(center.add(delta));
      }
      path.smooth();

      return path;
    },
    onMouseDown: function(event) {
      this.segment = this.path = null;
      let hitResult = paper.project.hitTest(event.point, this.hitOptions);
      console.log(555);
      if (!hitResult) return;

      if (event.modifiers.shift) {
        if (hitResult.type == "segment") {
          hitResult.segment.remove();
        }
        return;
      }

      if (hitResult) {
        this.path = hitResult.item;
        if (hitResult.type == "segment") {
          this.segment = hitResult.segment;
        } else if (hitResult.type == "stroke") {
          let location = hitResult.location;
          this.segment = this.path.insert(location.index + 1, event.point);
          this.path.smooth();
        }
      }
      this.movePath = hitResult.type == "fill";
      if (this.movePath) paper.project.activeLayer.addChild(hitResult.item);
    },

    onMouseMove: function(event) {
      paper.project.activeLayer.selected = false;
      if (event.item) event.item.selected = true;
    },

    onMouseDrag: function(event) {
      if (this.segment) {
        this.segment.point += event.delta;
        this.path.smooth();
      } else if (this.path) {
        this.path.position += event.delta;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  background-color: #ccc;
}
</style>