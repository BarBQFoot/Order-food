const addButton = document.querySelectorAll(".add-to-cart");

 let food = [
  { id: 1, name: "ข้าวผัด", price: 50, type:"อาหารจานเดียว", photo:"https://th.bing.com/th/id/OIP.oKubwCMNqI2sx9jMlUlBpAHaE8?w=251&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3"},
  { id: 2, name: "ผัดไทย", price: 60, type:"อาหารจานเดียว", photo:"https://th.bing.com/th/id/OIP.Q_Y0FOOu9b-yEYTKaoGaxwHaE5?w=258&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3" },
  { id: 3, name: "ผัดซีอิ้ว", price: 50, type:"อาหารจานเดียว", photo:"https://yalamarketplace.com/upload/1648731671847.png"},
  { id: 4, name: "ผัดขี้เมา", price: 55, type:"อาหารจานเดียว", photo:"https://tse1.mm.bing.net/th/id/OIP.D1nSNtlmp7WrSIVdm2ZkwQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 5, name: "แกงจืด", price: 60, type:"ของแกง", photo:"https://th.bing.com/th/id/OIP.XRKJ1t_WX-sQ6eG8U2_xHAHaFj?w=234&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3" },
  { id: 6,name: "กระเพราหมูกรอบ", price: 65, type:"อาหารจานเดียว", photo:"https://tse1.mm.bing.net/th/id/OIP.TPy2xHFTNDyk4ZRGt8aiQAHaE8?pid=ImgDet&w=198&h=132&c=7&dpr=1.1&o=7&rm=3" },
  { id: 7, name: "ต้มยำกุ้ง", price: 90, type:"ของแกง", photo:"https://th.bing.com/th/id/OIP.NJIm9WrbXRDnxUOqr1uq9wHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"},
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  renderFood();   // ✅ วาดอาหารจาก food[]
  remove();       // ✅ ปุ่มล้างตะกร้า
});

// ✅ วาดการ์ดอาหารใส่ .add-food
function renderFood() {
  const foodBox = document.querySelector(".add-food");
  if (!foodBox) return;

  foodBox.innerHTML = "";

  food.forEach((item) => {
    foodBox.innerHTML += `
      <div class="food-card flex flex-col border-t-2 border-black/10 rounded-lg shadow-xl p-3 my-3 hover:-translate-y-1 transition">
        <div class="flex mb-2">
          <img class="h-20 w-20 rounded-lg object-cover"
            src="${item.photo}"
            alt=""
          />
          <div class="px-3">
            <h2 class="text-2xl">${item.name}</h2>
            <p class="text-gray-500">${item.type}</p>
            <h3 class="text-black">${item.price} บาท</h3>
          </div>
        </div>

        <div class="bg-red-500 rounded-lg hover:bg-red-700">
          <button type="button"
            class="add-to-cart w-full text-2xl p-3 text-white"
            >
            + เพิ่มใส่ตะกร้า
          </button>
        </div>
      </div>
    `;
  });

  bindAddToCart(); 
}


function bindAddToCart() {
  const addButtons = document.querySelectorAll(".add-to-cart");

  for(let i=0;i < addButtons.length;i++){
    addButtons[i].addEventListener("click", () => {
    
      const selectedFood = food[i];

      const existItem = cart.find((item) => item.id === selectedFood.id);

      if (existItem) {
        existItem.qty += 1;
      } else {
        cart.push({
          id: selectedFood.id,
          name: selectedFood.name,
          price: selectedFood.price,
          qty: 1,
          type:selectedFood.type,
          photo:selectedFood.photo
        });
      }

      renderCart();
    });

  }


}


function renderCart() {
  const cartList = document.querySelector("#cart-list");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    cartList.innerHTML += `
      <div class="flex flex-col border-t-2 border-black/10 rounded-lg shadow p-3 my-3 hover:-translate-y-1 transition ">
        <div class="flex mb-2">
          <img class="h-20 w-20 rounded-lg object-cover"
            src="${item.photo}"
            alt=""
          />
          <div class="flex flex-1 justify-between px-3">
            <div>
              <span class="text-2xl">${item.name}</span>
              <p class="text-gray-500">${item.type}</p>
            </div>
            <div class="text-right">
              <span class="text-xl">${item.price} x ${item.qty}</span>
              <p class="text-xl">${item.price * item.qty} บาท</p>
            </div>
          </div>
        </div>

        <div class="flex gap-1 rounded-lg">
          <button type="button"
            class="btn-decrease w-1/2 text-2xl p-3 bg-gray-300 rounded-lg hover:bg-gray-500 transition duration-700"
            data-index="${index}">
            - ลด
          </button>
          <button type="button"
            class="btn-delete w-1/2 text-2xl p-3 bg-red-300 rounded-lg hover:bg-red-500 transition duration-700"
            data-index="${index}">
            - ลบ
          </button>
        </div>
      </div>
    `;
  });

  btnDecrease();
  btnDelete();
  renderSummary();
}

function btnDecrease() {
  const DecreaseBtn = document.querySelectorAll(".btn-decrease");
  DecreaseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);

      cart[index].qty -= 1;
      if (cart[index].qty === 0) cart.splice(index, 1);

      renderCart();
    });
  });
}

function btnDelete() {
  const DeleteBtn = document.querySelectorAll(".btn-delete");
  DeleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      cart.splice(index, 1);
      renderCart();
    });
  });
}

function renderSummary() {
  const totalItemEl = document.querySelector(".total-item");
  const totalQtyEl = document.querySelector(".total-qty");
  const totalPriceEl = document.querySelector(".total-price");
  const subPriceEl = document.querySelector(".sub-price");

  const totalItem = cart.length;

  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalQty += item.qty;
    totalPrice += item.price * item.qty;
  });

  totalItemEl.innerText = totalItem;
  totalQtyEl.innerText = totalQty;
  totalPriceEl.innerText = `${totalPrice} บาท`;
  subPriceEl.innerText = `${totalPrice} บาท`;
}

function remove() {
  const removeBtn = document.querySelector(".remove-food");
  if (!removeBtn) return;

  removeBtn.addEventListener("click", () => {
    cart.length = 0;
    renderCart();
  });
}