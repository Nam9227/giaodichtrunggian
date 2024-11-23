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
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        try {
            // Lấy thông tin user và hiển thị
            const username = user.displayName || user.email.split('@')[0]; // Dùng email nếu không có displayName
            console.log("Đã đăng nhập với user:", username);

            // Truy vấn dữ liệu từ Firebase Database
            const snapshot = await firebase.database().ref('users/' + username).once('value');

            if (snapshot.exists()) {
                const userData = snapshot.val();
                console.log("Dữ liệu người dùng:", userData);

                // Hiển thị thông tin fullname và balance
                document.getElementById("username").innerHTML = `Xin chào, <strong>${userData.fullname}</strong>`;
                document.getElementById("balance").innerHTML = `Số dư: <strong>${Number(userData.balance).toLocaleString()} VNĐ</strong>`;
            } else {
                console.error("Người dùng không tồn tại trong cơ sở dữ liệu.");
                document.getElementById("username").innerHTML = `Xin chào, <strong>Không xác định</strong>`;
                document.getElementById("balance").innerHTML = `Số dư: <strong>0 VNĐ</strong>`;
            }
        } catch (error) {
            console.error("Lỗi khi truy vấn dữ liệu từ Firebase:", error);
        }
    } else {
        // Nếu chưa đăng nhập, chuyển hướng về trang chủ
        console.log("Người dùng chưa đăng nhập. Chuyển hướng về trang chủ.");
        window.location.href = "index.html"; // Trang chủ
    }
});

// Xử lý nút đăng xuất
document.getElementById("logout-btn").addEventListener("click", async function () {
    try {
        await firebase.auth().signOut();
        console.log("Đăng xuất thành công.");
        window.location.href = "index.html"; // Chuyển hướng về trang chủ
    } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
    }
});
