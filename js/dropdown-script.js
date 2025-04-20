"use strict";

const dropdowns = document.querySelectorAll(".custom-dropdown");
if (dropdowns.length > 0) {
  dropdowns.forEach((dropdown) => {
    const display = dropdown.querySelector(".custom-dropdown__selected");
    const arrow = dropdown.querySelector(".custom-dropdown__arrow");
    const optionsContainer = dropdown.querySelector(
      ".custom-dropdown__options"
    );
    const options = dropdown.querySelectorAll(".custom-dropdown__option");

    dropdown.addEventListener("click", () => {
      const isActive = dropdown.classList.contains("active");

      closeAllDropdowns();

      if (!isActive) {
        toggleDropdown(dropdown, arrow, true);
      }
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        display.innerHTML = option.innerHTML;
        dropdown.classList.add("selected");
      });
    });
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      const arrow = dropdown.querySelector(".custom-dropdown__arrow");
      toggleDropdown(dropdown, arrow, false);
    });
  }

  function toggleDropdown(dropdown, arrow, open) {
    dropdown.classList.toggle("active", open);
    arrow.classList.toggle("rotated", open);
  }
}
