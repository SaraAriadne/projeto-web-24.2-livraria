$(function(){

    $(".slider-best-sellers").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true, 
        autoplaySpeed: 2000,
        pauseOnHover: false, 
        pauseOnFocus: false,             
        arrows: true,  
        prevArrow: $(),
        nextArrow: $()
    });

    $slider.on("afterChange", function(){
        $slider.slick("slickPlay");
    });

})