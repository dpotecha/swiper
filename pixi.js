const slides = [...document.querySelectorAll(".canvas")];
let apps = [];
let landScapes = [];
let displacementSprites = [];
let displacementFilters = [];
let isAnimated = false;
let isUp = false;
let isDown = false;

slides.forEach((slide, index) => {
  let app = new PIXI.Application({
    view: document.querySelector(`#slide${index + 1}`),
  });

  apps.push(app);

  app.stage.interactive = true;

  let container = new PIXI.Container();
  app.stage.addChild(container);

  let landScape = PIXI.Sprite.from(`img/${index + 1}.jpg`);
  landScapes.push(landScape);
  landScape.width = app.view.width;
  landScape.height = app.view.height;
  app.stage.addChild(landScape);
});

let test = document.querySelector(".swiper-wrapper");

test.onmousedown = () => {
  isUp = false;
  isDown = true;
  if (!isAnimated) {
    apps.forEach((app, index) => {
      let landScape = landScapes[index];

      let displacementSprite = PIXI.Sprite.from("img/water.jpg");
      displacementSprites.push(displacementSprite);
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
      let displacementFilter = new PIXI.filters.DisplacementFilter(
        displacementSprite
      );
      displacementFilters.push(displacementFilter);
      displacementFilter.padding = 10;

      displacementSprite.width = landScape.width;
      displacementSprite.height = landScape.height;
      displacementSprite.position = landScape.position;

      app.stage.addChild(displacementSprite);

      landScape.filters = [displacementFilter];

      let elapsed = 0;
      let animationAmplitude = 300.0;
      app.ticker.add((delta) => {
        // console.log(displacementFilter.scale.x);
        displacementSprite.y++;
        if (!isUp) {
          elapsed += delta;
        } else {
          elapsed -= delta;
        }
        displacementFilter.scale.x =
          0.0 + Math.sin(elapsed / animationAmplitude) * 50.0;
        displacementFilter.scale.y =
          0.0 + Math.sin(elapsed / animationAmplitude) * 20.0;
        if (displacementSprite.y > displacementSprite.height) {
          displacementSprite.y = 0;
        }
      });
    });
    isAnimated = true;
  } else {
    apps.forEach((app) => {
      app.ticker.start();
    });
  }
};

window.onmouseup = () => {
  console.log("up");
  apps.forEach((app, index) => {
    let displacementFilter = displacementFilters[index];
    isUp = true;
    isDown = false;

    app.ticker.add(() => {
      if (displacementFilter.scale.x < 1 && !isDown) {
        app.ticker.stop();
      }
    });
  });
};
