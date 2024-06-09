//여기 나중에 다시 손으로 써서 정리 다시하기

function addJavascript(jsname){ //자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}
addJavascript('/js/security.js'); //암복호화 함수
addJavascript('/js/session.js'); //세션 함수
addJavascript('/js/cookie.js'); //쿠키 함수


const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;
    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);
    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
    // XSS 공격 가능성 발견 시 에러 처리
    alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
    return false;
    }
    // Sanitized된 값 반환
    return sanitizedInput;
    };



const check_input = () => {
    //전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');

    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('form3Example3');
    const passwordInput = document.getElementById('form3Example4');
    

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue.length > 10) {
        alert('아이디는 최소 10글자 이하로 입력해야 합니다.');
        return false;
    }

    if (passwordValue.length > 15) {
        alert('비밀번호는 반드시 15글자 이하로 입력해야 합니다.');
        return false;
    }



    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
if (!hasSpecialChar) {
    alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
    return false;
}

const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
if (!hasUpperCase || !hasLowerCase) {
    alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
    return false;
}


// 3글자 이상 반복 입력 체크
if (checkRepeatedCharacters(emailValue, 3) || checkRepeatedCharacters(passwordValue, 3)) {
    alert('아이디나 비밀번호에 3글자 이상 반복되는 부분이 있습니다.');
    return false;
}

// 연속되는 숫자 2개 이상 반복 입력 체크
if (checkConsecutiveNumbers(emailValue, 2) || checkConsecutiveNumbers(passwordValue, 2)) {
    alert('아이디나 비밀번호에 연속된 숫자 2개 이상이 포함되어 있습니다.');
    return false;
}

const sanitizedPassword = check_xss(passwordValue);
// check_xss 함수로 비밀번호 Sanitize
const sanitizedEmail = check_xss(emailValue);
// check_xss 함수로 비밀번호 Sanitize
if (!sanitizedEmail) {
// Sanitize된 비밀번호 사용
return false;
}
if (!sanitizedPassword) {
// Sanitize된 비밀번호 사용
return false;
}

//검사 마무리 단계 쿠키 저장, 최하단 submit 이전
if(idsave_check.checked == true){
    alert("쿠키를 저장합니다.", emailValue);
    setCookie("id", emailValue, 1); //1일 저장
    alert("쿠키 값 :" + emailValue);
}
else
{   //아이디 체크x
    setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
}

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    session_set(); //세션 생성
    loginForm.submit();
};



function init(){
    const emailInput = document.getElementById('form3Example3');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id){
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check(); //세션 유무 검사
}


// 반복되는 부분 체크 함수
const checkRepeatedCharacters = (str, length) => {
    for (let i = 0; i <= str.length - length; i++) {
        const substr = str.substring(i, i + length);
        const restOfString = str.substring(i + length);
        if (restOfString.includes(substr)) {
            return true;
        }
    }
    return false;
};


// 연속된 숫자 체크 함수
const checkConsecutiveNumbers = (str, length) => {
    const regex = new RegExp(`\\d{${length},}`);
    return regex.test(str);
};



    document.getElementById("login_btn").addEventListener('click', check_input);
    





function init_logined(){
    if(sessionStorage){
        decrypt_text(); //복호화 함수
    }
    else{
        alert("세션 스토리지 지원 x")
    }
}

