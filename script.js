window.addEventListener("DOMContentLoaded", () => {
const svg = document.getElementById("Layer_1");


svg.addEventListener("mousedown", () => {
    svg.classList.add("grow");
});


svg.addEventListener("mouseup", () => {
    svg.classList.remove("grow");
});

svg.addEventListener("mouseleave", () => {
    svg.classList.remove("grow");
});
});