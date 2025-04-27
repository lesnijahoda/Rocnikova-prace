
export let purchaseMultiplier = 1;

export function setupMultiplierButtons() {
  const buttons = document.querySelectorAll(".multiplier-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      purchaseMultiplier = parseInt(button.dataset.value);
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}