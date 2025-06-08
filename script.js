
document.getElementById("addCustomerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const service = document.getElementById("service").value;

    const customer = { name, phone, date, service };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));

    alert("مشتری با موفقیت افزوده شد.");
    displayCustomers();
    this.reset();
});

function displayCustomers() {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const list = document.getElementById("customerList");
    list.innerHTML = "";
    customers.forEach((cust, index) => {
        const item = document.createElement("li");
        item.innerHTML = `<strong>${cust.name}</strong> - ${cust.phone} - ${cust.date}<br>خدمات: ${cust.service}`;
        list.appendChild(item);
    });
}

window.onload = displayCustomers;
