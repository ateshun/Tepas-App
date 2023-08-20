const addItemsForm = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const itemName = this.querySelector("[name=item]").value;
  const item = {
    name: itemName,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;
  const element = e.target;
  const index = element.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates
    .map((plate, index) => {
      return `
                <li>
                    <input
                        type="checkbox"
                        data-index=${index}
                        id="item${index}"
                        ${plate.done ? "checked" : ""}
                    />
                    <label for="item${index}">${plate.name}</label>
                    <button class="delete-button" data-index=${index}>×</button>
                </li>
            `;
    })
    .join("");
}

addItemsForm.addEventListener("submit", addItem);
itemsList.addEventListener("click", function (e) {
  if (e.target.matches(".delete-button")) {
    const index = e.target.dataset.index;
    deleteItem(index);
  } else {
    toggleDone(e);
  }
});

populateList(items, itemsList);
