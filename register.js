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

  if (storedUser && password === storedUser.password) {
    alert('Đăng nhập thành công!');
    // Điều hướng đến trang chính
    window.location.href = 'index.html'; // Đảm bảo rằng đường dẫn là chính xác
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng.');
  }
});
