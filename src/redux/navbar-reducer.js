
const initialState = {
    friends: [
        {name: 'Александрffffff', path: "http://localhost:5000/avatar/avatar1.svg"},
        {name: 'Михаил', path: "http://localhost:5000/avatar/avatar1.svg"},
        {name: 'Андрей', path: "http://localhost:5000/avatar/avatar1.svg"},
        {name: 'Александр', path: "http://localhost:5000/avatar/avatar1.svg"},
        {name: 'Александр', path: "http://localhost:5000/avatar/avatar1.svg"},
        {name: 'Андрей', path: "http://localhost:5000/avatar/avatar1.svg"}
    ]
}

const navbarReducer = (state = initialState, action) => {
    return state
}

export default navbarReducer