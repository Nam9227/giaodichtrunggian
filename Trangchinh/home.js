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
            console.log("Người dùng đã đăng nhập:", user);

            // Truy vấn toàn bộ dữ liệu người dùng
            const usersRef = firebase.database().ref('users');
            const snapshot = await usersRef.once('value');

            if (snapshot.exists()) {
                const users = snapshot.val();
                let userData = null;

                // Lọc dữ liệu theo email
                for (const key in users) {
                    if (users[key].email === user.email) {
                        userData = users[key];
                        break;
                    }
                }

                if (userData) {
                    console.log("Dữ liệu người dùng tìm thấy:", userData);

                    // Hiển thị fullname và balance
                    document.getElementById("username").innerHTML = `Xin chào, <strong>${userData.fullname}</strong>`;
                    document.getElementById("balance").innerHTML = `Số dư: <strong>${Number(userData.balance).toLocaleString()} VNĐ</strong>`;
                } else {
                    console.error("Không tìm thấy dữ liệu người dùng trong cơ sở dữ liệu.");
                    document.getElementById("username").innerHTML = "Xin chào, <strong>Người dùng</strong>";
                    document.getElementById("balance").innerHTML = "Số dư: <strong>0 VNĐ</strong>";
                }
            } else {
                console.error("Không có dữ liệu người dùng trong cơ sở dữ liệu.");
            }
        } catch (error) {
            console.error("Lỗi khi truy vấn dữ liệu Firebase:", error);
        }
    } else {
        // Nếu chưa đăng nhập, chuyển hướng về trang index.html
        console.log("Người dùng chưa đăng nhập. Chuyển hướng về index.html.");
        window.location.href = "index.html";
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
