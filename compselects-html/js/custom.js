// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

$(".custom_slick_slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  fade: true,
  adaptiveHeight: true,
  asNavFor: ".slick_slider_nav",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: false,
      },
    },
  ],
});

$(".slick_slider_nav").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".custom_slick_slider",
  centerMode: false,
  focusOnSelect: true,
  variableWidth: true,
});

/** google_map js **/

function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

/** Curtidas **/

function toggleLike(button) {
  const icon = button.querySelector("i");
  const countSpan = button.querySelector(".like-count");
  let count = parseInt(countSpan.textContent);

  if (button.classList.contains("liked")) {
    button.classList.remove("liked");
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
    count--;
  } else {
    button.classList.add("liked");
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
    count++;
  }

  countSpan.textContent = count;
}
