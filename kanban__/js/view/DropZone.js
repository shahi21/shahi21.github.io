// import KanbanAPI from "../api/kanbanAPI.js";

// export default class DropZone{
//     static createDropZone(){
//         const range = document.createRange();

//         range.selectNode(document.body);

//         const dropZone=  range.createContextualFragment(`
// <div classs= "kanban__dropzone"></div>

//         `).children[0];
       

//         dropZone.addEventListener("dragover", e => {

//             e.preventDefault();
//             dropZone.classList.add(".kanban__dropzone--active");
//         });


//         dropZone.addEventListener("dragleave", () => {
//             dropZone.classList.add(".kanban__dropzone--active");
//         });

//         dropZone.addEventListener("drop", e =>{
//             e.preventDefault();
//             dropZone.classList.remove(".kanban__dropzone--active");

//             const columnElement= dropZone.closest(".kanban__column");
//             const columnId= Number(columnElement.dataset.id);
//             const dropZonesInColumn= Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
//             const  droppedIndex= dropZonesInColumn.indexOf(dropZone);
//             const itemID= Number(e.dataTransfer.getData("text/plain"));
//             const droppedItemElement= document.querySelector(`[data-id="${itemID}]`);
//             const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement :dropZone;
//             if(droppedItemElement.contains(dropZone)){
//                 return;
//             }
//             insertAfter.after(droppedItemElement);
//              KanbanAPI.updateItem(itemID,{
//                 columnId,
//                 position: droppedIndex

//              });

//         });

//         return dropZone;
//     }
// }













import KanbanAPI from "../api/kanbanAPI.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();
        range.selectNode(document.body);

        const dropZone = range.createContextualFragment(`
            <div class="kanban__dropzone"></div>
        `).children[0];

        // Highlight the drop zone when an item is dragged over
        dropZone.addEventListener("dragover", e => {
            e.preventDefault(); // Required to allow dropping
            dropZone.classList.add("kanban__dropzone--active");
        });

        // Remove highlight when the drag leaves the drop zone
        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--active");
        });

        // Handle the drop event
        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");

            const columnElement = dropZone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);
            const dropZonesInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZonesInColumn.indexOf(dropZone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            
            // Determine where to insert the dropped item
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item")
                ? dropZone.parentElement
                : dropZone;

            // Prevent dropping into itself
            if (droppedItemElement.contains(dropZone)) {
                return;
            }

            // Insert the dropped item in the new position
            insertAfter.after(droppedItemElement);

            // Update the item's position and column in the API
            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            });
        });

        return dropZone;
    }
}
