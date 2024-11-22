document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra trạng thái đăng nhập
    const isLoggedIn = localStorage.getItem('loggedIn');

    if (!isLoggedIn) {
        // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
        //window.location.href = '../login.html';
    }
});