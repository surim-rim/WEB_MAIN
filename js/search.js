/*
document.getElementById("search_btn").addEventListener('click', search_message);

function search_message(){
    alert("검색을 수행합니다!");
}
*/

/*
const search_message = () => {
    const c = '검색을 수행합니다';
    alert(c);
};

document.getElementById("search_btn").addEventListener('click', search_message);


function googleSearch() {
    const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    // 새 창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
    return false;
}
*/

const search_message = () => {
    const searchTerm = document.getElementById("search_input").value;
    const forbiddenWords = ['비속어1', '비속어2', '비속어3', '비속어4', '비속어5'];
    
    for (const word of forbiddenWords) {
        if (searchTerm.includes(word)) {
            alert('비속어가 포함된 검색어는 사용할 수 없습니다.');
            return;
        }
    }

    if (searchTerm.length === 0) {
        alert('검색어를 입력해주세요.');
        return;
    }

    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    window.open(googleSearchUrl, "_blank");
};

document.getElementById("search_btn").addEventListener('click', search_message);
