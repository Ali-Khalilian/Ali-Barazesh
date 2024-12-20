$(window).on("load", function () {
  $("#status").fadeOut();
  $("#preloader").delay(350).fadeOut("slow");
});

$(document).ready(function () {
  const $nav = $("nav");
  const $navItems = $(".navbar-nav .nav-item .nav-link");
  const $logosSlide = $(".logos-slide").clone();
  const $carouselButtons = $("#carouselButtons");
  const $hero = $("#hero");
  const $HeadTitle = $("#HeadTitle");
  const $HeadTitleText = $("#HeadTitleText");
  const $HeadBtn = $(".header-btn");
  const $headImg = $(".head-img");

  // Initialize WOW.js
  new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: true,
  }).init();

  // Navbar color change on scroll
  $(window).on("scroll", function () {
    $nav.toggleClass("white-nav-top", $(this).scrollTop() > 50);
  });

  // Navbar active link switching
  $navItems.on("click", function () {
    $navItems.removeClass("active active-link");
    $(this).addClass("active active-link");
  });

  // Append cloned logos slide
  $(".logos").append($logosSlide);

  // Carousel slide display
  let slideIndex = 1;
  displaySlide(slideIndex);

  function activeSlide(n) {
    displaySlide((slideIndex = n));
  }

  function displaySlide(n) {
    const $slides = $(".testimonial");
    const $dots = $(".footerdot");

    $slides.hide().css("opacity", 0);
    $dots.removeClass("activate");

    $slides.eq(slideIndex - 1).show();
    fadeIn($slides.eq(slideIndex - 1), 1000);
    $dots.eq(slideIndex - 1).addClass("activate");
  }

  function fadeIn($element, duration) {
    let opacity = 0;
    const increment = 50 / duration;

    const fading = setInterval(function () {
      if (opacity >= 1) clearInterval(fading);
      $element.css("opacity", opacity);
      opacity += increment;
    }, 50);
  }

  // Carousel button click event
  $carouselButtons.on("click", "span", function () {
    activeSlide(parseInt($(this).data("carousel")));
  });

  // CounterUp initialization
  $(".counter").counterUp({
    delay: 15,
    time: 2000,
  });

  let lastScrollTop = 0;

  $hero.on("scroll touchmove", () => {
    const currentScrollTop = $hero.scrollTop();
    let blurValue =
      parseFloat(
        $HeadTitle.css("filter").replace("blur(", "").replace("px)", "")
      ) || 0;

    if (currentScrollTop === 0) {
      blurValue = 0;
    } else if (currentScrollTop > lastScrollTop && blurValue < 10) {
      blurValue = Math.min(blurValue + 0.3, 10);
    } else if (currentScrollTop < lastScrollTop && blurValue > 0) {
      blurValue = Math.max(blurValue - 0.3, 0);
    }

    $HeadTitle.css({
      filter: `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)`,
    });

    $HeadBtn.css({
      filter: `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)`,
    });

    $HeadTitleText.css({
      filter: `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)`,
    });

    $headImg.css({
      filter: `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)`,
    });
    lastScrollTop = currentScrollTop;
  });

  $(function () {
    $("#Calender").waypoint(
      function () {
        $(".progress").each(function () {
          $(this).animate(
            {
              width: $(this).attr("aria-valuenow") + "%",
            },
            2000
          );
        });

        this.destroy();
      },
      {
        offset: "450",
      }
    );
  });
});
