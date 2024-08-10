import { database, auth } from './firebase-config.js';

window.onload = function() {
  // Tạo tài khoản admin mặc định nếu chưa tồn tại
  database.ref('users/admin').once('value', (snapshot) => {
    if (!snapshot.exists()) {
      const adminUser = {
        username: 'admin',
        password: 'admin922007' // Mật khẩu mặc định cho tài khoản admin
      };
      database.ref('users/admin').set(adminUser)
        .then(() => {
          console.log('Tài khoản admin mặc định đã được tạo.');
        })
        .catch((error) => {
          console.error('Lỗi khi tạo tài khoản admin:', error);
        });
    }
  });
};

// Xử lý đăng nhập
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  database.ref('users/' + username).once('value')
    .then((snapshot) => {
      const storedUser = snapshot.val();

      if (storedUser && password === storedUser.password) {
        alert('Đăng nhập thành công!');
        
        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('loggedIn', 'true');
        
        if (username === 'admin' && password === 'admin922007') {
          // Lưu trạng thái đăng nhập admin vào localStorage
          localStorage.setItem('isAdmin', 'true');
          // Điều hướng đến trang quản trị
          window.location.href = 'admin.html';
        } else {
          // Điều hướng đến trang chính
          window.location.href = 'home.html';
        }
      } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    })
    .catch((error) => {
      console.error('Lỗi khi kiểm tra tài khoản:', error);
      alert('Có lỗi xảy ra khi kiểm tra tài khoản. Vui lòng thử lại.');
    });
});
