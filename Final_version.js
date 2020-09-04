/**
* Жиcзненный цикл задачи:
* 1) Задача создана: форма ввода активна, чекбокс = false
* 2) Задача в состоянии редактирования: аналогично п.1
* 3) Задача отредактирована: форма ввода неактивна, чекбокс = false
* 4) Задача выполнена: форма ввода неактивна, чекбокс = true, перейти в состояние редактирования возможно, сняв чекбокс
* 5) Задача удалена

* Задача добавляется в LocalStorage, если она в состоянии 3 и 4. Если задача отредактирована, но пустая, то в  LocalStorage не хранится
*/

function create_new_to_do_element() {
    let div = document.createElement('div');
    let block = document.querySelector(".current_test");
    let key = ("ID"+Math.random().toString()).substr(0, 16);
    block.insertAdjacentHTML("afterEnd",'<div class="block" id="'+key+'"><input type="checkbox" class="checkbox_class" onclick="done(this)" onchange="empty_check(this)"><input type="text" class="text_area" name="message"><input type="button" class="edit_button" onclick="edit(this)"><input type="button" class="delete_button" onclick="removing(this)"></div>');
}

function done(elem) {

    if (!elem.parentElement.querySelector(".text_area").value) {
        alert("Have you realy done an empty task?");
        elem.parentElement.querySelector("edit_button").style.backgroundImage = 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")';
        return;
    }//также имеет вспомогательную функцию empty_check()

    let element = elem.parentElement;
    let message;

    if (elem.checked === false) {
        document.getElementById("current_test").appendChild(element);

        element.querySelector(".edit_button").disabled = false;
        element.querySelector(".text_area").disabled = false;
        element.querySelector(".text_area").style.textDecoration = 'none';
        element.style.backgroundColor = "powderblue";

        message = 'P'+element.querySelector(".text_area").value;
    }
    else{
        document.getElementById("done_test").appendChild(element);

        element.querySelector(".checkbox_class").disabled = false;
        element.querySelector(".text_area").disabled = true;
        element.querySelector(".text_area").style.textDecoration = 'line-through';
        element.querySelector(".edit_button").disabled = true;
        element.querySelector(".edit_button").style.backgroundImage = 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")';
        element.style.backgroundColor = "lightgray";

        message = 'D'+element.querySelector(".text_area").value;
    }
    localStorage.setItem(element.id.toString(), message);
}

function empty_check(elem) {
    if (!elem.parentElement.querySelector(".text_area").value) {
        elem.checked = false;
    }
}

function edit(elem){

    if (!elem.parentElement.querySelector(".text_area").value) {
        alert("Enter the task! \n I wouldn't save empy values.");
        elem.parentElement.querySelector("edit_button").style.backgroundImage = 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")';
        return;
    }

    if (window.getComputedStyle(elem).getPropertyValue('background-image') === 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")'){
        elem.style.backgroundImage = "url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698651-icon-135-pen-angled-512.png)";
        elem.previousSibling.disabled = true;
    }
    else {
        elem.style.backgroundImage = "url(https://www.materialui.co/materialIcons/action/done_black_2048x2048.png)";
        elem.previousSibling.disabled = false;
    }

    var element = elem.parentElement;
    var message = element.querySelector(".text_area").value;
    if (message !== ''){
        localStorage.setItem(element.id.toString(), "P"+message);
    }
    else {
        localStorage.removeItem(element.id.toString());
    }

}

function removing(elem) {
    localStorage.removeItem(elem.parentElement.id.toString());
    elem.parentElement.remove();
}


//Загрузка данных из LocalStorage

for (var key in localStorage){

    let div = document.createElement('div');
    let block
    if (localStorage.getItem(key)[0] === "P"){
        block = document.querySelector(".current_test");
        block.insertAdjacentHTML("afterEnd", '<div class="block" id="'+key+'"><input type="checkbox" class="checkbox_class" onclick="done(this)"><input type="text" class="text_area" name="message" value="'+localStorage.getItem(key).slice(1)+'" disabled="true"><input type="button" class="edit_button" onclick="edit(this)" style="background-image: url(http://cdn1.iconfinder.com/data/icons/hawcons/32/698651-icon-135-pen-angled-512.png)"><input type="button" class="delete_button" onclick="removing(this)"></div>');
    }
    else{
        block = document.querySelector(".done_test");
        block.insertAdjacentHTML("afterEnd",'<div class="block" id="'+key+'" style="background-color: lightgray"><input type="checkbox" class="checkbox_class" onclick="done(this)" checked><input type="text" class="text_area" name="message" value="'+localStorage.getItem(key).slice(1)+'" disabled="true" style="text-decoration: line-through"><input type="button" class="edit_button" onclick="edit(this)" style="background-image: url(https://www.materialui.co/materialIcons/action/done_black_2048x2048.png)" disabled="true"><input type="button" class="delete_button" onclick="removing(this)">');
    }
}
