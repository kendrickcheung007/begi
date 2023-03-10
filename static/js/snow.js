(function () {
  const Config = {
    snow: ["â", "ð¥", "ð", "ð", "ð¥¦", "ð"], // éªè±çæ ·å¼ï¼å¯ä»¥æ¾ä¸åçéªè±ï¼æèä»»ä½ emojiï¼æ¯æ¬¡çææ°éªè±æ¶ä¼éæºæéå¶ä¸­ä¸ä¸ª
    color: "#d9e2e7", // éªçé¢è²
    speed: 10, // éªè±ä»çæå°è½å°æåºç«¯æç»åçæ¶é´ï¼åä½æ¯ç§ãæ°å­è¶å°è½å¾è¶å¿«
    dom: document.getElementsByTagName("body")[0], // ä¸éªçåºåï¼å¯ä»¥ä¿æä¸åï¼è¿æ ·å°±æ¯å¨å±ä¸éª
    interval: 800, // çæä¸çéªè±çæ¶é´é´éï¼åä½æ¯æ¯«ç§
  };
  if (!Config.dom) {
    throw Error("éè¯¯æç¤º");
  }
  const $canvas = document.createElement("div");

  useStyle($canvas, {
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 100,
  });

  setInterval(() => {
    const $snow = document.createElement("div");
    $snow.innerText = Config.snow[rand(0, Config.snow.length - 1)];
    useStyle($snow, {
      display: "inline-block",
      color: Config.color,
      fontSize: rand(14, 25) + "px",
      position: "absolute",
      top: 0,
      left: rand(0, 100) + "%",
      transition:
        "transform " +
        Config.speed +
        "s linear" +
        ",opacity " +
        Config.speed +
        "s linear",
      transform: "translateY(-100%)",
      opacity: Math.random() + 0.3,
    });
    setTimeout(() => {
      useStyle($snow, {
        transform:
          "translate(0, " +
          getComputedStyle($canvas).height +
          ") rotate(480deg)",
        opacity: 0,
      });
      $snow.addEventListener("transitionend", () => {
        $snow.remove();
      });
    }, 100);
    $canvas.appendChild($snow);
  }, Config.interval);

  function rand(from, to) {
    return from + Math.floor(Math.random() * (to - from + 1));
  }
  function useStyle(dom, style) {
    for (let sKey in style) {
      dom.style[sKey] = style[sKey];
    }
  }

  Config.dom.appendChild($canvas);
})();
