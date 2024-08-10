// Ví dụ về chức năng đăng xuất trong logout.js
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isAdmin');
    window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
}
