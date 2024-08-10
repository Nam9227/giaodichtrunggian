// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js';

// Import Firebase configuration
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Xử lý gửi mã xác thực (giả sử bạn đã cấu hình dịch vụ gửi mã)
document.getElementById('send-verification-code').addEventListener('click', function() {
  const email = document.getElementById('email').value;

  if (email) {
    // Code to send verification email
    alert('Mã xác thực đã được gửi đến ' + email);
  } else {
    alert('Vui lòng nhập địa chỉ Gmail.');
  }
});

// Xử lý đăng ký
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const email = document.getElementById('email').value;
  const verificationCode = document.getElementById('verification-code').value;

  if (username && password && email && verificationCode) {
    const user = {
      username: username,
      password: password,
      email: email,
      verificationCode: verificationCode
    };

    // Lưu tài khoản vào Firebase Realtime Database
    set(ref(database, 'users/' + username), user)
      .then(() => {
        alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
        window.location.href = 'login.html'; // Chuyển đến trang đăng nhập
      })
      .catch((error) => {
        console.error('Lỗi khi lưu dữ liệu:', error);
        alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
      });
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
