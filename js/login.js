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
    // 전역 변수 추가, 맨 위 위치
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
    if (idsave_check.checked == true) {
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); //1일 저장
        alert("쿠키 값 :" + emailValue);
    } else {   //아이디 체크x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    login_count(); // 로그인 횟수 증가
    session_set(); // 세션 생성
    loginForm.submit();
};

function init() {
    const emailInput = document.getElementById('form3Example3');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if (get_id) {
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

// 로그인 횟수를 증가시키는 함수
function login_count() {
    let loginCount = parseInt(getCookie('login_cnt')) || 0;
    loginCount += 1;
    setCookie('login_cnt', loginCount, 7); // 7일 동안 유지되는 쿠키로 설정
    console.log('Login Count:', loginCount); // 콘솔에 로그인 카운트 표시
}


// login.js

let loginAttempts = parseInt(getCookie('loginAttempts')) || 0; // 초기화 및 쿠키에서 로그인 시도 횟수 가져오기

const maxLoginAttempts = 3; // 최대 로그인 시도 횟수

// 로그인 시도 함수
const login = () => {
    const emailInput = document.getElementById('form3Example3').value;
    const passwordInput = document.getElementById('form3Example4').value;

    // 로그인 시도 횟수 증가
    loginAttempts++;
    setCookie('loginFailed', loginAttempts, 1/24); // 로그인 시도 횟수 쿠키에 저장 (1시간 유효)


    // 예를 들어, 여기서 실제 로그인 시도를 수행하고 로그인이 실패하면 아래의 코드를 실행합니다.
    // 여기서는 로그인 시도를 실패로 가정합니다.

    if (loginAttempts >= maxLoginAttempts) {
        alert('로그인 시도가 3회 이상 실패하여 로그인이 제한되었습니다.');
        document.getElementById('login_btn').disabled = true; // 로그인 버튼 비활성화
    }
};

document.getElementById('login_btn').addEventListener('click', login);

