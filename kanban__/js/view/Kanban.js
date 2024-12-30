// import Column from "./column.js";
// export default class Kanban{
//     constructor(root){
//         this.root=root;
//         Kanban.columns().forEach(column =>{
//             const columnView= new Column(column.id, column.title);
//            this.root.appendChild(columnView.elements.root);
//         });

//     }

//     static columns(){
//         return [
//             {
//                 id: 1,
//                 title: "Not Started"
//             },
//             {
//                 id: 2,
//                 title: "In Progress"
//             },
//             {
//                 id: 3,
//                 title: "Completed"
//             }

//         ];
//     }
// }








import Column from "./column.js";

export default class Kanban {
    constructor(root) {
        if (!root) {
            throw new Error("Root element is required to initialize Kanban.");
        }

        this.root = root;

        // Initialize each column and append it to the root element
        Kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);
            this.root.appendChild(columnView.elements.root);
        });
    }

    // Static method to define the Kanban board's columns
    static columns() {
        return [
            {
                id: 1,
                title: "Not Started"
            },
            {
                id: 2,
                title: "In Progress"
            },
            {
                id: 3,
                title: "Completed"
            }
        ];
    }
}
