$(document).ready(​function() { wow = new WOW(
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

/* Homepage Highlights section */
const prev  = document.querySelector('.prev');
    const next = document.querySelector('.next');

    const track = document.querySelector('.track');

    let carouselWidth = document.querySelector('.carousel-container').offsetWidth;

    window.addEventListener('resize', () => {
      carouselWidth = document.querySelector('.carousel-container').offsetWidth;
    })

    let index = 0;

    next.addEventListener('click', () => {
      index++;
      prev.classList.add('show');
      track.style.transform = `translateX(-${index * carouselWidth}px)`;
      
      if (track.offsetWidth - (index * carouselWidth) < carouselWidth) {
        next.classList.add('hide');
      }
    })

    prev.addEventListener('click', () => {
      index--;
      next.classList.remove('hide');
      if (index === 0) {
        prev.classList.remove('show');
      }
      track.style.transform = `translateX(-${index * carouselWidth}px)`;
    })
});