/* 10주차 응용 문제
// login_count 함수: 로그인 횟수를 증가하고 쿠키에 저장하는 함수
const login_count = () => {
    let loginCnt = getCookie("login_cnt"); // 기존 로그인 횟수 가져오기
    loginCnt = loginCnt ? parseInt(loginCnt) + 1 : 1; // 기존 횟수가 없으면 1로 초기화
    setCookie("login_cnt", loginCnt, 1); // 쿠키에 로그인 횟수 저장 (1일 동안 유지)
    alert("로그인 횟수: " + loginCnt);
};

// logout_count 함수: 로그아웃 횟수를 증가하고 쿠키에 저장하는 함수
const logout_count = () => {
    let logoutCnt = getCookie("logout_cnt"); // 기존 로그아웃 횟수 가져오기
    logoutCnt = logoutCnt ? parseInt(logoutCnt) + 1 : 1; // 기존 횟수가 없으면 1로 초기화
    setCookie("logout_cnt", logoutCnt, 1); // 쿠키에 로그아웃 횟수 저장 (1일 동안 유지)
    alert("로그아웃 횟수: " + logoutCnt);
};

// 로그인 버튼 클릭 시 login_count 함수 호출
document.getElementById("login_btn").addEventListener('click', login_count);

// 로그아웃 버튼 클릭 시 logout_count 함수 호출
document.getElementById("logout_btn").addEventListener('click', logout_count);
*/



/* 10주차 연습문제
// login_failed 함수: 로그인 실패 횟수를 증가시키고 제한 상태를 확인하는 함수
const login_failed = () => {
    let failCnt = getCookie("login_fail_cnt"); // 기존 로그인 실패 횟수 가져오기
    failCnt = failCnt ? parseInt(failCnt) + 1 : 1; // 기존 횟수가 없으면 1로 초기화
    setCookie("login_fail_cnt", failCnt, 1); // 쿠키에 로그인 실패 횟수 저장 (1일 동안 유지)

    if (failCnt >= 3) {
        // 로그인 제한 상태일 때
        alert("로그인 제한 상태입니다. 잠시 후 다시 시도해주세요.");
        document.getElementById("login_btn").disabled = true; // 로그인 버튼 비활성화
    } else {
        // 로그인 제한 상태가 아닐 때
        alert("로그인 실패 횟수: " + failCnt);
        document.getElementById("login_btn").disabled = false; // 로그인 버튼 활성화
    }
};

// 로그인 버튼 클릭 시 login_failed 함수 호출
document.getElementById("login_btn").addEventListener('click', login_failed);

// 초기화 함수: 쿠키 초기화 및 로그인 버튼 활성화
const resetCookies = () => {
    setCookie("login_fail_cnt", 0, 1); // 로그인 실패 횟수 쿠키 초기화
    document.getElementById("login_btn").disabled = false; // 로그인 버튼 활성화
};

// 문서 로드 시 초기화 함수 호출
window.onload = resetCookies;
*/


/* 12, 13주차 연습문제
// login 함수: 로그인 시 쿠키와 세션 설정 및 로그인 시간 유지
const login = () => {
    // 쿠키에 로그인 시간 저장 (5분 유지)
    setCookie("login_time", new Date().getTime(), 5/1440); // 5분은 5/1440로 계산
    // 세션 생성
    session_set();
    // 추가적인 로그인 동작 구현...
};

// logout 함수: 로그아웃 시 쿠키와 세션 삭제 후 메인 페이지로 이동
const logout = () => {
    // 쿠키와 세션 삭제
    deleteCookie("login_time");
    session_del();
    // 메인 페이지로 이동
    window.location.href = "/main.html";
};

// checkLoginTime 함수: 로그인 시간 확인 후 자동 로그아웃
const checkLoginTime = () => {
    const loginTime = getCookie("login_time");
    if (loginTime) {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(loginTime);
        const fiveMinutesInMillis = 5 * 60 * 1000; // 5분을 밀리초로 변환
        if (elapsedTime >= fiveMinutesInMillis) {
            // 5분이 지났으면 자동 로그아웃
            logout();
        } else {
            // 5분이 지나지 않았으면 다음 체크를 예약하고 계속 유지
            setTimeout(checkLoginTime, fiveMinutesInMillis - elapsedTime);
        }
    }
};

// 초기화 함수: 페이지 로드 시 로그인 시간 체크 시작
const init = () => {
    checkLoginTime();
};

// 문서 로드 시 초기화 함수 호출
window.onload = init;
*/