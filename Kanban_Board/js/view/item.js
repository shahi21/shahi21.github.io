// import KanbanAPI from "../api/kanbanAPI.js";
// import DropZone from "./DropZone.js";

// export default class Item{
//     constructor(id,content){
//             const bottomdropZone= DropZone.createDropZone();

       
//         this.elements={};
//         this.elements.root=Item.createRoot();
//         this.elements.input=this.elements.root.querySelector(".kanban__item-input");
//         this.elements.root.dataset.id=id;
//         this.elements.input.textContent=content;
//         this.content= content;
//         this.elements.root.appendChild(bottomdropZone);
//         const onBlur=() =>{
//             const newContent= this.elements.input.textContent.trim();
//             if(newContent== this.content){
//                 return;
//             }

//             this.content= newContent;


//             KanbanAPI.updateItem(id,{
//                 content : this.content

//             });
            
//         };

//         this.elements.input.addEventListener("blur", onBlur);
//         this.elements.root.addEventListener("dblclick", () => {
//             const check = confirm("Are you sure you want to delete this item?");

//             if( check){
//                 KanbanAPI.deleteItem(id);

//                 this.elements.input.removeEventListener("blur", onBlur);
//                 this.elements.root.parentElement.removeChild(this.elements.root);
//             }
//         });
//         this.elements.root.addEventListener("dragstart", e => {
//             e.dataTransfer.setData("text/plain", id);  
//         });

//         this.elements.input.addEventListener("drop", e =>{
//                e.preventDefault();
//         });
//     }
//     static createRoot(){
//         const range = document.createRange();

//         range.selectNode(document.body);

//         return range.createContextualFragment(`

//           <div class="kanban__item" draggable="true">
//           <div class = "kanban__item-input" contenteditable></div>

//           </div>

//         `).children[0];
//     }
// }






import KanbanAPI from "../api/kanbanAPI.js";
import DropZone from "./DropZone.js";

export default class Item {
    constructor(id, content) {
        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(bottomDropZone);

        // Handle blur event for updating content
        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();
            if (newContent === this.content) {
                return; // No changes made
            }

            this.content = newContent;

            // Update content via API
            KanbanAPI.updateItem(id, {
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onBlur);

        // Handle double-click for deletion
        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you want to delete this item?");

            if (check) {
                KanbanAPI.deleteItem(id);

                // Clean up event listeners and remove the element
                this.elements.input.removeEventListener("blur", onBlur);
                if (this.elements.root.parentElement) {
                    this.elements.root.parentElement.removeChild(this.elements.root);
                }
            }
        });

        // Handle dragstart event for drag-and-drop functionality
        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id); // Set item ID for transfer
        });

        // Prevent default behavior on drop event
        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable></div>
            </div>
        `).children[0];
    }
}
