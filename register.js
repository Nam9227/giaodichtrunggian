// Import cấu hình Firebase
import { firebaseConfig } from './firebase-config.js';

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

// Tham chiếu đến Firebase Realtime Database
const database = firebase.database();

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
      email: email
    };

    // Lưu tài khoản vào Firebase Realtime Database
    database.ref('users/' + username).set(user)
      .then(() => {
        alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
        window.location.href = 'login.html';
      })
      .catch((error) => {
        console.error('Lỗi khi đăng ký:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại.');
      });
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
