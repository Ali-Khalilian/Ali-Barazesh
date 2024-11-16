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
  const $leftContent = $("#left");
  const $rightContent = $("#right");
  const $overImg = $("#overImg");

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

    $slides.hide().css("opacity", 0); // Hide all slides and reset opacity
    $dots.removeClass("activate"); // Reset dot activation

    $slides.eq(slideIndex - 1).show(); // Show current slide
    fadeIn($slides.eq(slideIndex - 1), 1000); // Apply fade-in effect
    $dots.eq(slideIndex - 1).addClass("activate"); // Activate corresponding dot
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

  // let lastScrollTop = 0;

  // $hero.on("scroll", () => {
  //   const currentScrollTop = $hero.scrollTop();
  //   let blurValue =
  //     parseFloat(
  //       $leftContent.css("filter").replace("blur(", "").replace("px)", "")
  //     ) || 0;

  //   if (currentScrollTop === 0) {
  //     // Reset blur when scrolled to the top
  //     blurValue = 0;
  //   } else if (currentScrollTop > lastScrollTop && blurValue < 13) {
  //     // Increase blur when scrolling down, up to a max of 13px
  //     blurValue = Math.min(blurValue + 0.3, 13);
  //   } else if (currentScrollTop < lastScrollTop && blurValue > 0) {
  //     // Decrease blur when scrolling up, down to a min of 0px
  //     blurValue = Math.max(blurValue - 0.3, 0);
  //   }

  //   $leftContent.css("filter", `blur(${blurValue}px)`);
  //   $rightContent.css("filter", `blur(${blurValue}px)`);
  //   $overImg.css("filter", `blur(${blurValue}px)`);

  //   lastScrollTop = currentScrollTop;
  // });



  let lastScrollTop = 0;

  $hero.on("scroll", () => {
    const currentScrollTop = $hero.scrollTop();
    let blurValue =
      parseFloat(
        $leftContent.css("filter").replace("blur(", "").replace("px)", "")
      ) || 0;
  
    if (currentScrollTop === 0) {
      // Reset blur when scrolled to the top
      blurValue = 0;
    } else if (currentScrollTop > lastScrollTop && blurValue < 13) {
      // Increase blur when scrolling down, up to a max of 13px
      blurValue = Math.min(blurValue + 0.3, 13);
    } else if (currentScrollTop < lastScrollTop && blurValue > 0) {
      // Decrease blur when scrolling up, down to a min of 0px
      blurValue = Math.max(blurValue - 0.3, 0);
    }
  
    // Apply the blur with webkit compatibility
    $leftContent.css({
      "filter": `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)` /* Add this line */
    });
    $rightContent.css({
      "filter": `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)` /* Add this line */
    });
    $overImg.css({
      "filter": `blur(${blurValue}px)`,
      "-webkit-filter": `blur(${blurValue}px)` /* Add this line */
    });
  
    lastScrollTop = currentScrollTop;
  });
  


});
