$(document).ready(function () {
  // Toggle toolbar visibility
  // Default is hidden
  $(".toolbar").hide();
  $("#toolbar-toggle").click(function () {
    $(".toolbar").toggle();
  });

  // Variables globales
  var currentIndex = 0;
  var items = $(".slider-item");
  var isAutoScrollEnabled = false;
  var autoScrollInterval;

  // Fonction pour afficher l'élément courant
  function showCurrent() {
    items.hide();
    var currentItem = items.eq(currentIndex);
    currentItem.show().addClass("rotate-anticlockwise");
  }

  // Gestionnaire d'événement pour le bouton "Next"
  $("#slider-next").click(function () {
    if (!isAutoScrollEnabled) {
      currentIndex = (currentIndex + 1) % items.length;
      showCurrent();
    }
  });

  // Gestionnaire d'événement pour le bouton "Previous"
  $("#slider-previous").click(function () {
    if (!isAutoScrollEnabled) {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showCurrent();
    }
  });

  // Gestionnaire d'événement pour le bouton "Random"
  $("#slider-random").click(function () {
    if (!isAutoScrollEnabled) {
      var randomIndex = Math.floor(Math.random() * items.length);
      currentIndex = randomIndex;
      showCurrent();
    }
  });

  // Gestionnaire d'événement pour le bouton "Toggle"
  $("#slider-toggle").click(function () {
    isAutoScrollEnabled = !isAutoScrollEnabled;

    if (isAutoScrollEnabled) {
      autoScrollInterval = setInterval(function () {
        currentIndex = (currentIndex + 1) % items.length;
        showCurrent();
      }, 3000);
    } else {
      clearInterval(autoScrollInterval);
    }
  });

    // Gestionnaire d'événement pour les flèches du clavier
    $(document).keydown(function (e) {
      if (!isAutoScrollEnabled) {
        if (e.which === 37) {
          // Flèche gauche pour "Previous"
          currentIndex = (currentIndex - 1 + items.length) % items.length;
          showCurrent();
        } else if (e.which === 39) {
          // Flèche droite pour "Next"
          currentIndex = (currentIndex + 1) % items.length;
          showCurrent();
        } else if (e.which === 82) {
          // Touche 'R' pour "Random"
          var randomIndex = Math.floor(Math.random() * items.length);
          currentIndex = randomIndex;
          showCurrent();
        }
      }
    });

  // Afficher la première image au chargement de la page
  showCurrent();
});
