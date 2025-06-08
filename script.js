
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const customerForm = document.getElementById('customer-form');
    const customerList = document.getElementById('customer-list');
    const customerDetails = document.getElementById('customer-details');
    const showCardBtn = document.getElementById('show-card-btn');
    const phoneInput = document.getElementById('phone-input');
    const customerCard = document.getElementById('customer-card');
    const loyaltyCircles = document.querySelectorAll('.circle');
    const reward1 = document.getElementById('reward1');
    const reward2 = document.getElementById('reward2');
    const reward3 = document.getElementById('reward3');

    const password = "Jikook13";

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const inputPassword = document.getElementById('password').value;
            if (inputPassword === password) {
                window.location.href = "admin.html";
            } else {
                alert("رمز اشتباه است!");
            }
        });
    }

    let customers = JSON.parse(localStorage.getItem('customers') || '[]');

    function saveCustomers() {
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    if (customerForm) {
        customerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;
            const visits = parseInt(document.getElementById('visits').value);

            const existing = customers.find(c => c.phone === phone);
            if (existing) {
                existing.name = name;
                existing.date = date;
                existing.service = service;
                existing.visits = visits;
            } else {
                customers.push({ name, phone, date, service, visits });
            }

            saveCustomers();
            displayCustomerList();
            customerForm.reset();
        });
    }

    function displayCustomerList() {
        if (!customerList) return;
        customerList.innerHTML = '';
        customers.forEach(customer => {
            const li = document.createElement('li');
            li.textContent = `${customer.name} - ${customer.phone}`;
            li.addEventListener('click', () => showCustomerDetails(customer));
            customerList.appendChild(li);
        });
    }

    function showCustomerDetails(customer) {
        if (!customerDetails) return;
        customerDetails.innerHTML = `
            <p>نام: ${customer.name}</p>
            <p>شماره: ${customer.phone}</p>
            <p>تاریخ: ${customer.date}</p>
            <p>نوع خدمات: ${customer.service}</p>
            <p>تعداد مراجعه: ${customer.visits}</p>
            <button onclick="deleteCustomer('${customer.phone}')">حذف</button>
        `;
        updateCard(customer.visits);
    }

    window.deleteCustomer = function (phone) {
        customers = customers.filter(c => c.phone !== phone);
        saveCustomers();
        displayCustomerList();
        if (customerDetails) customerDetails.innerHTML = '';
    };

    function updateCard(visits) {
        if (!customerCard) return;
        loyaltyCircles.forEach((circle, index) => {
            if (index < visits) {
                circle.classList.add('filled');
            } else {
                circle.classList.remove('filled');
            }
        });

        reward1.classList.toggle('active', visits >= 3);
        reward2.classList.toggle('active', visits >= 5);
        reward3.classList.toggle('active', visits >= 7);
    }

    if (showCardBtn) {
        showCardBtn.addEventListener('click', function () {
            const phone = phoneInput.value.trim();
            const customer = customers.find(c => c.phone === phone);
            if (customer) {
                updateCard(customer.visits);
                customerCard.classList.remove('hidden');
            } else {
                alert("شماره شما ثبت نشده است.");
            }
        });
    }

    displayCustomerList();
});
