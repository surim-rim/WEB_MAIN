function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let random = new Date(); // 랜덤 타임스탬프
    
    const obj = { // 객체 선언
    id : id.value,
    otp : random
    }
    
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}


function addJavascript(jsname){ //자바스크립트 외부 연동
    var th = document.getElementsByTagName('head')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}
addJavascript('/js/security.js'); //암복호화 함수
addJavascript('/js/session.js'); //세션 함수


function session_join_set(){ //세션 저장(객체)
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프

    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890

    if (sessionStorage){
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_new_user", objString);
        sessionStorage.setItem("Session_Storage_new_user_encryted", en_text);
    } else{
        alert("세션 스토리지 지원x");
    }
}



function session_check(){ //세션 검사
    if(sessionStorage.getItem("Session_Storage_id")){
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; //로그인된 페이지로 이동
    }
}


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



function session_set(){ //세션 저장
    let session_id = document.querySelector("#form3Example3");
    let session_pass = document.querySelector("#form3Example4"); //DOM 트리에서 pass 검색
    if(sessionStorage){
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    }else{
        alert("로컬 스토리지 지원 x");
    }
}

function session_get(){ //세션 읽기
    if(sessionStorage){
        return sessionStorage.getItem("Session_Storage_encrypted");
    }else{
        alert("세션 스토리지 지원 x");
    }
}

