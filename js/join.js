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

class SignUp {
  constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) { // 생성자 함수
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdayDate = birthdayDate;
    this.gender = gender;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.classNumber = classNumber;
    this.random = random;
  }

  get fullName() {
      return `${this.firstName} ${this.lastName}`; // 템플릿 리터럴 문자열 연결, 기존에는 + 연산자로 연결
    }
  
    set fullName(fullName) {
      const [firstName, lastName] = fullName.split(" ");
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    get contactInfo() {
      return `${this.emailAddress} ${this.phoneNumber} ${this.random}`; // 요소 하나 하나를 객체 프로퍼티라고 한다.
    }
  
    set contactInfo(contactInfo) {
      const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.random = random;
        
    }
}

function join(){ //회원가입
  let form = document.querySelector("#form_main");
  let f_name = document.querySelector("#firstName");
  let l_name = document.querySelector("#lastName");
  let b_day = document.querySelector("#birthdayDate");
  let gender = document.querySelector("#inlineRadioOptions");
  let email = document.querySelector("#emailAddress");
  let p_number = document.querySelector("#phoneNumber");
  let class_check = document.querySelector(".select form-control-lg");

  form.action = "../login/join_end.html";
  form.method = "get";

  // 이메일 주소의 형식을 정규 표현식으로 검증
  let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // 휴대전화 번호의 형식을 정규 표현식으로 검증
  let phoneFormat = /^\d{3}-\d{3,4}-\d{4}$/;

  // 생년월일의 형식을 정규 표현식으로 검증
  let birthdayFormat = /^\d{4}\/\d{2}\/\d{2}$/;

  if(f_name.value.length === 0 || l_name.value.length === 0 || !birthdayFormat.test(b_day.value) || p_number.value.length === 0){
      alert("생년월일이 올바르지 않습니다. 올바른 형식으로 입력해주세요. (예: 2000/01/01)");
  } else if (!emailFormat.test(email.value)) {
      alert("이메일 주소가 올바르지 않습니다. 올바른 형식으로 입력해주세요. (예: abcd@sungkyul.ac.kr)");
  } else if (!phoneFormat.test(p_number.value)) {
      alert("핸드폰 번호가 올바르지 않습니다. 올바른 형식으로 입력해주세요. (예: 010-1234-5678)");
  }
  else{
      session_join_set(); // 회원가입 용 세션 생성
      form.submit();
  }
}
