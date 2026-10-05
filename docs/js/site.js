// Supercapote.com — navigation mobile et visionneuse (jeux / BDs)

(function () {
  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Visionneuse
  var viewer = document.getElementById("viewer");
  if (!viewer) return;

  var title = viewer.querySelector(".viewer-bar h2");
  var content = viewer.querySelector(".viewer-content");

  function openViewer(label, node) {
    title.textContent = label;
    content.replaceChildren(node);
    viewer.showModal();
  }

  viewer.addEventListener("close", function () {
    // Vide le contenu pour stopper le jeu en cours
    content.replaceChildren();
  });

  viewer.querySelector("[data-close]").addEventListener("click", function () {
    viewer.close();
  });

  // Fermeture au clic sur le fond
  viewer.addEventListener("click", function (event) {
    if (event.target === viewer) viewer.close();
  });

  document.querySelectorAll("[data-game]").forEach(function (button) {
    button.addEventListener("click", function () {
      var frame = document.createElement("iframe");
      frame.src = "data/games/" + button.dataset.game;
      frame.width = button.dataset.width;
      frame.height = button.dataset.height;
      frame.title = button.dataset.title;
      openViewer(button.dataset.title, frame);
      frame.addEventListener("load", function () {
        frame.focus();
      });
    });
  });

  document.querySelectorAll("[data-comic]").forEach(function (button) {
    button.addEventListener("click", function () {
      var img = document.createElement("img");
      img.src = button.dataset.comic;
      img.alt = button.dataset.title;
      openViewer(button.dataset.title, img);
    });
  });
})();
