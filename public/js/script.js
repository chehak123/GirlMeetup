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
