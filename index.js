let store = Redux.createStore(reducer);
let { data } = store.getState();

let input = document.querySelector(`input[type="text"]`);
let rootElm = document.querySelector(".todo_list");

input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        store.dispatch({ type: 'addTodo', title: event.target.value });
    }
});


store.subscribe(() => {
    let { data } = store.getState();
    createTodoUI(data);
})

// function addTodo(event) {
//     let value = event.target.value;
//     console.log(allTodo);
//     if (event.keyCode === 13 && value !== "") {
//         allTodo.push({
//             name: value,
//             isDone: false,
//         });
//         event.target.value = "";
//         createTodoUI(allTodo);
//     }
// }

// function handleCheck(event) {
//     let id = event.target.id;
//     allTodo[id].isDone = !allTodo[id].isDone;
//     createTodoUI(allTodo);
//     localStorage.setItem("allTodo", JSON.stringify(allTodo))
// }

// function handleDelete(event) {
//     let id = event.target.id;
//     allTodo.splice(id, 1)
//     createTodoUI();
// }


function reducer(state, action) {
    switch (action.type) {
        case 'addTodo':
            let singleTodo = {
                isCompleted: false,
                title: action.title,
            };
            state.data.push(singleTodo);
            return { data: state.data };
        case 'isChecked':
            state.data[action.indexOfTodo].isCompleted = action.value;
            return { data: state.data };
        case 'removeTodo':
            state.data.splice(action.indexOfTodo, 1);
            return { data: state.data };
        default:
            return { data: [{ isCompleted: false, title: "hello" }] }
    }
}

function createTodoUI(data) {
    rootElm.innerHTML = "";
    data.forEach((todo, i) => {
        let li = document.createElement('li');
        li.classList.add('list')
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = i;
        input.checked = todo.isDone;
        input.addEventListener('change', (event) => {
            store.dispatch({
                type: 'isChecked',
                value: event.target.checked,
                indexOfTodo: i,
            })
        })
        let p = document.createElement('p')
        p.innerText = todo.title;
        let span = document.createElement('span');
        span.innerText = 'X';
        span.addEventListener('click', () => {
            store.dispatch({
                type: 'removeTodo',
                indexOfTodo: i
            })
        });
        li.append(input, p, span);

        rootElm.append(li);
    });
}

createTodoUI();

// input.addEventListener("keyup", addTodo);