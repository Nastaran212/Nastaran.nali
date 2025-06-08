
// script.js

// نمونه لیست مشتری‌ها
let customers = JSON.parse(localStorage.getItem('customers')) || [];

// تابع برای ذخیره مشتری در localStorage
function saveCustomers() {
    localStorage.setItem('customers', JSON.stringify(customers));
}

// افزودن مشتری جدید
function addCustomer() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value.trim();
    const service = document.getElementById('service').value.trim();

    if (name && phone && date && service) {
        const existingIndex = customers.findIndex(c => c.phone === phone);
        if (existingIndex !== -1) {
            customers[existingIndex] = { name, phone, date, service, stamps: customers[existingIndex].stamps };
        } else {
            customers.push({ name, phone, date, service, stamps: 1 });
        }

        saveCustomers();
        alert('مشتری با موفقیت ثبت شد.');
        document.getElementById('customerForm').reset();
    } else {
        alert('لطفاً همه فیلدها را پر کنید.');
    }
}

// حذف مشتری
function deleteCustomer(phone) {
    customers = customers.filter(c => c.phone !== phone);
    saveCustomers();
    listCustomers();
}

// نمایش لیست مشتری‌ها
function listCustomers() {
    const list = document.getElementById('customerList');
    list.innerHTML = '';
    customers.forEach(c => {
        const item = document.createElement('li');
        item.innerHTML = `${c.name} - ${c.phone} <button onclick="showCard('${c.phone}')">کارت</button> <button onclick="deleteCustomer('${c.phone}')">حذف</button>`;
        list.appendChild(item);
    });
}

// نمایش کارت وفاداری
function showCard(phoneInput = null) {
    const phone = phoneInput || document.getElementById('loginPhone').value.trim();
    const customer = customers.find(c => c.phone === phone);

    const cardContainer = document.getElementById('cardContainer');
    const card = document.getElementById('loyaltyCard');
    const info = document.getElementById('customerInfo');

    if (customer) {
        info.innerHTML = `<h2>${customer.name}</h2><p>تاریخ مراجعه: ${customer.date}</p><p>نوع خدمات: ${customer.service}</p>`;
        let circles = '';
        for (let i = 1; i <= 7; i++) {
            if (i <= customer.stamps) {
                circles += '<div class="circle filled">💜</div>';
            } else {
                circles += '<div class="circle empty"></div>';
            }
        }
        document.getElementById('circles').innerHTML = circles;
        cardContainer.style.display = 'block';
    } else {
        alert('شماره شما ثبت نشده است.');
    }
}
