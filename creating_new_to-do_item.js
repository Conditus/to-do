/**
* Жиcзненный цикл задачи:
* 1) Задача создана: форма ввода активна, чекбокс = false
* 2) Задача в состоянии редактирования: аналогично п.1
* 3) Задача отредактирована: форма ввода неактивна, чекбокс = false
* 4) Задача выполнена: форма ввода неактивна, чекбокс = true, перейти в состояние редактирования возможно, сняв чекбокс
* 5) Задача удалена

* Задача добавляется в LocalStorage, если она в состоянии 3 и 4. Если задача отредактирована, но пустая, то в  LocalStorage не хранится
*/


function NewTodo() {
    var div = document.createElement('div');
    var generation = Math.random() * 1234;
    var key = ("ID"+generation.toString()).substr(0, 16);
    div.innerHTML='<div class="block" id="'+key+'"><input type="checkbox" class="checkbox_class" onclick="Done(this)"><input type="text" class="text_area" name="message" required><input type="button" class="edit_button" onclick="Edit(this)"><input type="button" class="delete_button" onclick="Delete(this)"></div>'

    var myDiv = document.getElementById("current");
    var parentDiv = myDiv.parentNode;
    parentDiv.insertBefore(div, myDiv);

}


function Done(elem) {
    var status = elem.checked;
    var element = elem.parentElement;
    var message;
    if (!element.firstChild.nextSibling.value) {
        alert("Enter the task");
        element.firstChild.disabled = false;
        return;
    }
    if(status === false){
        var myDiv = document.getElementById("current");
        myDiv.appendChild(element);
        element.firstChild.nextSibling.disabled = false;
        element.firstChild.nextSibling.nextSibling.disabled = false;
        element.firstChild.nextSibling.style.textDecoration = 'none';
        element.style.backgroundColor = "powderblue";
        message = 'P'+element.firstChild.nextSibling.value;
    }
    else {
        var myDiv = document.getElementById("to-dos");
        myDiv.appendChild(element);
        element.firstChild.nextSibling.disabled = true;
        element.firstChild.nextSibling.style.textDecoration = 'line-through';
        element.firstChild.nextSibling.nextSibling.disabled = true;
        element.firstChild.nextSibling.nextSibling.style.backgroundImage = 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")';
        element.style.backgroundColor = "lightgray";
        message = 'D'+element.firstChild.nextSibling.value;
    }

    localStorage.setItem(element.id.toString(), message);
}


function Delete(elem) {
    var element = elem.parentElement
    localStorage.removeItem(element.id.toString());
    element.remove();
}


function Edit(elem) {
    if (window.getComputedStyle(elem).getPropertyValue('background-image') === 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")'){
        elem.style.backgroundImage = "url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698651-icon-135-pen-angled-512.png)";
        elem.previousSibling.disabled = true;
    }
    else {
        elem.style.backgroundImage = "url(https://www.materialui.co/materialIcons/action/done_black_2048x2048.png)";
        elem.previousSibling.disabled = false;
    }

    var element = elem.parentElement;
    var message = element.firstChild.nextSibling.value;
    if (message !== ''){
        localStorage.setItem(element.id.toString(), "P"+message);
    }
    else {
        localStorage.removeItem(element.id.toString());
    }

}

//Загрузка данных из LocalStorage

for (var key in localStorage){

    var div = document.createElement('div');
    if (localStorage.getItem(key)[0] === "P"){

        div.innerHTML='<div class="block" id="'+key+'"><input type="checkbox" class="checkbox_class" onclick="Done(this)"><input type="text" class="text_area" name="message" value="'+localStorage.getItem(key).slice(1)+'" disabled="true"><input type="button" class="edit_button" onclick="Edit(this)" style="background-image: url(https://cdn1.iconfinder.com/data/icons/hawcons/32/698651-icon-135-pen-angled-512.png)"><input type="button" class="delete_button" onclick="Delete(this)"></div>'
        var myDiv = document.getElementById("current");
    }
    else{

        div.innerHTML='<div class="block" id="'+key+'" style="background-color: lightgray"><input type="checkbox" class="checkbox_class" onclick="Done(this)" checked><input type="text" class="text_area" name="message" value="'+localStorage.getItem(key).slice(1)+'" disabled="true" style="text-decoration: line-through"><input type="button" class="edit_button" onclick="Edit(this)" style="background-image: url(https://www.materialui.co/materialIcons/action/done_black_2048x2048.png)" disabled="true"><input type="button" class="delete_button" onclick="Delete(this)">'
        var myDiv = document.getElementById("to-dos");

    }
    var parentDiv = myDiv.parentNode;
    parentDiv.insertBefore(div, myDiv);
}

