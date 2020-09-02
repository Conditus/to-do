function NewTodo() {
    var div = document.createElement('div');

    div.innerHTML='<div class="block"><input type="checkbox" class="checkbox_class" onclick="Done(this)"><input type="text" class="text_area"><input type="button" class="edit_button" onclick="Edit(this)"><input type="button" class="delete_button" onclick="Delete(this)"></div>'

    var myDiv = document.getElementById("current");
    parentDiv = myDiv.parentNode;
    parentDiv.insertBefore(div, myDiv);

}


function Done(elem) {
    var status = elem.checked
    var element = elem.parentElement;
    if(status === false){
        var myDiv = document.getElementById("current");
        myDiv.appendChild(element);
        element.firstChild.nextSibling.disabled = false;
        element.firstChild.nextSibling.nextSibling.disabled = false;
        element.firstChild.nextSibling.style.textDecoration = 'none';
        element.style.backgroundColor = "powderblue";
    }
    else {
        var myDiv = document.getElementById("to-dos");
        myDiv.appendChild(element);
        element.firstChild.nextSibling.disabled = true;
        element.firstChild.nextSibling.nextSibling.disabled = true;
        element.firstChild.nextSibling.style.textDecoration = 'line-through';
        element.firstChild.nextSibling.nextSibling.style.backgroundImage = 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")';
        element.style.backgroundColor = "lightgray";
    }

}


function Delete(elem) {
    var element = elem.parentElement
    element.remove();
}


function Edit(elem) {
    if (window.getComputedStyle(elem).getPropertyValue('background-image') === 'url("https://www.materialui.co/materialIcons/action/done_black_2048x2048.png")'){
        elem.style.backgroundImage = "url(https://i.pinimg.com/originals/e4/2b/fd/e42bfd6e6759a875919f8726c41abfad.png)";
        elem.previousSibling.disabled = true;
    }
    else {
        elem.style.backgroundImage = "url(https://www.materialui.co/materialIcons/action/done_black_2048x2048.png)";
        elem.previousSibling.disabled = false;
    }
}
