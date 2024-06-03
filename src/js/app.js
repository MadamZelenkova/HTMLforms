const button = document.querySelector(".btn");

function createTooltip() {
  const tooltip = document.querySelector(".popover");

  if (!tooltip) {
    const tooltip = document.createElement("div");
    tooltip.classList.add("popover");

    const arrow = document.createElement("div");
    arrow.classList.add("arrow");

    const header = document.createElement("div");
    header.classList.add("popover-header");
    header.textContent = "Popover title";

    const popoverBody = document.createElement("div");
    popoverBody.classList.add("popover-body");
    popoverBody.textContent =
      "And here's some amazing content. It's very engaging. Right?";

    const body = document.getElementsByTagName("body")[0];

    tooltip.appendChild(arrow);
    tooltip.appendChild(header);
    tooltip.appendChild(popoverBody);
    body.appendChild(tooltip);
    tooltip.style.display = "block";

    const { left, top } = button.getBoundingClientRect();
    tooltip.style.left =
      left + button.offsetWidth / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.bottom = top + "px";
  } else {
    if (tooltip.style.display === "block") {
      tooltip.style.display = "none";
    } else {
      tooltip.style.display = "block";
    }
  }
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  createTooltip();
});
