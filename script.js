function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
  
   
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      }, 
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
    });
  
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
  }
  locomotiveAnimation();
 
function navbarAnime(){
    gsap.to("#left-nav svg",{
        transform: "translateY(-110%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            // markers:true,
            start:"top 0%",
            end:"top -5%",
            scrub:true
        }
    })
    
    gsap.to("#right-nav #links",{
        transform: "translateY(-50px)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            // markers:true,
            start:"top 0%",
            end:"top -5%",
            opacity:0,
            scrub:0,
        }
    })
}  

navbarAnime()

var videoconanime = () => {
    var videocon = document.querySelector("#video-container")
var playbtn = document.querySelector("#play")
videocon.addEventListener("mouseenter", function(){
    gsap.to(playbtn,{
        scale:1,
        opacity:1
    })
})

videocon.addEventListener("mouseleave",function(){
    gsap.to(playbtn,{
        scale:0,
        opacity:0
    })
})

var timeout;

videocon.addEventListener("mousemove", function(dets){

    clearTimeout(timeout)

    let diff = dets.clientY - videocon.getBoundingClientRect().top;
    gsap.to(playbtn,{
        scale:1,
        opacity:1,
        left:dets.clientX - 35,
        top:diff - 30
    })

    timeout = setTimeout(function(){
        gsap.to(playbtn,{
            scale:0,
            opacity:0
        })
    },200)
    
})
}
videoconanime()


var timeline = gsap.timeline();

timeline.to(".heading",{
    y:0,
    stagger:.2,
})

timeline.from("#video-container",{
    scale:0.8,
    opacity:0,
    ease:Expo.easeInOut,
    duration:1
})


document.addEventListener("mousemove", function(dets){
    gsap.to("#cursor",{
        left:dets.clientX,
        top:dets.clientY
    })
})

var a = document.querySelectorAll(".child")

a.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        gsap.to("#cursor",{
            transform: `translate(-50% , -50%) scale(1)`,
        })
    })
})

a.forEach(function(elem){
    elem.addEventListener("mouseleave", function(){
        gsap.to("#cursor",{
            transform: `translate(-50% , -50%) scale(0)`,
        })
    })
})



// var elem = document.querySelectorAll("#page5 #slider button")

// elem.forEach(function(ele){
//     var side = ele.getBoundingClientRect().width;

//     ele.addEventListener("click",function(dets){
// console.log(ele)

//         document.querySelector("#slider").style.transform = `translateX(-${side}px)`
//         ele.querySelector(".c").style.backgroundColor = "black"
//     })
// })