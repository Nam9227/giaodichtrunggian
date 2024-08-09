// Thêm chức năng xử lý sự kiện cho form (ví dụ đơn giản)
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Ngăn chặn việc gửi form để xử lý logic tùy chỉnh
  alert('Tin nhắn của bạn đã được gửi. Cảm ơn bạn!');
});
