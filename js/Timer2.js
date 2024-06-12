function startCountdown(hours) {
    let seconds = hours * 3600;
    const countdownTimer = document.getElementById('countdownTimer');

    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
        const hoursRemaining = Math.floor(seconds / 3600);
        const minutesRemaining = Math.floor((seconds % 3600) / 60);
        const secondsRemaining = seconds % 60;

        countdownTimer.innerHTML = `${hoursRemaining}:${minutesRemaining < 10 ? '0' : ''}${minutesRemaining}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;

        if (seconds === 0) {
            clearInterval(timerInterval);
            countdownTimer.innerHTML = "시간 종료";
        } else {
            seconds--;
        }
    }
}

// 로그아웃 제한이 설정되었을 때 타이머 시작
function startLogoutTimer() {
    // 로그아웃 제한이 설정된 후에는 타이머가 시작됨
    startCountdown(1); // 1시간으로 설정됨
}
