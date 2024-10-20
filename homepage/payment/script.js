const paymentMethods = document.querySelectorAll('.payment-methods img');
const orderInfo = document.querySelector('.order-info');
const paymentDetails = document.querySelector('.payment-details');
const qrCode = document.querySelector('.qr-code');
const selectedMethod = document.querySelector('.selected-method');
const selectedMethodText = document.getElementById('selected-method-text');
const invoiceDateElement = document.getElementById('invoice-date');

function getCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        orderInfo.classList.remove('hidden');
        selectedMethod.classList.remove('hidden');
        selectedMethodText.textContent = method.alt;
        
        // Cập nhật ngày và giờ lập hoá đơn
        invoiceDateElement.textContent = getCurrentDateTime();
        
        if (method.dataset.method === 'momo' || method.dataset.method === 'bank') {
            paymentDetails.classList.add('hidden');
            qrCode.classList.remove('hidden');
        } else {
            paymentDetails.classList.remove('hidden');
            qrCode.classList.add('hidden');
        }

        // Reset các form
        document.querySelectorAll('form').forEach(form => form.reset());
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelector('.payment-methods');
    const selectedMethod = document.querySelector('.selected-method');
    const selectedMethodText = document.getElementById('selected-method-text');
    const momoInfo = document.querySelector('.momo-info');
    const bankInfo = document.querySelector('.bank-info');
    const paymentDetails = document.querySelector('.payment-details');
    const copyButtons = document.querySelectorAll('.copy-btn');

    paymentMethods.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            const method = event.target.getAttribute('data-method');
            selectedMethodText.textContent = event.target.alt;
            selectedMethod.classList.remove('hidden');

            // Ẩn tất cả các phần thanh toán
            momoInfo.classList.add('hidden');
            bankInfo.classList.add('hidden');
            paymentDetails.classList.add('hidden');

            // Hiển thị phần tương ứng với phương thức thanh toán
            if (method === 'momo') {
                momoInfo.classList.remove('hidden');
            } else if (method === 'bank') {
                bankInfo.classList.remove('hidden');
            } else {
                paymentDetails.classList.remove('hidden');
            }
        }
    });

    // Xử lý chức năng copy
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const copyTarget = this.getAttribute('data-copy');
            const textToCopy = document.getElementById(copyTarget).textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Đã sao chép: ' + textToCopy);
            }).catch(err => {
                console.error('Không thể sao chép: ', err);
            });
        });
    });
});