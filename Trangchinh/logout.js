document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('isAdmin');
            // 1. Xóa dữ liệu trong LocalStorage
            localStorage.clear();

            // 2. Xóa dữ liệu trong SessionStorage
            sessionStorage.clear();

            // 3. Xóa tất cả Cookies
            document.cookie.split(";").forEach(cookie => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });

            // 4. Xóa phiên trên máy chủ (nếu có API để xử lý đăng xuất)
            fetch('/logout', { method: 'POST', credentials: 'include' })
                .then(response => {
                    if (response.ok) {
                        console.log('Đăng xuất thành công.');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi đăng xuất trên máy chủ:', error);
                });
                window.location.reload(true);
            // 5. Chuyển hướng về trang đăng nhập
            window.location.href = '../login.html';
        });
    }
});