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

// Tham chiếu đến dịch vụ auth và database của Firebase
const auth = firebase.auth();
const database = firebase.database();

// Tạo tài khoản admin nếu chưa có
window.onload = function() {
  // Kiểm tra xem tài khoản admin đã tồn tại trong Firebase chưa
  database.ref('users/admin').once('value', (snapshot) => {
    if (!snapshot.exists()) {
      // Tạo tài khoản admin qua Firebase Authentication
      auth.createUserWithEmailAndPassword('admin@example.com', 'admin922007') // Email và mật khẩu cho admin
        .then(() => {
          console.log('Tài khoản admin đã được tạo qua Firebase Authentication.');
        })
        .catch((error) => {
          console.error('Lỗi khi tạo tài khoản admin:', error);
        });
    }
  });
};

// Xử lý đăng nhập với tên đăng nhập và mật khẩu
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim(); // Lấy tên đăng nhập
  const password = document.getElementById('password').value.trim(); // Lấy mật khẩu

  if (username === 'admin') {
    // Kiểm tra tài khoản admin trong Firebase Realtime Database
    database.ref('users/admin').once('value').then(snapshot => {
      if (snapshot.exists()) {
        const adminData = snapshot.val(); // Lấy dữ liệu admin từ Firebase
        const storedPassword = adminData.password; // Lấy mật khẩu đã lưu để so sánh

        // So sánh mật khẩu nhập vào với mật khẩu đã lưu
        if (password === storedPassword) {
          console.log('Đăng nhập admin thành công');
          
          // Lưu trạng thái đăng nhập vào localStorage
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('isAdmin', 'true'); // Đánh dấu là admin
          window.location.href = 'admin.html'; // Điều hướng đến trang admin
        } else {
          console.error('Mật khẩu không đúng');
          alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
      } else {
        console.error('Không tìm thấy thông tin tài khoản admin');
        alert('Tài khoản admin không tồn tại trong cơ sở dữ liệu.');
      }
    }).catch(error => {
      console.error('Lỗi khi kiểm tra thông tin admin:', error);
      alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    });
  } else {
    // Kiểm tra tài khoản người dùng thông thường trong Firebase
    database.ref('users/' + username).once('value').then(snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val(); // Lấy dữ liệu người dùng từ Firebase
        const storedPassword = userData.password; // Lấy mật khẩu đã lưu để so sánh

        // So sánh mật khẩu nhập vào với mật khẩu đã lưu
        if (password === storedPassword) {
          console.log('Đăng nhập thành công:', username);
          
          // Lưu trạng thái đăng nhập vào localStorage
          localStorage.setItem('loggedIn', 'true');

          // Nếu người dùng là admin, chuyển hướng đến trang quản trị
          if (username === 'admin') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin.html'; // Điều hướng đến trang admin
          } else {
            window.location.href = 'Trangchinh/home.html'; // Điều hướng đến trang chính
          }
        } else {
          console.error('Mật khẩu không đúng');
          alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
      } else {
        console.error('Tên đăng nhập không tồn tại');
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    }).catch(error => {
      console.error('Lỗi khi kiểm tra dữ liệu người dùng:', error);
      alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
    });
  }
});

// Hiển thị mật khẩu
document.getElementById('toggle-password').addEventListener('click', function() {
  const passwordField = document.getElementById('password');
  const eyeIcon = document.getElementById('toggle-password');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.src = 'images/mo.png'; // Hình ảnh con mắt mở
  } else {
    passwordField.type = 'password';
    eyeIcon.src = 'images/dong.png'; // Hình ảnh con mắt đóng
  }
});
