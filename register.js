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

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Xử lý gửi mã xác thực
document.getElementById('send-verification-code').addEventListener('click', function() {
  const email = document.getElementById('email').value;

  if (email) {
    const actionCodeSettings = {
      url: 'http://localhost:8000/verify-email.html',
      handleCodeInApp: true
    };

    auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
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
    const emailForSignIn = window.localStorage.getItem('emailForSignIn');
    
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      firebase.auth().signInWithEmailLink(emailForSignIn, window.location.href)
        .then((result) => {
          const user = result.user;
          console.log('Đăng nhập thành công:', user);
          firebase.database().ref('users/' + username).set({
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
