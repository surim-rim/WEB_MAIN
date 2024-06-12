let sessionEnded = false; // 세션이 종료되었는지 여부를 나타내는 변수

// 세션 시작 시간 저장
function startSession() {
    sessionStorage.setItem('sessionStartTime', new Date().getTime());
}

// 세션 종료 시간 가져오기
function getSessionEndTime() {
    const sessionStartTime = parseInt(sessionStorage.getItem('sessionStartTime'));
    const sessionDuration = 5 * 60 * 1000; // 5분을 밀리초로 변환
    return sessionStartTime + sessionDuration;
}

// 타이머 업데이트
function updateTimer() {
    const sessionEndTime = getSessionEndTime();
    const currentTime = new Date().getTime();
    const timeLeft = sessionEndTime - currentTime;

    if (timeLeft > 0) {
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');
        document.getElementById('timer').innerHTML = minutes + ":" + seconds;
    } else if (!sessionEnded) { // 세션이 이미 종료되지 않은 경우에만 처리
        sessionEnded = true; // 세션이 종료됨을 표시
        logout(); // 로그아웃 처리
    }
}

// 자동 로그아웃 및 메시지 표시
function logout() {
    // 세션 종료
    sessionStorage.removeItem('sessionStartTime');
    // 메시지 표시
    alert('로그인 이후 5분이 지나 자동으로 로그아웃되었습니다.');
    // 로그아웃 처리 (예: 로그인 페이지로 이동)
    window.location.href = 'http://127.0.0.1:5500/index.html'; // 로그인 페이지로 이동
}

// 타이머 업데이트 주기 설정 (1초마다)
setInterval(updateTimer, 1000);

// 페이지 로드 시 세션 시작 및 타이머 업데이트
window.onload = function() {
    startSession();
    updateTimer();
};
