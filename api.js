// user id = 880
function userActions(){
    const user = {
        "id": null,
        "username": "tien",
        "email": "tien.ru@mail.ru",
        "fname": "Aleksandr",
        "sname": "Valerievich",
        "lname": "Plygun",
        "password_hash": "12345678",
    }
    
    // POST
    // fetch("http://24api.ru/rest-user", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(user)
    // })
    //     .then(data => console.log(data))
    
    // GET
    // fetch("http://24api.ru/rest-user", {
    //     "method": "GET"
    // })
    //     .then(data => data.json())
    //     .then(data => console.log(data))
}
userActions()

function taskActions(){
    const task = {
        'id': null,
        'name': 'Фильм Residents',
        'isDone': 0,
        "user_id": 880,
    }

    // POST
    // http://24api.ru/rest-todo/items-by-id?id=880
    fetch("http://24api.ru/rest-todo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
        .then(data => console.log(data))
    
    // GET
    fetch("http://24api.ru/rest-todo", {
        "method": "GET"
    })
        .then(data => data.json())
        .then(data => console.log(data))
}
// taskActions()

//https://app.swaggerhub.com/apis-docs/a-berezhkov/todo_app_sc_bc/1.0.0#/news/get_rest_news