const $ = document.querySelector.bind(document);

const id = $(".id");
const name = $(".name");
const price = $(".price");
const descriptions = $(".descriptions");
const errorName = $(".errorName");
const errorPrice = $(".errorPrice");

const form = $(".form");
const table = $(".table");
const tbody = $(".tbody");

let listPro = [];
const URL = "http://localhost:3000/products";

async function getPro() {
  const res = await fetch(URL);
  const data = await res.json();
  listPro = [...data];
  displayPro();
}
getPro();

function displayPro() {
  tbody.innerHTML = listPro
    .map(
      (pro, index) => `
    <tr>
      <td>${index}</td>
      <td>${pro.name}</td>
      <td>${pro.price}</td>
      <td><p>${pro.descriptions}</p></td>
      <td>
        <button class="btn btn-primary btnEdit" data-id=${pro.id}>Edit</button>
        <button class="btn btn-danger btnDelete" data-id=${pro.id}>Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
}

async function deletePro(e) {
  e.preventDefault();

  if (e.target.classList.contains("btnDelete")) {
    const idPro = e.target.dataset.id;

    const confirm = window.confirm("Ban chac chan muon xoa ???");

    if (confirm) {
      try {
        await fetch(`${URL}/${idPro}`, {
          method: "DELETE",
        });

        alert("Xoa thanh cong");
        displayPro();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnEdit")) {
    const idPro = e.target.dataset.id;
    id.value = idPro;

    const productEdit = listPro.find((pro) => pro.id === idPro);

    name.value = productEdit.name;
    price.value = productEdit.price;
    descriptions.value = productEdit.descriptions;
  }

  deletePro(e);
});

async function addPro(e) {
  e.preventDefault();
  let flag = false;

  if (name.value.trim() === "") {
    errorName.innerHTML = "Khong duoc de trong ten";
    errorName.style.display = "block";
    flag = true;
  } else {
    errorName.innerHTML = "";
    errorName.style.display = "none";
  }

  if (price.value.trim() === "") {
    errorPrice.innerHTML = "Khong duoc de trong gia";
    errorPrice.style.display = "block";
    flag = true;
    return;
  } else {
    errorPrice.innerHTML = "";
    errorPrice.style.display = "none";
  }

  if (isNaN(price.value)) {
    errorPrice.innerHTML = "Gia san pham phai la so";
    errorPrice.style.display = "block";
    flag = true;
  } else {
    errorPrice.innerHTML = "";
    errorPrice.style.display = "none";
  }

  if (!flag) {
    const newPro = {
      name: name.value,
      price: price.value,
      descriptions: descriptions.value,
    };

    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPro),
    });

    alert("Them san pham thanh cong");
  }
}

form.addEventListener("submit", (e) => {
  if (id.value) return editPro(e);

  addPro(e);
});

async function editPro(e) {
  e.preventDefault();
  let flag = false;

  if (name.value.trim() === "") {
    errorName.innerHTML = "Khong duoc de trong ten";
    errorName.style.display = "block";
    flag = true;
  } else {
    errorName.innerHTML = "";
    errorName.style.display = "none";
  }

  if (price.value.trim() === "") {
    errorPrice.innerHTML = "Khong duoc de trong gia";
    errorPrice.style.display = "block";
    flag = true;
    return;
  } else {
    errorPrice.innerHTML = "";
    errorPrice.style.display = "none";
  }

  if (isNaN(price.value)) {
    errorPrice.innerHTML = "Gia san pham phai la so";
    errorPrice.style.display = "block";
    flag = true;
  } else {
    errorPrice.innerHTML = "";
    errorPrice.style.display = "none";
  }

  if (!flag) {
    const newPro = {
      name: name.value,
      price: price.value,
      descriptions: descriptions.value,
    };

    await fetch(`${URL}/${id.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPro),
    });

    alert("Sua san pham thanh cong");
  }
}
