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

// Create admin account if not exists
window.onload = function() {
  // Check if admin exists
  database.ref('users/admin').once('value', (snapshot) => {
    if (!snapshot.exists()) {
      // Create admin account using Firebase Authentication
      auth.createUserWithEmailAndPassword('admin@example.com', 'admin922007') // Email and password for admin
        .then(() => {
          console.log('Admin account created via Firebase Authentication.');
        })
        .catch((error) => {
          console.error('Error creating admin account:', error);
        });
    }
  });
};

// Handle login with username and password
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim(); // Get username
  const password = document.getElementById('password').value.trim(); // Get password

  // Check if the username exists in Firebase Realtime Database
  database.ref('users/' + username).once('value').then(snapshot => {
    if (snapshot.exists()) {
      const userData = snapshot.val(); // Get user data from Firebase
      const storedPassword = userData.password; // Get stored password for comparison

      // Compare entered password with stored password
      if (password === storedPassword) {
        console.log('Login successful:', username);
        
        // Store login status in localStorage
        localStorage.setItem('loggedIn', 'true');

        // Check if the logged-in user is admin
        if (username === 'admin') {
          localStorage.setItem('isAdmin', 'true');
          window.location.href = 'admin.html'; // Redirect to admin page
        } else {
          window.location.href = 'Trangchinh/home.html'; // Redirect to home page
        }
      } else {
        console.error('Incorrect password');
        alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    } else {
      console.error('Username does not exist');
      alert('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  }).catch(error => {
    console.error('Error checking user data:', error);
    alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
  });
});

// Toggle password visibility
document.getElementById('toggle-password').addEventListener('click', function() {
  const passwordField = document.getElementById('password');
  const eyeIcon = document.getElementById('toggle-password');

  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    eyeIcon.src = 'images/mo.png'; // Open eye icon
  } else {
    passwordField.type = 'password';
    eyeIcon.src = 'images/dong.png'; // Closed eye icon
  }
});
