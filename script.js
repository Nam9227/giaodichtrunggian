window.onload = function() {
  // Tạo tài khoản admin mặc định nếu chưa tồn tại
  if (!localStorage.getItem('admin')) {
    const adminUser = {
      username: 'admin',
      password: 'admin922007', // Mật khẩu mặc định cho tài khoản admin
      role: 'admin'
    };
    localStorage.setItem('admin', JSON.stringify(adminUser));
    console.log('Tài khoản admin mặc định đã được tạo.');
  }
};

// Chuyển đổi giữa form đăng nhập và đăng ký
document.getElementById('show-register').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

// Xử lý đăng ký
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const isAdmin = document.getElementById('is-admin').checked;

  if(username && password) {
    const user = {
      username: username,
      password: password,
      role: isAdmin ? 'admin' : 'user'
    };

    // Lưu tài khoản vào localStorage
    localStorage.setItem(username, JSON.stringify(user));
    alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
    
    // Chuyển đến form đăng nhập
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});

// Xử lý đăng nhập
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const storedUser = JSON.parse(localStorage.getItem(username));

  if(storedUser && password === storedUser.password) {
    if(storedUser.role === 'admin') {
      alert('Đăng nhập thành công với tư cách Admin!');
      // Điều hướng đến trang admin
      window.location.href = 'admin.html';
    } else {
      alert('Đăng nhập thành công!');
      // Điều hướng đến trang chính
      window.location.href = 'index.html';
    }
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng.');
  }
});
