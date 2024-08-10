// Import Firebase SDK
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './firebase-config.js';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();

// Xử lý đăng ký
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const email = document.getElementById('email').value;

  if (username && password && email) {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Đăng ký thành công:', user);
        database.ref('users/' + username).set({
          username: username,
          email: email
        }).then(() => {
          alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
          window.location.href = 'login.html'; // Chuyển đến trang đăng nhập
        }).catch((error) => {
          console.error('Lỗi khi lưu dữ liệu:', error);
          alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
        });
      })
      .catch((error) => {
        console.error('Lỗi khi đăng ký:', error);
        alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
      });
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
