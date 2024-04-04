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

  /*$(window).on("beforeunload", function () {
    $(window).scrollTop(0);
  });*/

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

// Ambil semua elemen tombol dengan kelas 'btnWhatsapp'
var buttons = document.querySelectorAll(".btnWhatsapp");

// Iterasi setiap tombol untuk menambahkan event listener
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Dapatkan informasi produk dari atribut kustom
    var namaBarang = this.getAttribute("data-nama-barang");
    var harga = this.getAttribute("data-harga");
    var warna = this.getAttribute("data-warna");
    var ukuran = this.getAttribute("data-ukuran");

    // Format pesan sesuai dengan template yang diinginkan
    var pesan = encodeURIComponent(
      "Halo Kaks, saya ingin bertanya tentang produk : *" +
        namaBarang +
        "*\n\n" +
        "Prices\t: *" +
        harga +
        "*\n" +
        "Color\t: *" +
        warna +
        "*\n" +
        "Size\t: *" +
        ukuran +
        "*\n\n" +
        "Apakah Stocknya masih tersedia?\n" +
        "Terimakasih *:)*"
    );

    var nomorTujuan = "6281265365562"; // Ganti dengan nomor WhatsApp tujuan

    // Buat URL dengan nomor tujuan dan pesan
    var url = "https://wa.me/" + nomorTujuan + "?text=" + pesan;

    // Buka URL di jendela baru
    window.open(url, "_blank");
  });
});
