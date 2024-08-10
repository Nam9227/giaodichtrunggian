// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// Xử lý đăng ký
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const email = document.getElementById('email').value;

  if (username && password && email) {
    // Lưu thông tin người dùng vào Firebase Realtime Database
    database.ref('users/' + username).set({
      username: username,
      password: password,  // Chú ý: Lưu mật khẩu trực tiếp không an toàn, nên mã hóa mật khẩu trước khi lưu
      email: email
    }).then(() => {
      alert('Đăng ký thành công! Bạn có thể đăng nhập bây giờ.');
      window.location.href = 'login.html'; // Chuyển đến trang đăng nhập
    }).catch((error) => {
      console.error('Lỗi khi lưu dữ liệu:', error);
      alert('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
    });
  } else {
    alert('Vui lòng nhập đầy đủ thông tin.');
  }
});
