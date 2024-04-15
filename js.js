const buton = document.querySelector(".buton");
const tbody = document.querySelector("tbody");
let allow = true;
let oldValues = [];

const orderRow = () => {
  const rows = [...document.querySelectorAll("tbody tr")];
  rows.map((reveal, go) => {
    reveal.querySelector("td").textContent = go + 1;
  });
};

const saveData = (Event) => {
  console.log(Event.target);
  const inputs = [...document.querySelectorAll("input")];
  inputs.map((input) => {
    input.parentElement.textContent = input.value;
  });

  Event.target.textContent = "Düzəliş et";
  Event.target.classList.remove("saveBtn");
  Event.target.classList.add("editBtn");
  Event.target.removeEventListener("click", saveData);
  Event.target.addEventListener("click", editData);


  Event.target.nextElementSibling.textContent = "Sil";
  Event.target.nextElementSibling.classList.remove("cancelBtn");
  Event.target.nextElementSibling.classList.add("deleteBtn");
  Event.target.nextElementSibling.removeEventListener("click", cancelData);
  Event.target.nextElementSibling.addEventListener("click", removeData);
  allow = true;
};

const editData = (Easy) => {
  oldValues.length = 0;
  const cells = [...Easy.target.closest("tr").querySelectorAll("td")].slice(1, 4);
  cells.map((td) => {
    const input = document.createElement("input");
    input.value = td.textContent;
    oldValues.push(td.textContent);
    td.textContent = "";
    td.append(input);
  });

  Easy.target.textContent = "Yadda saxla";
  Easy.target.classList.remove("editBtn");
  Easy.target.classList.add("saveBtn");
  Easy.target.removeEventListener("click", editData);
  Easy.target.addEventListener("click", saveData);
  Easy.target.nextElementSibling.textContent = "Ləğv et";
  Easy.target.nextElementSibling.classList.remove("deleteBtn");
  Easy.target.nextElementSibling.classList.add("cancelBtn");
  Easy.target.nextElementSibling.removeEventListener("click", removeData);
  Easy.target.nextElementSibling.addEventListener("click", cancelData);
};

const cancelData = (Enter) => {
  const inputs = [...document.querySelectorAll("input")];
  inputs.map((input, key) => {
    input.parentElement.textContent = oldValues[key];

    Enter.target.textContent = "Sil";
    Enter.target.classList.remove("cancelBtn");
    Enter.target.classList.add("deleteBtn");
    Enter.target.removeEventListener("click", cancelData);
    Enter.target.addEventListener("click", removeData);

    Enter.target.previousElementSibling.textContent = "Düzəliş et";
    Enter.target.previousElementSibling.classList.remove("saveBtn");
    Enter.target.previousElementSibling.classList.add("editBtn");
    Enter.target.previousElementSibling.removeEventListener("click", saveData);
    Enter.target.previousElementSibling.addEventListener("click", editData);
  });
};

const removeData = (first) => {
  first.target.closest("tr").remove();
  allow = true;
  orderRow();
};

buton.addEventListener("click", () => {
  if (!allow) {
    alert("Xanaları boş buraxmaq olmaz, xaiş edirik doldurun:)");
    return;
  }
  allow = false;
  const reveal = document.createElement("tr");
  const noTd = document.createElement("td");
  const nameTd = document.createElement("td");
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("placeholder", "Ad");
  nameTd.append(nameInput);
  const surnameTd = document.createElement("td");
  const surnameInput = document.createElement("input");
  surnameInput.setAttribute("type", "text");
  surnameInput.setAttribute("placeholder", "Soyad");
  surnameTd.append(surnameInput);
  const ageTd = document.createElement("td");
  const ageInput = document.createElement("input");
  ageInput.setAttribute("type", "number");
  ageInput.setAttribute("placeholder", "Yaş");
  ageTd.append(ageInput);
  const optionsTd = document.createElement("td");
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Yadda saxla";
  saveBtn.classList.add("saveBtn");
  saveBtn.addEventListener("click", saveData);
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Ləğv et";
  cancelBtn.classList.add("deleteBtn");
  optionsTd.append(saveBtn, cancelBtn);
  reveal.append(noTd, nameTd, surnameTd, ageTd, optionsTd);
  tbody.append(reveal);
  orderRow();
});

