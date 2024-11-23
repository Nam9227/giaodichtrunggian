// Firebase Configuration
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

// Kiểm tra trạng thái đăng nhập
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Nếu đã đăng nhập, lấy thông tin user và hiển thị
        const username = user.displayName || "unknownUser"; // Có thể tùy chỉnh lấy từ user

        firebase.database().ref('users/' + username).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();

                    // Hiển thị fullname và balance
                    document.getElementById("username").innerHTML = `Xin chào, <strong>${userData.fullname}</strong>`;
                    document.getElementById("balance").innerHTML = `Số dư: <strong>${userData.balance.toLocaleString()} VNĐ</strong>`;
                } else {
                    console.error("Người dùng không tồn tại trong cơ sở dữ liệu.");
                }
            })
            .catch(error => {
                console.error("Lỗi khi truy vấn dữ liệu từ Firebase:", error);
            });
    } else {
        // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
        window.location.href = "../login.html";
    }
});

// Xử lý nút đăng xuất
document.getElementById("logout-btn").addEventListener("click", function () {
    firebase.auth().signOut()
        .then(() => {
            console.log("Đăng xuất thành công.");
            window.location.href = "../login.html"; // Chuyển hướng về trang đăng nhập
        })
        .catch(error => {
            console.error("Lỗi khi đăng xuất:", error);
        });
});
