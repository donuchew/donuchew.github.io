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

	//재조합
	const likebutton = document.querySelector("#likebutton");
	const hatebutton = document.querySelector("#hatebutton");
	const isAnimationOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
	const buttonT1 = gsap.timeline();
	const buttonT2 = gsap.timeline();
	
	gsap.set(likebutton, {
		transformOrigin: "50% 50%"
	});
	gsap.set(hatebutton, {
		transformOrigin: "50% 50%"
	});

	buttonT1.to(likebutton, {
		scaleY: .91,
		scaleX: 1.06,
    		skewX: -2.5,
		repeat: 1,
		yoyo: true,
		duration: .5,
		ease: "Bounce.easeIn"
	});
	buttonT1.pause();

	buttonT2.to(hatebutton, {
		scaleY: .91,
		scaleX: 1.06,
    		skewX: -2.5,
		repeat: 1,
		yoyo: true,
		duration: .5,
		ease: "Bounce.easeIn"
	});
	buttonT2.pause();

	likebutton.addEventListener("click", function (e) {
		buttonT1.play(0.3);
	});
	hatebutton.addEventListener("click", function (e) {
		buttonT2.play(0.3);
	});






	
}());
