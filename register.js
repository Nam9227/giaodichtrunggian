
// Xử lý đăng ký
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;

  if (username && password) {
    const user = {
      username: username,
      password: password
    };

    // Lưu tài khoản vào localStorage
    localStorage.setItem(username, JSON.stringify(user));
    alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
    
    // Chuyển đến form đăng nhập
    window.location.href = 'login.html';
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
