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
      document.body.style.transition = 'background-color 0.1s ease, background-image 0.1s ease';
      document.body.style.backgroundColor = '#0b1215';
      document.body.style.backgroundImage = 'none';
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
    $("nav a[href='#product']").addClass("active");
    $("html, body").animate(
      {
        scrollTop: $("#product").offset().top - navbarHeight,
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

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

fullName.addEventListener("input", checkInputs);
email.addEventListener("input", checkInputs);
message.addEventListener("input", checkInputs);

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Message: ${message.value}`;

  Email.send({
    SecureToken: "c1070c6f-8b82-4f21-baa9-a71913027bbd",
    Username: "duha12marlo@gmail.com",
    Password: "C2EE7BF5609B61F862C50B7C2C54D8D774DB",
    To: "duha12marlo@gmail.com",
    From: email.value,
    Subject: "Costumer Message",
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    } else {
      item.classList.remove("error");
      item.parentElement.classList.remove("error");
    }
  }

  if (email.value != "") {
    checkEmail();
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});
