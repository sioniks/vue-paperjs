<template>
  <div class>
    <canvas resize id="main-canvas"></canvas>
  </div>
</template>
<script>
import paper, { Path, Point, Color, Segment } from "paper";

export default {
  name: "editor",
  components: {
    // Button
  },
  data: () => {
    return {
      paper: {},
      segment: {},
      path: {},
      movePath: false,
      hitOptions: {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5
      }
    };
  },

  mounted() {
    paper.setup(document.getElementById("main-canvas"));
    this.createCircle({ point: paper.view.center });

    // window.addEventListener("mousedown", event => {
    //   this.createCircle({ point: { x: event.clientX, y: event.clientY } });
    // });

    // paper.view.onMouseDown = event => {
    //   this.createCircle(event);
    // };

    paper.view.onMouseDown = event => {
      console.log("mouse down");
      // circleElem.selected = true;

      this.segment = this.path = null;
      let hitResult = paper.project.hitTest(event.point, this.hitOptions);
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

      if (!this.path) {
        this.createCircle(event);
      }
    };

    paper.view.onMouseMove = event => {
      console.log("mouse move");

      console.log(event.item);

      paper.project.activeLayer.selected = false;
      if (event.item) event.item.selected = true;
    };

    paper.view.onMouseDrag = event => {
      // console.log("mouse drag", this, this.path, this.segment, event);
      if (this.segment) {
        // console.log(this.segment.point, event.delta);
        this.segment.point = this.segment.point.add(event.delta);
        this.path.smooth();
      } else if (this.path) {
        // console.log(this.path.position, event.delta);
        this.path.position = this.path.position.add(event.delta);
      }
    };
  },
  methods: {
    createCircle: function(event) {
      let circleElem = new Path.Circle(new Point(event.point), 100);

      circleElem.style = {
        fillColor: new Color(1, 0, 0),
        strokeColor: "black",
        strokeWidth: 5
      };

      // circleElem.onMouseDown = event => {
      //   console.log("mouse down");
      //   // circleElem.selected = true;

      //   this.segment = this.path = null;
      //   let hitResult = paper.project.hitTest(event.point, this.hitOptions);
      //   if (!hitResult) return;

      //   if (event.modifiers.shift) {
      //     if (hitResult.type == "segment") {
      //       hitResult.segment.remove();
      //     }
      //     return;
      //   }

      //   if (hitResult) {
      //     this.path = hitResult.item;
      //     if (hitResult.type == "segment") {
      //       this.segment = hitResult.segment;
      //     } else if (hitResult.type == "stroke") {
      //       let location = hitResult.location;
      //       this.segment = this.path.insert(location.index + 1, event.point);
      //       this.path.smooth();
      //     }
      //   }
      //   this.movePath = hitResult.type == "fill";
      //   if (this.movePath) paper.project.activeLayer.addChild(hitResult.item);
      // };

      // circleElem.onMouseMove = event => {
      //   console.log("mouse move");

      //   console.log(circleElem);

      //   paper.project.activeLayer.selected = false;
      //   if (circleElem) circleElem.selected = true;
      // };

      // circleElem.onMouseDrag = event => {
      //   // console.log("mouse drag", this, this.path, this.segment, event);
      //   if (this.segment) {
      //     // console.log(this.segment.point, event.delta);
      //     this.segment.point = this.segment.point.add(event.delta);
      //     this.path.smooth();
      //   } else if (this.path) {
      //     // console.log(this.path.position, event.delta);
      //     this.path.position = this.path.position.add(event.delta);
      //   }
      // };
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  background-color: #ccc;
}
</style>