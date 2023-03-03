class Util {
  forEach(elements, handler) {
    elements = elements || [];
    for (let i = 0; i < elements.length; i++) {
      handler(elements[i]);
    }
  }

  getScrollTop() {
    return (document.documentElement ?? document.body).scrollTop;
  }

  isMobile() {
    return window.matchMedia('only screen and (max-width: 680px)').matches;
  }

  isTocStatic() {
    return window.matchMedia('only screen and (max-width: 960px)').matches;
  }

  /**
   * add animate to element
   * @param {Element} element animate element
   * @param {String|Array<String>} animation animation name
   * @param {Boolean} reserved reserved animation
   * @param {Function} callback remove callback
   */
  animateCSS(element, animation, reserved, callback) {
    !Array.isArray(animation) && (animation = [animation]);
    element.classList.add('animate__animated', ...animation);
    element.addEventListener('animationend', () => {
      !reserved && element.classList.remove('animate__animated', ...animation);
      typeof callback === 'function' && callback();
    }, { once: true });
  }

  /**
   * date validator
   * @param {*} date may be date or not
   * @returns {Boolean}
   */
  isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
  /**
   * scroll some element into view
   * @param {String} selector element to scroll
   */
  scrollIntoView(selector) {
    const element = selector.startsWith('#')
      ? document.getElementById(selector.slice(1))
      : document.querySelector(selector);
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

class Theme {
  constructor() {
    this.util = new Util();
  }
  initDetails() {
    this.util.forEach(
      document.getElementsByClassName("details"),
      ($details) => {
        const $summary = $details.querySelector(".details-summary");
        $summary.addEventListener(
          "click",
          () => {
            $details.classList.toggle("open");
          },
          false
        );
      }
    );
  }

  onScroll() {
    const $headers = [];
    const ACCURACY = 20;
    const $fixedButtons = document.querySelector(".fixed-buttons");
    const $backToTop = document.querySelector(".back-to-top");
    const $readingProgressBar = document.querySelector(".reading-progress-bar");
    if (document.body.dataset.headerDesktop === "auto") {
      $headers.push(document.getElementById("header-desktop"));
    }
    if (document.body.dataset.headerMobile === "auto") {
      $headers.push(document.getElementById("header-mobile"));
    }
    // b2t button click event
    $backToTop?.addEventListener("click", () => {
      this.util.scrollIntoView("body");
    });
    window.addEventListener(
      "scroll",
      (event) => {
        if (this.disableScrollEvent) {
          event.preventDefault();
          return;
        }
        const $mask = document.getElementById("mask");
        this.newScrollTop = this.util.getScrollTop();
        const scroll = this.newScrollTop - this.oldScrollTop;
        // header animation
        this.util.forEach($headers, ($header) => {
          if (scroll > ACCURACY) {
            $header.classList.remove("animate__fadeInDown");
            this.util.animateCSS($header, ["animate__fadeOutUp"], true);
            $mask.click();
          } else if (scroll < -ACCURACY) {
            $header.classList.remove("animate__fadeOutUp");
            this.util.animateCSS($header, ["animate__fadeInDown"], true);
            $mask.click();
          }
        });
        const contentHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.max(
          Math.min((100 * Math.max(this.newScrollTop, 0)) / contentHeight, 100),
          0
        );
        if ($readingProgressBar) {
          $readingProgressBar.style.setProperty(
            "--progress",
            `${scrollPercent.toFixed(2)}%`
          );
        }
        // whether to show fixed buttons
        if ($fixedButtons) {
          if (scrollPercent > 1) {
            $fixedButtons.classList.remove("d-none", "animate__fadeOut");
            this.util.animateCSS($fixedButtons, ["animate__fadeIn"], true);
          } else {
            $fixedButtons.classList.remove("animate__fadeIn");
            this.util.animateCSS(
              $fixedButtons,
              ["animate__fadeOut"],
              true,
              () => {
                $fixedButtons.classList.contains("animate__fadeOut") &&
                  $fixedButtons.classList.add("d-none");
              }
            );
          }
          if ($backToTop) {
            $backToTop.querySelector("span").innerText = `${Math.round(
              scrollPercent
            )}%`;
          }
        }
        for (let event of this.scrollEventSet) {
          event();
        }
        this.oldScrollTop = this.newScrollTop;
      },
      false
    );
  }

  onResize() {
    let resizeBefore = this.util.isMobile();
    window.addEventListener(
      "resize",
      () => {
        if (!this._resizeTimeout) {
          this._resizeTimeout = window.setTimeout(() => {
            this._resizeTimeout = null;
            for (let event of this.resizeEventSet) {
              event();
            }
            this.initToc();
            this.initMermaid();
            this.initSearch();

            const isMobile = this.util.isMobile();
            if (isMobile !== resizeBefore) {
              document.getElementById("mask").click();
              resizeBefore = isMobile;
            }
          }, 100);
        }
      },
      false
    );
  }

  onClickMask() {
    document.getElementById("mask").addEventListener(
      "click",
      () => {
        if (!document.body.classList.contains("blur")) {
          return;
        }
        for (let event of this.clickMaskEventSet) {
          event();
        }
        this.disableScrollEvent = false;
        document.body.classList.remove("blur");
      },
      false
    );
  }

  init() {
    this.initDetails();

    window.setTimeout(() => {
      this.onScroll();
      this.onResize();
      this.onClickMask();
    }, 100);
  }
}

const themeInit = () => {
  window.theme = new Theme();
  window.theme.init();
};

if (document.readyState !== "loading") {
  themeInit();
} else {
  document.addEventListener("DOMContentLoaded", themeInit, false);
}
