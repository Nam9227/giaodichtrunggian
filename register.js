// Thay vì import, sử dụng Firebase từ CDN

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
