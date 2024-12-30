// import Kanban from "./view/Kanban.js";

// new Kanban(
//     document.querySelector(".kanban")
// );

import Kanban from "./view/Kanban.js";

// Select the root element for the Kanban board
const kanbanRoot = document.querySelector(".kanban");

if (!kanbanRoot) {
    throw new Error("Root element with class 'kanban' not found. Ensure it exists in the DOM.");
}

// Initialize the Kanban board
new Kanban(kanbanRoot);
