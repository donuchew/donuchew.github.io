let currentFrame = 1;

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        // 스크롤 다운: 다음 프레임으로 이동
        currentFrame = Math.min(currentFrame + 1, 3);
    } else {
        // 스크롤 업: 이전 프레임으로 이동
        currentFrame = Math.max(currentFrame - 1, 1);
    }

    updateFrames();
});

function updateFrames() {
    for (let i = 1; i <= 3; i++) {
        const frame = document.getElementById(`frame${i}`);
        if (i === currentFrame) {
            frame.style.opacity = 1;
            frame.style.transform = 'translateX(0)';
        } else {
            frame.style.opacity = 0;
            frame.style.transform = `translateX(${100 * (i - currentFrame)}%)`;
        }
    }
}




