const txts = document.querySelector(".animate-text").children,
  txtsLen = txts.length;
let index = 0;
const textInTimer = 3000,
  textOutTimer = 2800;

function animateText() {
  for (let i = 0; i < txtsLen; i++) {
    txts[i].classList.remove("text-in", "text-out");
  }
  txts[index].classList.add("text-in");

  setTimeout(function () {
    txts[index].classList.add("text-out");
  }, textOutTimer);

  setTimeout(function () {
    if (index == txtsLen - 1) {
      index = 0;
    } else {
      index++;
    }
    animateText();
  }, textInTimer);
}

window.onload = animateText;

document.addEventListener("DOMContentLoaded", function () {
  var loading = document.getElementById("loading");
  function hideLoadingOverlay() {
    loading.classList.add("hidden");
    setTimeout(function () {
      loading.remove();
    }, 500);
  }

  setTimeout(hideLoadingOverlay, 2000);

  var transitionLinks = document.querySelectorAll(".transition-link");
  transitionLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.body.style.transition =
        "background-color 0.1s ease, background-image 0.1s ease";
      document.body.style.backgroundColor = "#0b1215";
      document.body.style.backgroundImage = "none";
      document.body.style.opacity = "0";
      setTimeout(function () {
        window.location.href = link.href;
      }, 100);
    });
  });
});

$(document).ready(function () {
  if (window.location.hash) {
    window.location.hash = "";
  }

  $(window).on("beforeunload", function () {
    $(window).scrollTop(0);
  });

  $(window).scroll(function () {
    var scrollPos = $(document).scrollTop();
    var offset = 76;
    $("nav a").each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (
        refElement.position().top - offset < scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $("nav a").removeClass("active");
        currLink.addClass("active");
      }
    });
  });

  $(".our-btn").click(function (event) {
    event.preventDefault();
    var navbarHeight = $("nav").outerHeight();
    $("nav a").removeClass("active");
    $("nav a[href='#project']").addClass("active");
    $("html, body").animate(
      {
        scrollTop: $("#project").offset().top - navbarHeight,
      },
      1000
    );
  });

  $('a[href^="#"]').on("click", function (event) {
    $("nav a").removeClass("active");
    $(this).addClass("active");
    var target = $(this.getAttribute("href"));
    if (target.length) {
      event.preventDefault();
      var navbarHeight = $("nav").outerHeight();
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - navbarHeight,
          },
          1000
        );
    }
  });
});
