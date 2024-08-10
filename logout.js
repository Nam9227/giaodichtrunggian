// logout.js

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Xóa thông tin đăng nhập
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('isAdmin');

            // Chuyển hướng về trang đăng nhập
            window.location.href = 'login.html';
        });
    }
});
