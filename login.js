window.onload = function() {
  // Tạo tài khoản admin mặc định nếu chưa tồn tại
  if (!localStorage.getItem('admin')) {
    const adminUser = {
      username: 'admin',
      password: 'admin922007' // Mật khẩu mặc định cho tài khoản admin
    };
    localStorage.setItem('admin', JSON.stringify(adminUser));
    console.log('Tài khoản admin mặc định đã được tạo.');
  }
};

// Xử lý đăng nhập
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUser = JSON.parse(localStorage.getItem(username));

  console.log('Tên người dùng:', username);
  console.log('Mật khẩu:', password);
  console.log('Người dùng lưu trữ:', storedUser);

  if (storedUser && password === storedUser.password) {
    alert('Đăng nhập thành công!');
    
    // Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem('loggedIn', 'true');
    
    if (username === 'admin' && password === 'admin922007' ) {
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
});
