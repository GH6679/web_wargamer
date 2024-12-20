
// 로그인 페이지 진입 시 캐시 방지 및 이전 세션 정리
window.onload = function () {
    // 세션스토리지 클리어
    sessionStorage.clear();
    localStorage.clear();

    // 뒤로가기 방지
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href);
    };
}

// 로그인 요청 처리
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const ID = document.getElementById('ID').value;
    const PW = document.getElementById('PW').value;
    const ROLE = 'user';

    // URL 인코딩된 폼 데이터 생성
    const formData = new URLSearchParams();
    formData.append('ID', ID);
    formData.append('PW', PW);
    formData.append('ROLE', ROLE);

    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userRole', 'admin');
    console.log('Redirecting to user page...');
    window.location.href = 'flame.html';

    // fetch('/assets/php/login.php', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: formData.toString()
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Login response:', data);

    //         if (data.success) {
    //             sessionStorage.setItem('loggedIn', 'true');
    //             sessionStorage.setItem('userRole', data.role);

    //             if (data.role === 'admin' || data.role === 'flame') {
    //                 console.log('Redirecting to admin page...');
    //                 window.location.href = 'flameadmin.html';
    //             } else {

    //             }
    //         } else {
    //             document.getElementById('error-message').textContent = data.error || 'ID 또는 PW가 잘못되었습니다.';
    //             document.getElementById('error-message').style.display = 'block';
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Login request failed:', error);
    //         document.getElementById('error-message').textContent = '로그인 처리 중 오류가 발생했습니다.';
    //         document.getElementById('error-message').style.display = 'block';
    //     });
});

// Sign up 버튼 클릭 시 모달 팝업 열기
document.getElementById('open-signup-window').onclick = function () {
    document.getElementById('signup-modal').style.display = 'flex';
};

// 모달 닫기 버튼 클릭 시 모달 팝업 닫기
document.getElementById('close-signup-modal').onclick = function () {
    document.getElementById('signup-modal').style.display = 'none';
};

// Cancel 버튼 클릭 시 모달 팝업 닫기
document.getElementById('cancel-button').onclick = function () {
    document.getElementById('signup-modal').style.display = 'none';
};

// 회원가입 요청 처리
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const signupID = document.getElementById('signup-ID').value;
    const signupPW = document.getElementById('signup-PW').value;
    const signupPWConfirm = document.getElementById('signup-PW-confirm').value;
    const signupNickname = document.getElementById('signup-Nickname').value;

    // 회원가입 요청 보내기 (변수명은 그대로)
    fetch('/assets/php/signup.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `ID=${encodeURIComponent(signupID)}&PW=${encodeURIComponent(signupPW)}&PWConfirm=${encodeURIComponent(signupPWConfirm)}&Nickname=${encodeURIComponent(signupNickname)}`,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('회원가입이 완료되었습니다.');
                document.getElementById('signup-modal').style.display = 'none'; // 모달 닫기
            } else {
                document.getElementById('signup-error-message').style.display = 'block';
                document.getElementById('signup-error-message').textContent = data.error || '회원가입에 실패했습니다. 다시 시도해주세요.';
            }
        })
        .catch(error => {
            console.error('회원가입 요청 실패:', error);
            document.getElementById('signup-error-message').style.display = 'block';
        });
});
