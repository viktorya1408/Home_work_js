test = {

  container: function createContainer() {
    var newContainer = document.createElement('div');
    newContainer.className = 'container-fluid';
    document.body.insertBefore(newContainer, document.body.firstChild);
    return newContainer;
    },

  form: function createForm(parent) {
    var newForm = document.createElement('form');
    newForm.setAttribute('method', 'POST');
    newForm.setAttribute('role', 'form');
    parent.appendChild(newForm);
    var newHeader =document.createElement('h3');
    newHeader.className = 'text-center';
    newHeader.innerHTML = 'Тест по программированию';
    newForm.appendChild(newHeader);
    return newForm;
  },


  list: function createList(parent) {
    var newList = document.createElement('ol');
    parent.appendChild(newList);
    for(var i = 1; i < 4; i++){
      var listItem = document.createElement('li');
      listItem.innerHTML = 'Вопрос №' + i;
      newList.appendChild(listItem);
      for(var j = 1; j < 4; j++){
   	    this.input(listItem, i, j);
      }
    }
  },


  input: function createInput (parent, i, j) {
    var checkbox = document.createElement('div');
    checkbox.className = 'checkbox';
    parent.appendChild(checkbox);
    var label = document.createElement('label');
    checkbox.appendChild(label);
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'test' + i);
    input.setAttribute('value', 'test'+ i + '-' + j);
    label.appendChild(input);
    label.appendChild(document.createTextNode('Вариант ответа №' + j));
  },


  button: function createButton(parent) {
    var col = document.createElement('div');
    col.className = 'col-lg-12 text-center';
    parent.appendChild(col);
    var newButton = document.createElement('button');
    newButton.setAttribute('type', 'submit');
    newButton.className = 'btn btn-info btn-lg';
    newButton.innerHTML = 'Проверить мои результаты';
    col.appendChild(newButton);
  }
}

var newContainer = test.container();
var newForm = test.form(newContainer);
test.list(newForm);
test.button(newForm);