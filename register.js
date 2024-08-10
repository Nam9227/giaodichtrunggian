// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo5POI_MkDJyNE5y_7BIdfs-B2mj1iUBY",
  authDomain: "csdl-web-giaodich.firebaseapp.com",
  databaseURL: "https://csdl-web-giaodich-default-rtdb.firebaseio.com",
  projectId: "csdl-web-giaodich",
  storageBucket: "csdl-web-giaodich.appspot.com",
  messagingSenderId: "834585121842",
  appId: "1:834585121842:web:bca26240e1e5187792d82b",
  measurementId: "G-5VDD2LKEKV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the auth and database services
const auth = firebase.auth();
const database = firebase.database();

// Handle registration
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

        // Lưu thông tin người dùng (bao gồm cả mật khẩu mã hóa) vào Firebase Realtime Database
        // Đây là cách tiếp cận không an toàn, vì vậy hãy thận trọng!
        database.ref('users/' + username).set({
          email: email,
          password: password // Lưu mật khẩu không an toàn
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
// register.js hoặc login.js, tùy thuộc vào trang đăng ký hoặc đăng nhập

document.getElementById('toggle-password').addEventListener('click', function() {
  const passwordField = document.getElementById('password'); // Hoặc 'new-password' nếu ở trang đăng ký
  const eyeIcon = document.getElementById('toggle-password');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.src = 'images/mo.png'; // Hình ảnh con mắt mở
  } else {
    passwordField.type = 'password';
    eyeIcon.src = 'images/dong.png'; // Hình ảnh con mắt đóng
  }
});
