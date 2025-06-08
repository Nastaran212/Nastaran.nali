
const localStorageKey = "customers";

function getCustomers() {
  return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function saveCustomers(customers) {
  localStorage.setItem(localStorageKey, JSON.stringify(customers));
}

function addCustomer() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value.trim();
  const service = document.getElementById("service").value.trim();

  if (!name || !phone || !date || !service) {
    alert("لطفاً همه فیلدها را پر کنید.");
    return;
  }

  const customers = getCustomers();
  const existing = customers.find(c => c.phone === phone);
  if (existing) {
    alert("شماره تماس قبلاً ثبت شده.");
    return;
  }

  customers.push({ name, phone, date, service, hearts: 0 });
  saveCustomers(customers);
  alert("مشتری با موفقیت اضافه شد.");
  location.reload();
}

function renderCustomers() {
  const list = document.getElementById("customerList");
  const customers = getCustomers();
  list.innerHTML = "";
  customers.forEach(customer => {
    const li = document.createElement("li");
    li.textContent = `${customer.name} - ${customer.phone}`;
    li.onclick = () => showCard(customer.phone);
    list.appendChild(li);
  });
}

function searchCustomer() {
  const phone = document.getElementById("searchPhone").value.trim();
  showCard(phone);
}

function showCard(phone) {
  const customer = getCustomers().find(c => c.phone === phone);
  const container = document.getElementById("cardContainer") || document.createElement("div");
  container.id = "cardContainer";
  container.innerHTML = "";

  if (!customer) {
    container.innerHTML = "<p>شماره شما ثبت نشده است.</p>";
    document.body.appendChild(container);
    return;
  }

  const name = document.createElement("h3");
  name.textContent = `نام: ${customer.name}`;
  const phoneNum = document.createElement("p");
  phoneNum.textContent = `شماره: ${customer.phone}`;
  const date = document.createElement("p");
  date.textContent = `تاریخ: ${customer.date}`;
  const service = document.createElement("p");
  service.textContent = `خدمات: ${customer.service}`;

  const hearts = document.createElement("div");
  for (let i = 0; i < 7; i++) {
    const heart = document.createElement("span");
    heart.textContent = "❤";
    heart.classList.add("heart");
    if (i < customer.hearts) heart.classList.add("filled");
    hearts.appendChild(heart);
  }

  container.append(name, phoneNum, date, service, hearts);
  document.body.appendChild(container);
}

if (document.getElementById("customerList")) renderCustomers();
