const container = document.getElementById('container');
let currentSection = 0;
let isScrolling = false;

function smoothScroll(target) {
    isScrolling = true;
    const targetPosition = target * window.innerHeight;
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 10; // 원하는 속도와 맞게 조절

    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const ease = easeOutQuart(timeElapsed, startPosition, distance, duration);
        container.scrollTop = ease;
        if (timeElapsed < duration) requestAnimationFrame(animation);
        else isScrolling = false;
    }

    function easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }

    requestAnimationFrame(animation);
}

document.addEventListener('wheel', function (e) {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentSection < 2) {
        currentSection++;
        smoothScroll(currentSection);
    } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
        smoothScroll(currentSection);
    }
});
