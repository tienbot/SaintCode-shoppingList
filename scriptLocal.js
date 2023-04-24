let toDoListArr = [] //массиваная версия LS (массивLS)
const toDoList__main = document.querySelector('.toDoList__main')
const toDoList__bottom = document.querySelector('.toDoList__bottom')
let localItems = null; //пустой LS

empty()

//убрать дефолтное поведение формы (убрать обновление страницы)
document.querySelector('form').addEventListener("submit", (e)=>{
    e.preventDefault()
})

//перебор данных после обновления страницы
if (window.localStorage.getItem('toDoList') !== null){
    localItems = window.localStorage.getItem('toDoList')
    toDoListArr = JSON.parse(localItems)
    toDoListArr.forEach(obj => createItem(obj.task, obj.id, obj.isDone)) //перебор массивного LS
}

// перезаписать LS
function rebootArr(){
    let arrayString = JSON.stringify(toDoListArr)
    return localItems = window.localStorage.setItem('toDoList', arrayString)
}

//скрыть центральную и нижнюю часть блока
function empty(){
    toDoList__main.style.display='none'
    toDoList__bottom.style.display='none'
}

//удалить данные из LS
function delLS(item){
    toDoListArr=toDoListArr.filter(function(value, index) {
        return(value.id != item)
    })
    rebootArr()
    if (window.localStorage.getItem('toDoList') == ''){
        empty()
    }
}

//удалить все задания
function deleteAllItems() {
    toDoListArr = [] //опустошаем массивLS
    window.localStorage.removeItem('toDoList') //удаляем все значения toDoList из LS
    item = document.querySelectorAll('.list') //находим все задания в списке и...
    item.forEach(el => {
        el.style.display='none' //... скрываем их
    })
    empty() //скрыть центральную и нижнюю часть блока
}

//отобразить задание
function createItem(object, iter, isDone) {
    const toDoList__main = document.body.querySelector(".toDoList__main") //находим .toDoList__main
    const list = document.createElement('div') //создаем div для задания 
    list.className = "list" //добавляем ему класс .list
    const list__wrapper = document.createElement('div') //создаем обертку для задания
    list__wrapper.className = "list__wrapper" // добавляем ей класс list__wrapper
    const deleteItem = document.createElement('span') //создаем кнопку удаления
    deleteItem.className = "deleteItem" // добавляем ей класс deleteItem
    deleteItem.innerHTML = '❌' //внутри рисуем крест
    //Слушатель 'X'
    deleteItem.addEventListener('click', () => {
        if(toDoListArr.length == 1){
            deleteAllItems()
        } else {
            deleteItem.parentElement.style.display='none'
            delLS(deleteItem.parentElement.children[0].children[0].id)
        }
    })

    const checkbox = document.createElement('input') //добавляем чекбокс
    checkbox.type = 'checkbox' //устанавливаем тип checkbox
    checkbox.className = "customCheckbox" //добавляем класс customCheckbox
    checkbox.id = iter//добавляем id
    checkbox.name = iter //добавляем name

    //Слушатель 'checkbox'
    checkbox.addEventListener('click', (e) => {
        if (e.target.checked == true){
            toDoListArr = toDoListArr.map((obj) => (
                (obj.id === iter) ? { ...obj, isDone: 1 } : obj
            ))
        } else if(e.target.checked == false){
            toDoListArr = toDoListArr.map((obj) => (
                (obj.id === iter) ? { ...obj, isDone: 0 } : obj
            ))
        }
        rebootArr() //перезаписываем LS
        localItems = window.localStorage.getItem('toDoList')
        toDoListArr = JSON.parse(localItems)
        checkbox.nextElementSibling.classList.toggle('close')
    })

    const label = document.createElement('label') //добавляем лейбл
    label.htmlFor = iter //добавляем ему for
    label.innerHTML = object //пишем значение из input-а
    if(isDone == 1) { //если в LS указано, что дело сделано - добавить классы
        label.classList.add("close")
        checkbox.checked = true
    }
    
    toDoList__main.append(list) //отображаем list
    list.append(list__wrapper, deleteItem) //отображаем все внутри list-а
    list__wrapper.append(checkbox, label) //отображаем отображаем все внутри list__wrapper-а
    //отобразить центральную и нижнюю часть блока
    toDoList__main.style.display='block'
    toDoList__bottom.style.display='flex'
}

// Слушатель input. Настройка работы input-а
document.querySelector('#input').addEventListener('change', (event) => {
    obj = {
        task: input.value,
        isDone: 0,
        id: Math.random()
    }
    toDoListArr.push(obj)
    rebootArr() //перезаписываем LS

    createItem(input.value, obj.id) //отображаем элемент на странице;
    event.target.value = '' //опустошаем input
})

//Слушатель 'Удалить завершенные'
document.querySelector('#deleteClose').addEventListener('click', () => {
    let closeItem = document.querySelectorAll('.close') //перебираем все элементы с классом close...
    closeItem.forEach(el => {
        el.parentElement.parentElement.style.display='none' //... скрываем все, что нашли 
    })
    toDoListArr=toDoListArr.filter(function(value, index) {
        return(value.isDone != 1)
    })
    rebootArr() //перезаписываем LS
    if(toDoListArr.length == 0){ //если массивLS пустой...
        deleteAllItems()//удаляем все и скрываем середину и низ блока
    }
})

//Слушатель 'Удалить все'
document.querySelector('#deleteAll').addEventListener('click', () => {
    deleteAllItems()
})