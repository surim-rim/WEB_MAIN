function session_del(){ //세션 삭제
    if(sessionStorage){
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    }else{
        alert("세션 스토리지 지원 x");
    }
}

function logout(){
    session_del(); //세션 삭제
    logout_count(); // 로그아웃 횟수 증가
    location.href='../index.html';
}

document.getElementById("logout_btn").addEventListener('click', logout);

// 쿠키 값을 가져오는 함수
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 쿠키 값을 설정하는 함수
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// 로그아웃 횟수를 증가시키는 함수
function logout_count() {
    let logoutCount = parseInt(getCookie('logout_cnt')) || 0;
    logoutCount += 1;
    setCookie('logout_cnt', logoutCount, 7); // 7일 동안 유지되는 쿠키로 설정
    console.log('Logout Count:', logoutCount);
}
