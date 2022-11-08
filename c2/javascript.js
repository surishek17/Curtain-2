jQuery(document).ready(function($){



    /* ======================================================================
    *   GreenSock Curtain Slider
    ====================================================================== */
    var curtainSlider = $(".curtains");
    var curtain = curtainSlider.find(".curtain");
    var curtainLeft = curtain.find(".half__left");
    var curtainRight = curtain.find(".half__right");
    var curtainInfos = curtain.find(".infos__holder");
    var navPrev = $("#previous__arrow");
    var navNext = $("#next__arrow");
    var startAutoplay = $(".start-autoplay"); 
    var stopAutoplay = $(".stop-autoplay");
    var curtainNum = curtain.length;
    var prevSlideID = null;
    var currentSlideID = 0;
    var sliderTime = 0.6;
    var isAnimating = false;
    var isAutoPlay = false;

    // Init Slider
    function initSlider() {
        setSlides();
        navPrev.on("click", gotoPrevSlide);
        navNext.on("click", gotoNextSlide);
        startAutoplay.on("click", startAutoPlay);
        stopAutoplay.on("click", stopAutoPlay);
        gotoSlide(0, 0);
        playSlider(); // Autoplay
    }
    initSlider();

    // Set Slides
    function setSlides() {
        TweenMax.set(curtainLeft,  { xPercent: -200, scale:0.9, transformOrigin: '50% 50%'});
        TweenMax.set(curtainRight, { xPercent: 200, scale:0.9, transformOrigin: '50% 50%'});
        TweenMax.set(curtainInfos, { autoAlpha: 0, scale:0.9, transformOrigin: '50% 50%'});
    }

    // Go To Prev Slide
    function gotoPrevSlide() {
        var slideToGo = currentSlideID - 1;
        if (slideToGo <= -1) {
            slideToGo = curtainNum - 1;
        }
        stopAutoPlay();
        gotoSlide(slideToGo, 1, "prev");
    }
   
    // Go To Next Slide
    function gotoNextSlide() {
        var slideToGo = currentSlideID + 1;
        if (slideToGo >= curtainNum) {
            slideToGo = 0;
        }
        stopAutoPlay();
        gotoSlide(slideToGo, 1, "next");
    }
   
    // Change Slides with keyboard arrows
    $(window).keyup(function(e){
        var key = e.which | e.keyCode;
        if(key === 37){ 
            gotoPrevSlide();
        }
        else if(key === 39){ 
            gotoNextSlide();
        }
    });

    // Go to Slide
    function gotoSlide(slideID, _time, _direction) {
        if (!isAnimating) {
            isAnimating = true;
            prevSlideID = currentSlideID;
            currentSlideID = slideID;
            futureSlideID = currentSlideID + 1;
            pastSlideID = prevSlideID - 1;
            // Future Slide
            var futureSlide =   curtain.eq(futureSlideID);
            var futureSlideLeft =    futureSlide.find(".half__left");
            var futureSlideRight =   futureSlide.find(".half__right");
            var futureSlideInfos =   futureSlide.find(".infos__holder");
            // Past Slide
            var pastSlide = curtain.eq(pastSlideID);
            var pastSlideLeft =    pastSlide.find(".half__left");
            var pastSlideRight =   pastSlide.find(".half__right");
            var pastSlideInfos =   pastSlide.find(".infos__holder");
            // Prev slide
            var prevSlide = curtain.eq(prevSlideID);
            var prevSlideLeft = prevSlide.find(".half__left");
            var prevSlideRight = prevSlide.find(".half__right");
            var prevSlideInfos = prevSlide.find(".infos__holder");
            // Current slide
            var currentSlide = curtain.eq(currentSlideID);
            var currentSlideLeft = currentSlide.find(".half__left");
            var currentSlideRight = currentSlide.find(".half__right");
            var currentSlideInfos = currentSlide.find(".infos__holder");
            // Direction
            var direction = "next";

            if (_time !== null) {sliderTime = _time;}
            if (_direction != null) {direction = _direction;}
            if (direction == "next") {
                // Reset
                TweenMax.set(curtain, {clearProps: 'all'});
                // Past Slide
                // TweenMax.set(pastSlide, {className:'-=active'});
                // TweenMax.set(pastSlide, {className:'-=prev'});
                // TweenMax.set(pastSlide, {className:'-=future'});
                // TweenMax.set(pastSlide, {className:'+=past'});
                TweenMax.set(pastSlide, {zIndex: curtainNum - curtainNum,});
                // Prev Slide
                // TweenMax.set(prevSlide, {className:'-=future'});
                // TweenMax.set(prevSlide, {className:'-=past'});
                TweenMax.set(prevSlide, {className:'-=active'});
                // TweenMax.set(prevSlide, {className:'+=prev'});
                TweenMax.set(prevSlide, {zIndex: curtainNum + 1});
                TweenMax.to([prevSlideLeft,prevSlideRight], sliderTime, 
                    {scale: 0.9,ease: Power4.easeOut});
                TweenMax.set(prevSlideLeft, 
                    {xPercent: -200,delay: sliderTime });
                TweenMax.set(prevSlideRight, 
                    {xPercent: 200,delay: sliderTime });
                TweenMax.to(prevSlideInfos, sliderTime, 
                    {scale:0.9,autoAlpha:0,ease: Back.easeOut.config(1.3)});
                // Current Slide
                // TweenMax.set(currentSlide, {className:'-=prev'});
                // TweenMax.set(currentSlide, {className:'-=future'});
                // TweenMax.set(currentSlide, {className:'-=past'});
                TweenMax.set(currentSlide, {className:'+=active'});
                TweenMax.set(currentSlide, {zIndex:curtainNum + 3});
                TweenMax.fromTo(currentSlideLeft, sliderTime, 
                    {xPercent: -100,autoAlpha:1,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: 0,autoAlpha:1,scale:1,ease: Power4.easeOut});
                TweenMax.fromTo(currentSlideRight, sliderTime, 
                    {xPercent: 100,autoAlpha:1,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: 0,autoAlpha:1,scale:1,ease: Power4.easeOut});
                TweenMax.fromTo(currentSlideInfos, sliderTime / 2, 
                    {scale:0.9,autoAlpha:0,ease: Back.easeOut.config(1.3)}, 
                    {scale:1,autoAlpha:1,ease: Back.easeOut.config(1.3),delay: sliderTime / 2});
                // Future Slide
                // TweenMax.set(futureSlide, {className:'-=prev'});
                // TweenMax.set(futureSlide, {className:'-=past'});
                // TweenMax.set(futureSlide, {className:'-=active'});
                // TweenMax.set(futureSlide, {className:'+=future'});
                TweenMax.set(futureSlide, {zIndex:curtainNum + 2});
                TweenMax.fromTo(futureSlideLeft, sliderTime, 
                    {xPercent: -200,autoAlpha:0,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: -100,autoAlpha:1,scale:0.9,ease: Power4.easeOut,delay:sliderTime / 8});
                TweenMax.fromTo(futureSlideRight, sliderTime, 
                    {xPercent: 200,autoAlpha:0,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: 100,autoAlpha:1,scale:0.9,ease: Power4.easeOut,delay:sliderTime / 8});

                loopNextSlide(currentSlideID);

            } else if (direction == "prev") {
                var futureSlideID = currentSlideID - 1;
                var pastSlideID = prevSlideID + 1;
                var futureSlide =   curtain.eq(futureSlideID);
                var pastSlide = curtain.eq(pastSlideID);
                // Future Slide
                var futureSlideLeft =    futureSlide.find(".half__left");
                var futureSlideRight =   futureSlide.find(".half__right");
                var futureSlideInfos =   futureSlide.find(".infos__holder");
                // Past Slide
                var pastSlideLeft =    pastSlide.find(".half__left");
                var pastSlideRight =   pastSlide.find(".half__right");
                var pastSlideInfos =   pastSlide.find(".infos__holder");
                // Reset
                TweenMax.set(curtain, {clearProps: 'all'});

                // Past Slide
                // TweenMax.set(pastSlide, {className:'-=active'});
                // TweenMax.set(pastSlide, {className:'-=prev'});
                // TweenMax.set(pastSlide, {className:'-=future'});
                // TweenMax.set(pastSlide, {className:'+=past'});
                TweenMax.set(pastSlide, {zIndex: curtainNum - curtainNum});
                TweenMax.fromTo(pastSlideLeft, sliderTime / 2, 
                    {xPercent: -100,autoAlpha:1,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: -200,autoAlpha:0,scale:0.9,ease: Power4.easeOut});
                TweenMax.fromTo(pastSlideRight, sliderTime / 2, 
                    {xPercent: 100,autoAlpha:1,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: 200,autoAlpha:0,scale:0.9,ease: Power4.easeOut,});

                // Prev Slide
                // TweenMax.set(prevSlide, {className:'-=future'});
                // TweenMax.set(prevSlide, {className:'-=past'});
                TweenMax.set(prevSlide, {className:'-=active'});
                // TweenMax.set(prevSlide, {className:'+=prev'});
                TweenMax.set(prevSlide, {zIndex:curtainNum + 1});
                TweenMax.to(prevSlideLeft, sliderTime, 
                    {xPercent:-100,scale: 0.9,ease: Power4.easeOut,});
                TweenMax.to(prevSlideRight, sliderTime, 
                    {xPercent:100,scale: 0.9,ease: Power4.easeOut,});
                TweenMax.to(prevSlideInfos, sliderTime / 4, 
                    {scale:0.9,autoAlpha:0,ease: Back.easeOut.config(1.3),});
                // Current Slide
                // TweenMax.set(currentSlide, {className:'-=future'});
                // TweenMax.set(currentSlide, {className:'-=past'});
                // TweenMax.set(currentSlide, {className:'-=prev'});
                TweenMax.set(currentSlide, {className:'+=active'});
                TweenMax.set(currentSlide, {zIndex:curtainNum + 2});
                TweenMax.fromTo(currentSlideLeft, sliderTime, 
                    {xPercent: 0,autoAlpha:0,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: 0,autoAlpha:1,scale:1,ease: Power4.easeOut,delay:sliderTime / 2});
                TweenMax.fromTo(currentSlideRight, sliderTime, 
                    {xPercent: 0,autoAlpha:0,scale:0.9,ease: Power4.easeOut}, 
                    {xPercent: 0,autoAlpha:1,scale:1,ease: Power4.easeOut,delay:sliderTime / 2});
                TweenMax.fromTo(currentSlideInfos, sliderTime / 2, 
                    {scale:0.9,autoAlpha:0,ease: Back.easeOut.config(1.3)}, 
                    {scale:1,autoAlpha:1,ease: Back.easeOut.config(1.3),delay: sliderTime / 2});
                // Future Slide
                // TweenMax.set(futureSlide, {className:'-=past'});
                // TweenMax.set(futureSlide, {className:'-=prev'});
                // TweenMax.set(futureSlide, {className:'-=active'});
                // TweenMax.set(futureSlide, {className:'+=future'});
                TweenMax.set(futureSlide, {zIndex:curtainNum});
                loopPrevSlide(currentSlideID);
            }
            TweenMax.delayedCall(sliderTime, function() {
                isAnimating = false;
            });
        }
    }

    // Loop Prev Slide
    function loopPrevSlide(offset) {
        if(offset == ($(".curtains .curtain").length-2)){
            TweenMax.set(curtain.first(), {zIndex:curtainNum - curtainNum});
            TweenMax.fromTo(curtain.first().find(curtainLeft), sliderTime / 2, 
                {xPercent: -100,autoAlpha:1,scale:0.9,ease: Power4.easeOut}, 
                {xPercent: -200,autoAlpha:0,scale:0.9,ease: Power4.easeOut});
            TweenMax.fromTo(curtain.first().find(curtainRight), sliderTime / 2, 
                {xPercent: 100,autoAlpha:1,scale:0.9,ease: Power4.easeOut}, 
                {xPercent: 200,autoAlpha:0,scale:0.9,ease: Power4.easeOut,});
        } 
    }
    // Loop Next Slide
    function loopNextSlide(offset) {
        if(offset == ($(".curtains .curtain").length-1)){
            TweenMax.set(curtain.first(), {zIndex:curtainNum + 2});
            TweenMax.fromTo(curtain.first().find(curtainLeft), sliderTime, 
                {xPercent: -200,autoAlpha:0,scale:0.9,ease: Power4.easeOut}, 
                {xPercent: -100,autoAlpha:1,scale:0.9,ease: Power4.easeOut,delay:sliderTime / 4});
            TweenMax.fromTo(curtain.first().find(curtainRight), sliderTime, 
                {xPercent: 200,autoAlpha:0,scale:0.9,ease: Power4.easeOut}, 
                {xPercent: 100,autoAlpha:1,scale:0.9,ease: Power4.easeOut,delay:sliderTime / 4});
        }
    }

    // Play Slider
    function playSlider() {
        gotoNextSlide();
        TweenMax.delayedCall(3, playSlider);
    }
    // Autoplay Slider
    function startAutoPlay(immediate) {
        if (immediate != null) {
            immediate = false;
        }
        if (immediate) {
            gotoNextSlide();
        }
        TweenMax.delayedCall(3, playSlider);
    }

    // Stop Autoplay Slider
    function stopAutoPlay() {
      isAutoPlay = false;
        TweenMax.killDelayedCallsTo(playSlider);
    }


})//jQuery