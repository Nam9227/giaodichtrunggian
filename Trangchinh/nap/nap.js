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
        window.location.href = "../index.html";
    }
});

// Xử lý form nạp tiền
// Firebase Configuration và phần kiểm tra đăng nhập giữ nguyên

// Sau khi lấy được userData, thêm dòng này
document.getElementById("username-transfer").textContent = userData.username; // Hoặc trường định danh

// Xử lý form nạp tiền
document.getElementById("nap-tien-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const statusMessage = document.getElementById("status-message");

    const soTien = document.getElementById("so-tien").value;
    const user = firebase.auth().currentUser;

    if (!user || !soTien || soTien < 1000) {
        statusMessage.textContent = "Vui lòng nhập số tiền hợp lệ (≥1,000 VNĐ)";
        statusMessage.className = "status-message error";
        statusMessage.style.display = "block";
        return;
    }

    try {
        // Lấy thông tin người dùng
        const userSnapshot = await firebase.database().ref(`users/${user.uid}`).once('value');
        const userData = userSnapshot.val();

        // Tạo yêu cầu nạp tiền
        const newRequestRef = firebase.database().ref('napTienPending').push();
        await newRequestRef.set({
            userId: user.uid,
            username: userData.username,
            amount: soTien,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            status: "pending"
        });

        // Hiển thị thông báo
        statusMessage.innerHTML = `
            Yêu cầu nạp <strong>${Number(soTien).toLocaleString()} VNĐ</strong> đã được gửi!<br>
            Vui lòng chờ admin xác nhận trong 5-15 phút.
        `;
        statusMessage.className = "status-message pending";
        statusMessage.style.display = "block";

        // Theo dõi trạng thái yêu cầu
        newRequestRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data.status === "approved") {
                statusMessage.innerHTML = `
                    Nạp tiền thành công!<br>
                    Số dư mới: <strong>${Number(userData.balance + parseInt(soTien)).toLocaleString()} VNĐ</strong>
                `;
                statusMessage.className = "status-message success";
                newRequestRef.off(); // Ngừng theo dõi
            } else if (data.status === "rejected") {
                statusMessage.textContent = "Yêu cầu bị từ chối. Liên hệ admin để biết thêm chi tiết.";
                statusMessage.className = "status-message error";
                newRequestRef.off();
            }
        });

    } catch (error) {
        console.error("Lỗi:", error);
        statusMessage.textContent = "Có lỗi xảy ra! Vui lòng thử lại hoặc liên hệ hỗ trợ.";
        statusMessage.className = "status-message error";
        statusMessage.style.display = "block";
    }
});