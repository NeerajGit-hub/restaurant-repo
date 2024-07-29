$(document).ready(function () {
  // Header fixed on scroll
  $(window).on("scroll", function () {
    var headerBottom = $(".header-bottom");
    if ($(this).scrollTop() > 0) {
      headerBottom.addClass("fixed-top");
    } else {
      headerBottom.removeClass("fixed-top");
    }
  });

  // home vedio play.
  $("#playButtonContainer").click(function () {
    $("#video").attr(
      "src",
      "https://www.youtube.com/embed/vYjrGxlKjYo?autoplay=1"
    );
    $("#videoSection").removeClass("d-none");
    console.log("button is clicked");
  });

  $("#closeVideo").click(function () {
    $("#videoSection").addClass("d-none");
    $("#video").attr("src", "");
  });

  // secton scroll accrding to menu click.
  const sections = $("section");
  const navLinks = $(".navbar-nav .nav-link");

  $(window).on("scroll", function () {
    let current = "";

    sections.each(function () {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();

      if (
        $(window).scrollTop() >= sectionTop - sectionHeight / 3 &&
        $(window).scrollTop() < sectionTop + sectionHeight
      ) {
        current = $(this).attr("id");
      }
    });

    navLinks.removeClass("accent-color");
    navLinks.each(function () {
      if ($(this).attr("href").includes(current)) {
        $(this).addClass("accent-color");
      }
    });
  });

  navLinks.on("click", function () {
    navLinks.removeClass("accent-color");
    $(this).addClass("accent-color");
  });

  // menu section food item filter.
  $(".food-item").show();
  $("ul.d-flex li.cursor-pointer").click(function () {
    var filter = $(this).data("filter");

    if (filter === "all") {
      $(".food-item").show();
    } else {
      $(".food-item").each(function () {
        var category = $(this).data("category");
        if (category === filter) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }

    $("ul.d-flex li.cursor-pointer").removeClass("accent-color");
    $(this).addClass("accent-color");
  });

  // special section.
  $("#special .col-lg-3 ul li").click(function () {
    $("#special .col-lg-3 ul li").removeClass("accent-bg-color");
    $("#special .special .row-item").removeClass("active");

    $(this).addClass("accent-bg-color");
    var index = $(this).index();
    $("#special .special .row-item").eq(index).addClass("active");
  });

  // gallery section slider code.
  var $modal = $("#imageModal");
  var $carouselInner = $("#customSlider .carousel-inner");
  var currentIndex;

  function populateCarousel(selectedIndex) {
    $carouselInner.empty();
    var items = "";

    $(".gallery .item").each(function (index) {
      var imgSrc = $(this).find("img").data("image");
      var isActive = index === selectedIndex ? "active" : "";
      items += `<div class="carousel-item ${isActive}">
                            <img src="${imgSrc}" class="d-block w-100" alt="Image ${index + 1 }">
                 </div>`;
    });
    $carouselInner.html(items);
  }

  function showSlide(index) {
    var slides = $carouselInner.find(".carousel-item");
    if (index >= slides.length) {
      index = 0;
    } else if (index < 0) {
      index = slides.length - 1;
    }
    slides.removeClass("active");
    slides.eq(index).addClass("active");
    currentIndex = index;
  }

  $(".gallery .item img").on("click", function () {
    var selectedIndex = $(this).closest(".item").index();
    populateCarousel(selectedIndex);
    currentIndex = selectedIndex;
    $modal.modal("show");
  });

  $("#prevSlide").on("click", function () {
    showSlide(currentIndex - 1);
  });

  $("#nextSlide").on("click", function () {
    showSlide(currentIndex + 1);
  });

  $modal.on("shown.bs.modal", function () {
    showSlide(currentIndex);
  });

  // window scroll button.

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#scrollToTopBtn").fadeIn();
    } else {
      $("#scrollToTopBtn").fadeOut();
    }
  });

  $("#scrollToTopBtn").click(function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling without explicit timing
    $(this).fadeOut(); // Hide the button after clicking
  });
});




