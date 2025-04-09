$(function(){

    $(".slider-best-sellers").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        autoplay: true, 
        autoplaySpeed: 2000,
        speed: 600,
        pauseOnHover: false, 
        pauseOnFocus: false,             
        arrows: false,  
        prevArrow: $(),
        nextArrow: $(),

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }
        ]
    });

    $slider.on("afterChange", function(){
        $slider.slick("slickPlay");
    });

})