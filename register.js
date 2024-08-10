// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js';

// Import Firebase configuration
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Xử lý gửi mã xác thực
document.getElementById('send-verification-code').addEventListener('click', function() {
  const email = document.getElementById('email').value;

  if (email) {
    const actionCodeSettings = {
      // URL phải được cấu hình trong phần Firebase Console
      // URL cho trang xác nhận email
      url: 'http://localhost:8000/verify-email.html',
      handleCodeInApp: true
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // Lưu địa chỉ email vào localStorage để sử dụng khi xác thực
        window.localStorage.setItem('emailForSignIn', email);
        alert('Mã xác thực đã được gửi đến ' + email);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi mã xác thực:', error);
        alert('Có lỗi xảy ra khi gửi mã xác thực. Vui lòng thử lại.');
      });
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

    // Xác thực mã xác thực
    const emailForSignIn = window.localStorage.getItem('emailForSignIn');
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Xác thực email với mã link
      signInWithEmailLink(auth, emailForSignIn, window.location.href)
        .then((result) => {
          const user = result.user;
          console.log('Đăng nhập thành công:', user);
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
        })
        .catch((error) => {
          console.error('Lỗi khi xác thực mã:', error);
          alert('Mã xác thực không hợp lệ hoặc đã hết hạn.');
        });
    } else {
      alert('Có lỗi xảy ra khi xác thực mã. Vui lòng thử lại.');
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
