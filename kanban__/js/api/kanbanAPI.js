// export default class KanbanAPI{
//     static getItems(columnId){
//          const column=read().find(column => column.id==columnId);

//          if(!column){
//             return [];
//          }

//          return column.items;
//     }
//    static insertItem(columnId, content){
//     const data=read();
//     const column=data.find(column => column.id==columnId);
//     const item ={
//         id: Math.floor(Math.random()*100000),
//         content
//     };

//     if(!column){
//         throw new Error("Column does not exist");
//     }
//     column.items.push(item);
//     save(data);

//     return item;
//    }

// //    static updateItem(itemId, newProps){
// //     const data=read();
// //     const [item, currentColumn] = (() => {
// //       for (const column of data){
// //         const item= column.items.find(item => item.id==itemId);

// //         if(item){
// //             return [item, column];
// //         }
// //       }
     

// //     }) ();

// //     if (!items){
// //         throw new error("Item not found")
// //     }

// //     item.content = newProps.content === undefined ? item.content : newProps.content;
// //      if(
// //         newProps.columnId!==undefined
// //         && newProps.position !== undefined
// //      ){
// //         const targetColumn= data.find(column => column.id == newProps.columnId);
// //         if(!targetColumn){
// //             throw new Error("Target column not found");

// //         }
// //         currentColumn.items.splice(currentColumn.items.indexOf(item),1);

// //         targetColumn.items.splice(newProps.position, 0, item);
// //      }
// //      save(data);

// //    }




// static updateItem(itemId, newProps) {
//     const data = read();

//     const [item, currentColumn] = (() => {
//         for (const column of data) {
//             const item = column.items.find(item => item.id == itemId);
//             if (item) {
//                 return [item, column];
//             }
//         }
//         return [null, null]; // Explicitly return null if item is not found
//     })();

//     if (!item) {
//         throw new Error("Item not found"); // Proper error message
//     }

//     // Update the item's content
//     item.content = newProps.content === undefined ? item.content : newProps.content;

//     // Handle moving the item to a new column and position
//     if (newProps.columnId !== undefined && newProps.position !== undefined) {
//         const targetColumn = data.find(column => column.id == newProps.columnId);
//         if (!targetColumn) {
//             throw new Error("Target column not found");
//         }

//         // Remove item from the current column
//         currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

//         // Insert into the target column at the specified position
//         targetColumn.items.splice(newProps.position, 0, item);
//     }

//     save(data);
// }

//    static deleteItem(itemId){
//     const data= read();

//     for (const column of data){
//         const item= column.items.find(item => item.id == itemId);
//         if(item){
//             column.items.splice(column.items.indexOf(item),1);
//         }
        
//     }
//     save(data);
//    }
// }




// function read(){
//     const json= localStorage.getItem("ksnbsn-data");
//     if(!json){
//         return [
//             {
//             id:1,
//             items:[]
//         },
//             {
//             id:2,
//             items:[]
//         },
//             {
//             id:3,
//             items:[]
//         },
//     ];
//     }

//     return JSON.parse(json);
// }

// function save(data){
//     localStorage.setItem("kanban-data", JSON.stringify(data));
// }













export default class KanbanAPI {
    static getItems(columnId) {
        const column = read().find(column => column.id == columnId);

        if (!column) {
            return [];
        }

        return column.items;
    }

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id == columnId);
        const item = {
            id: Math.floor(Math.random() * 100000),
            content,
        };

        if (!column) {
            throw new Error("Column does not exist");
        }

        column.items.push(item);
        save(data);

        return item;
    }

    static updateItem(itemId, newProps) {
        const data = read();

        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);
                if (item) {
                    return [item, column];
                }
            }
            return [null, null];
        })();

        if (!item) {
            throw new Error("Item not found");
        }

        // Update item's content
        item.content = newProps.content === undefined ? item.content : newProps.content;

        // Handle moving the item to a new column and position
        if (newProps.columnId !== undefined && newProps.position !== undefined) {
            const targetColumn = data.find(column => column.id == newProps.columnId);
            if (!targetColumn) {
                throw new Error("Target column not found");
            }

            // Remove item from the current column
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

            // Insert into the target column at the specified position
            targetColumn.items.splice(newProps.position, 0, item);
        }

        save(data);
    }

    static deleteItem(itemId) {
        const data = read();

        for (const column of data) {
            const itemIndex = column.items.findIndex(item => item.id == itemId);
            if (itemIndex > -1) {
                column.items.splice(itemIndex, 1);
                save(data);
                return;
            }
        }
        throw new Error("Item not found");
    }
}

// Utility functions to interact with localStorage
function read() {
    const json = localStorage.getItem("kanban-data");
    if (!json) {
        return [
            { id: 1, items: [] },
            { id: 2, items: [] },
            { id: 3, items: [] },
        ];
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}
