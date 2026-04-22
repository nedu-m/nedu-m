(function () {
  function hasClass(el, cls) {
    return el.className && new RegExp("(^|\\s)" + cls + "(\\s|$)").test(el.className);
  }

  function addClass(el, cls) {
    if (!hasClass(el, cls)) {
      el.className = el.className ? el.className + " " + cls : cls;
    }
  }

  function removeClass(el, cls) {
    if (!el.className) return;
    el.className = el.className.replace(new RegExp("(^|\\s)" + cls + "(\\s|$)", "g"), " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
  }

  function initNavigation() {
    var nav = document.querySelector(".nav");
    var toggle = document.querySelector(".nav__toggle");
    var links = document.querySelector(".nav__links");
    if (!nav || !toggle || !links) return;

    function closeNav() {
      removeClass(nav, "nav--open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function openNav() {
      addClass(nav, "nav--open");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      if (hasClass(nav, "nav--open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    var navLinks = links.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i += 1) {
      navLinks[i].addEventListener("click", closeNav);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.keyCode === 27) {
        closeNav();
      }
    });
  }

  function initLocalTime() {
    var localTime = document.getElementById("localTime");
    if (!localTime) return;

    function pad(value) {
      return value < 10 ? "0" + value : String(value);
    }

    function updateTime() {
      var now = new Date();
      var utc = now.getTime() + now.getTimezoneOffset() * 60000;
      var lagos = new Date(utc + 3600000);
      localTime.innerHTML = pad(lagos.getHours()) + ":" + pad(lagos.getMinutes()) + " WAT";
    }

    updateTime();
    setInterval(updateTime, 30000);
  }

  function initStatusLine() {
    var statusLine = document.getElementById("statusLine");
    if (!statusLine) return;

    var statuses = [
      "Shipping AI systems with production discipline",
      "Designing reliable infrastructure",
      "Turning rough ideas into durable software",
      "Refining agent behavior with evals",
      "Building products teams can operate"
    ];

    var currentIndex = 0;
    statusLine.innerHTML = statuses[currentIndex];

    setInterval(function () {
      currentIndex = (currentIndex + 1) % statuses.length;
      statusLine.innerHTML = statuses[currentIndex];
    }, 3600);
  }

  function init() {
    initNavigation();
    initLocalTime();
    initStatusLine();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
