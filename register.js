// Initialize Firebase
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

window.onload = async function() {
  try {
    // Tạo tài khoản admin mặc định nếu chưa tồn tại
    const snapshot = await database.ref('users/admin').once('value');
    if (!snapshot.exists()) {
      const adminUser = {
        username: 'admin',
        password: 'admin922007' // Mật khẩu mặc định cho tài khoản admin
      };
      await database.ref('users/admin').set(adminUser);
      console.log('Tài khoản admin mặc định đã được tạo.');
    }
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản admin:', error);
  }
};

// Xử lý đăng nhập
document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const snapshot = await database.ref('users/' + username).once('value');
    const storedUser = snapshot.val();

    if (storedUser && password === storedUser.password) {
      alert('Đăng nhập thành công!');
      
      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('loggedIn', 'true');
      
      if (username === 'admin' && password === 'admin922007') {
        // Lưu trạng thái đăng nhập admin vào localStorage
        localStorage.setItem('isAdmin', 'true');
        // Điều hướng đến trang quản trị
        window.location.href = 'admin.html';
      } else {
        // Điều hướng đến trang chính
        window.location.href = 'home.html';
      }
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  } catch (error) {
    console.error('Lỗi khi kiểm tra tài khoản:', error);
    alert('Có lỗi xảy ra khi kiểm tra tài khoản. Vui lòng thử lại.');
  }
});
