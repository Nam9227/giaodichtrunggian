document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra trạng thái đăng nhập và quyền admin
    const isLoggedIn = localStorage.getItem('loggedIn');
    const isAdmin = localStorage.getItem('isAdmin');

    if (!isLoggedIn || isAdmin !== 'true') {
        // Nếu chưa đăng nhập hoặc không phải admin, chuyển hướng đến trang đăng nhập
        window.location.href = 'login.html';
    }
});
