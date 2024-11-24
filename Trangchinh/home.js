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

                    // Thêm thông báo trạng thái
                    document.getElementById("user-status").innerHTML = `Tài khoản: ${userData.email}`;
                } else {
                    console.error("Không tìm thấy dữ liệu người dùng trong cơ sở dữ liệu.");
                    document.getElementById("username").innerHTML = "Xin chào, <strong>Người dùng</strong>";
                    document.getElementById("balance").innerHTML = "Số dư: <strong>0 VNĐ</strong>";
                    document.getElementById("user-status").innerHTML = "Không xác định tài khoản.";
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
        window.location.href = "../index.html";
    }
});

// Xử lý nút đăng xuất
document.getElementById("logout-btn").addEventListener("click", async function () {
    try {
        // Xác nhận đăng xuất
        const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (!confirmLogout) {
            console.log("Người dùng đã hủy đăng xuất.");
            return;
        }
        // 1. Xóa token xác thực
        await firebase.auth().signOut();
        console.log("Token Firebase đã bị xóa.");

        // 2. Xóa dữ liệu cục bộ
        localStorage.clear(); // Xóa toàn bộ localStorage
        sessionStorage.clear(); // Xóa toàn bộ sessionStorage
        console.log("Dữ liệu cục bộ đã bị xóa.");

        // 3. Xóa cookies (nếu cần, ví dụ khi bạn lưu JWT hoặc dữ liệu khác vào cookies)
        document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log("Cookies đã bị xóa.");
        
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("isAdmin");
        
        // 4. Chuyển hướng về trang đăng nhập
        window.location.href = "../index.html"; // Trang đăng nhập hoặc trang chủ
    } catch (error) {
        console.error("Đã xảy ra lỗi khi đăng xuất:", error);
        alert("Lỗi khi đăng xuất. Vui lòng thử lại!");
    }
});

// Chuyển hướng đến bena.html
function goToPayment() {
    window.location.href = "bena.html"; // Chuyển hướng đến bena.html
}

// Chuyển hướng đến benb.html
function goToExchange() {
    window.location.href = "benb.html"; // Chuyển hướng đến benb.html
}

// Cập nhật trạng thái người dùng
function updateUserStatus(message) {
    document.getElementById("user-status").innerHTML = message;
}
