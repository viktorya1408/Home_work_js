test = {

  createContainer: function() {
    var newContainer = document.createElement('div');
    newContainer.className = 'container-fluid';
    document.body.insertBefore(newContainer, document.body.firstChild);
    return newContainer;
    },

  createForm: function(parent) {
    var newForm = document.createElement('form');
    newForm.setAttribute('action', ' ');
    newForm.setAttribute('method', 'POST');
    newForm.className = 'col-lg-6 col-lg-offset-3';
    parent.appendChild(newForm);
    var newHeader =document.createElement('h3');
    newHeader.className = 'text-center';
    newHeader.innerHTML = 'Тест по программированию';
    newForm.appendChild(newHeader);
    return newForm;
  },


  createList: function(parent) {
    var newList = document.createElement('ol');
    parent.appendChild(newList);
    for(var i = 1; i < 4; i++){
      var listItem = document.createElement('li');
      listItem.innerHTML = 'Вопрос №' + i;
      newList.appendChild(listItem);
      for(var j = 1; j < 4; j++){
   	    this.addInput(listItem, i, j);
      }
    }
  },


  addInput: function(parent, i, j) {
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


  createButton: function(parent) {
    var col = document.createElement('div');
    col.className = 'text-center';
    parent.appendChild(col);
    var newButton = document.createElement('button');
    newButton.setAttribute('type', 'submit');
    newButton.className = 'btn btn-info btn-lg';
    newButton.innerHTML = 'Проверить мои результаты';
    col.appendChild(newButton);
  }
}

var newContainer = test.createContainer();
var newForm = test.createForm(newContainer);
test.createList(newForm);
test.createButton(newForm);