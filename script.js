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

  if(username && password) {
    // Lưu tài khoản vào localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
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

  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');

  if(username === storedUsername && password === storedPassword) {
    alert('Đăng nhập thành công!');
    // Điều hướng đến trang chính
    window.location.href = 'index.html';
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng.');
  }
});
