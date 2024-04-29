//이거 나중에 다시 손으로 써서 정리 다시하기
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

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);
    loginForm.submit();
    };



    
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