// crudcrud api url: https://crudcrud.com/api/a2b4da89fdfc44c28f11754d8bcd419b
const apiUrl = "https://crudcrud.com/api/a2b4da89fdfc44c28f11754d8bcd419b";

function registerCustomer(event) {
  event.preventDefault();

  const url = `${apiUrl}/clientes`;

  const name = document.querySelector(
    ".container-cadastro .formulario #nome"
  ).value;
  const email = document.querySelector(
    ".container-cadastro .formulario #email"
  ).value;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao enviar para a api: " + res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      const newItem = document.createElement("li");
      newItem.textContent = `${data.name} (${data.email})`;

      const btn = document.createElement("button");
      btn.textContent = "X";
      btn.addEventListener("click", () => removeCustomer(data._id, btn));

      newItem.appendChild(btn);
      document.querySelector(".container-listagem ul").appendChild(newItem);
    })
    .catch((error) => console.error(error));
}

function removeCustomer(id, buttonElement) {
  const url = `${apiUrl}/clientes/${id}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao excluir: " + res.statusText);
      }
      buttonElement.parentElement.remove();
    })
    .catch((error) => console.error(error));
}

function loadCustomers() {
  const url = `${apiUrl}/clientes/`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao receber da api: " + res.statusText);
      }
      return res.json();
    })
    .then((data) => {
      data.forEach((customer) => {
        const newItem = document.createElement("li");
        newItem.textContent = `${customer.name} (${customer.email})`;

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.addEventListener("click", () => removeCustomer(customer._id, btn));

        newItem.appendChild(btn);
        document.querySelector(".container-listagem ul").appendChild(newItem);
      });
    })
    .catch((error) => console.error(error));
}

const submitBtn = document.querySelector(
  ".container-cadastro .formulario #submit"
);

submitBtn.addEventListener("click", registerCustomer);
window.addEventListener("load", loadCustomers);
