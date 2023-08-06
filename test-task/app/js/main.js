"use strict";

const backButton = document.querySelector("#backButton");
const searchButton = document.querySelector("#searchButton");
const addButtonList = document.querySelectorAll(".card__btn-add");
const artistField = document.querySelector("#artistField");

const ADD_BUTTON_STATUSES = {
  ADD: "Add",
  REMOVE: "Remove",
};

// set current status for card on page load
addButtonList.forEach((btn) => {
  handleToggleCardAddButton(btn, "load");
});

// set current status for card on click
addButtonList.forEach((btn) => {
  btn.addEventListener("click", () => {
    handleToggleCardAddButton(btn);
  });
});

// handle artist input typing
artistField.addEventListener("input", handleTypeArtistField);

// handle click back button
backButton.addEventListener("click", handleGoBack);

function handleToggleCardAddButton(btn, action = "click") {
  const cardId = btn.closest(".card").dataset.cardId;
  const cardText = btn.querySelector("span");
  const key = `card_${cardId}`;
  const isAdded = localStorage.getItem(key) === ADD_BUTTON_STATUSES.REMOVE;

  // Тут використав більш простий варіант додавання в localStorage. Бажано все зберігати в масиві, якщо необхідно, то можу переробити :)

  if (isAdded) {
    if (action !== "load") {
      localStorage.removeItem(key);
      cardText.textContent = ADD_BUTTON_STATUSES.ADD;
      btn.classList.remove("card__btn-add_active");

      return;
    }

    cardText.textContent = ADD_BUTTON_STATUSES.REMOVE;
    btn.classList.add("card__btn-add_active");

    return;
  }

  if (action !== "load") {
    localStorage.setItem(key, ADD_BUTTON_STATUSES.REMOVE);
    cardText.textContent = ADD_BUTTON_STATUSES.REMOVE;
    btn.classList.add("card__btn-add_active");

    return;
  }

  cardText.textContent = ADD_BUTTON_STATUSES.ADD;
  btn.classList.remove("card__btn-add_active");
}

function handleTypeArtistField() {
  const input = this;
  const inputError = input.closest(".form__field").querySelector(".error");
  const inputValueLength = input.value.length;
  const isValidLength = inputValueLength <= 10;

  if (!isValidLength) {
    inputError.classList.add("active");
    searchButton.setAttribute("disabled", true);

    return;
  }

  inputError.classList.remove("active");
  searchButton.removeAttribute("disabled");
}

function handleGoBack() {
  history.back();
}
