import {useEffect} from "react";
// import {ReactP5Wrapper} from "react-p5-wrapper";

const ImageComponent = () => {
  let sketch = null

  useEffect(() => {
    const p5 = require("p5")

    /**
     * Random number
     * @param number
     */
    function random(number: number) {
      return Math.floor(Math.random() * number)
    }

    sketch = new p5((p: any) => {
      let points: any = [];
      let tickSpeed: number = 10;
      let base: number = 180;
      let numPoints: number = 10;
      let maxTicks: number = 1000;
      let ticks: number = 0;
      /**
       * width height image
       */
      let width: number = 300;
      let height: number = 240;
      let PI: number = 3.14159265358979323846;

      /**
       * Create poit Image
       * @param x
       * @param y
       * @param a
       * @constructor
       */
      const Point = (x = random(width), y = random(height), a = random(PI)) => {
        const hue = (random(100) + base) % 360

        return {
          x: x,
          y: y,
          a: a,
          dx: p.cos(a),
          dy: p.sin(a),
          hue: hue,
          color: p.color(hue, 100, 100, .01),
        }
      }

      /**
       * Update point image
       * @param point
       */
      const update = (point: any) => {
        point.x += point.dx;
        point.y += point.dy;
        if (point.x < 0 || point.x >= width) point.dx *= -1;
        if (point.y < 0 || point.y >= height) point.dy *= -1;
        p.stroke(point.color);
        p.line(point.x, point.y, point.neighbor.x, point.neighbor.y);
      }

      /**
       * Resize
       */
      function windowResized() {
        p.resizeCanvas(width, height);
        p.pixelDensity(1);
        p.clear();
        p.background(0);
        init();
      }

      let image: any = null

      /**
       * Setup
       */
      p.setup = () => {
        image = p.createCanvas();
        p.colorMode('hsb')
        windowResized();
        p.blendMode('lighter');
        p.strokeWeight(1.5);
        //Selector element
        // p.select('#imageGenerate #a')
        //hidden canvas
        // p.select('canvas').position(-1000, 30);
      }
      /**
       * Init
       */
      const init = () => {
        points = [];
        base = random(360);
        ticks = 0;

        for (var i = 0; i < numPoints; i++) {
          points.push(Point());
        }

        for (var i = 0; i < points.length; i++) {
          let j = i;
          while (j == i) j = p.floor(random(points.length));
          points[i].neighbor = points[j];
        }
      }

      /**
       * Draw image
       */
      p.draw = () => {
        if (ticks > maxTicks) return;
        for (var n = 0; n < tickSpeed; n++) {
          for (var i = 0; i < points.length; i++) {
            update(points[i]);
          }
          ticks++;
        }
      };

      /**
       * Bấn phím s để tạo ảnh dạng string
       */
      p.keyTyped = () => {
        if (p.key === 's') {
          console.log(image.canvas.toDataURL())
          console.log('image', image.canvas.toDataURL())
          // debugger;
          p.saveCanvas(image, 'myCanvas.jpg');
        }
      }
    })
  })

  return (
    <>
      <div>
        lorem
      </div>
      <div>
        <div id="imageGenerate">

        </div>
      </div>

      <div>
        boot
        <div id="a">

        </div>
      </div>
    </>
  )
}

export default ImageComponent
