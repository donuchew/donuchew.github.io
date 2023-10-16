(function(){
	const button = document.querySelector(".button");
	const isAnimationOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
	const buttonTl = gsap.timeline();
	gsap.set(button, {
		transformOrigin: "50% 50%"
	});

	buttonTl.to(button, {
		scaleY: .91,
		scaleX: 1.06,
    skewX: -2.5,
		repeat: 1,
		yoyo: true,
		duration: .5,
		ease: "Bounce.easeIn"
	});
	buttonTl.pause();

	button.addEventListener("click", function (e) {
		buttonTl.play(0.3);
	});
}());
