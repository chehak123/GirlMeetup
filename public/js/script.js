wow = new WOW(
    {
      animateClass: 'animated',
      offset:       100,
      callback:     function(box) {
        console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
      }
    }
  );
  wow.init();
  document.getElementById('moar').onclick = function() {
    var section = document.createElement('section');
    section.className = 'section--purple wow fadeInDown';
    this.parentNode.insertBefore(section, this);
  }


/* WOW animations */
new WOW().init();


/* FAQ Accordion Up and down arrows */
  $(document).ready(function(){
          // Add down arrow icon for collapse element which is open by default
          $(".collapse.show").each(function(){
            $(this).prev(".card-header").find(".fa").addClass("fa-angle-down").removeClass("fa-angle-right");
          });
          
          // Toggle right and down arrow icon on show hide of collapse element
          $(".collapse").on('show.bs.collapse', function(){
            $(this).prev(".card-header").find(".fa").removeClass("fa-angle-right").addClass("fa-angle-down");
          }).on('hide.bs.collapse', function(){
            $(this).prev(".card-header").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-right");
          });
      });


/* Footer scroll in */
var isShowing = false;
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() === $(document).height()) {
          $('.site-footer').slideToggle();
          isShowing = true;
      } else if (isShowing === true && $(window).scrollTop() + $(window).height() <= $(document).height() * 0.9) {
          $('.site-footer').slideToggle();
          isShowing = false;
      }
  });



/* Footer Scroll to top button */
var target = document.querySelector("site-footer");

function callback(entries, observer) {
  // The callback will return an array of entries, even if you are only observing a single item
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Show button
      scrollToTopBtn.classList.add('top-arrow')
    } else {
      // Hide button
      scrollToTopBtn.classList.remove('top-arrow')
    }
  });
}

let observer = new IntersectionObserver(callback);
observer.observe(target);



/* Highlights on homepage section */
$('.owl-carousel').owlCarousel({
  loop:false,
  margin:10,
  dots:false,
  nav:true,
  autoplay:true,
  autoplayTimeout:1000,
  autoplayHoverPause:true,
  navText:["<div class='nav-btn prev-slide'><i class='fas fa-chevron-circle-left'></i></div>","<div class='nav-btn next-slide'><i class='fas fa-chevron-circle-right'></i></div>"],
  stagePadding:50,
  responsive: {
      0: {
          items: 1
      },
      600: {
          items: 3
      },
      1000: {
          items: 5
      }
  }
});
