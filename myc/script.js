// 초기 호감도 값
let likeCount = 0;

// HTML 요소 가져오기
const likeButton = document.getElementById('likeButton');
const dislikeButton = document.getElementById('dislikeButton');
const resultDiv = document.getElementById('result');

// 좋아요 버튼 클릭 시
likeButton.addEventListener('click', function () {
    likeCount++;
    updateResult();
});

// 싫어요 버튼 클릭 시
dislikeButton.addEventListener('click', function () {
    likeCount--;
    updateResult();
});

// 호감도 업데이트 함수
function updateResult() {
    resultDiv.textContent = `호감도: ${likeCount}`;
}
