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
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('new-username').value.trim(); // Tên người dùng
  const password = document.getElementById('new-password').value.trim();
  const email = document.getElementById('email').value.trim();
  const fullname = document.getElementById('full-name').value.trim();

  if (username && password && email) {
    try {
      // Kiểm tra xem tên người dùng đã tồn tại trong cơ sở dữ liệu chưa
      const usernameSnapshot = await database.ref('users/' + username).once('value');
      if (usernameSnapshot.exists()) {
        alert('Tên người dùng đã tồn tại. Vui lòng chọn tên khác.');
        return;
      }

      // Đăng ký người dùng với Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Đăng ký thành công:', user);

      // Lưu thông tin người dùng vào Firebase Realtime Database
      await database.ref('users/' + username).set({
        email: email,        // Lưu email
        password: password,  // Lưu mật khẩu
        fullname: fullname,  //luu tên
        balance: 0           // Khởi tạo số dư mặc định
      });

      alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
      window.location.href = 'login.html'; // Chuyển đến trang đăng nhập

    } catch (error) {
      console.error('Lỗi khi đăng ký hoặc lưu dữ liệu:', error);
      alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    }
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function () {
  const passwordField = document.getElementById('new-password');
  const eyeIcon = document.getElementById('toggle-password');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.src = 'images/mo.png'; // Hình ảnh con mắt mở
  } else {
    passwordField.type = 'password';
    eyeIcon.src = 'images/dong.png'; // Hình ảnh con mắt đóng
  }
});
