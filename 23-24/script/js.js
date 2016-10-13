	
  function Model(data) {
    var self = this;
    self.data = data;

    self.addItem = function(item) {
      if (item.length === 0) {
        return;
      }
      self.data.push(item);
      return self.data;
    };
    self.removeItem = function(item) {
      var index = self.data.indexOf(item);
      if (index === -1) {
        return;
      }
      self.data.splice(index, 1);
      return self.data;
    };

    self.editItem = function(item, newItem) {
      var index = self.data.indexOf(item);
      if (index === -1) {
        return;
      }
      self.data[index] = newItem;
      return self.data;
    }
  }

  function View (model, data) {
    var self = this;


    function init() {
      var wrapper = tmpl($('#wrapper-template').html());
      $('body').append(wrapper);
      self.elements = {
        input: $('.item-value'),
        addBtn: $('.item-add'),
        listContainer: $('.todo__list')
      };
      self.renderList(model.data);
    }

    self.renderList = function (data) {
      var list = tmpl($('#list-template').html(), {data: data});
      self.elements.listContainer.html(list);
    }
    
    self.toggleElement = function (item) {
      $(item).toggle();
    }

    self.showBlockEdit = function (target, text) {
      var editBlock = tmpl($('#edit-template').html(), {text: text});
      target.prepend(editBlock);
      target.css('boxShadow', '0 0 4px 1px #444343');
      setTimeout(function() {
        document.getElementById('edit').focus();
      }, 0);
    }
    
    init();
  }

 function Controller (model, view) {
      var self = this;
      var codeKey = 0;

      view.elements.listContainer.on('click', '.item-delete', removeItem);
      view.elements.listContainer.on('click', '.item-edit', editItem);
      view.elements.listContainer.on('keyup', '.item-input-edit', editEventEnter);
      view.elements.listContainer.on('focusout', '.item-input-edit', editEnd);
      view.elements.addBtn.on('click', addItem);


      function editEventEnter(e) {
        if (e.keyCode === 13) {
          e.target.blur();
        }
        else if (e.keyCode === 27) {
          codeKey = 1;
          view.renderList(model.data);
        }
      }

      function addItem() {
        var newItem = view.elements.input.val();
        model.addItem(newItem);
        view.renderList(model.data);
        view.elements.input.val('');
      }

      function editItem () {
        var icon = this;
        view.toggleElement(icon);
        var text = $(this).siblings('.item-text');
        view.toggleElement(text);
        var itemParent = $(this).parent();
        var item = $(itemParent).attr('data-value');
        view.showBlockEdit(itemParent, item);
      }

      function removeItem() {
        var item = $(this).parent().attr('data-value');
        model.removeItem(item);
        view.renderList(model.data);
      }

      function editEnd () {
        if (codeKey == 1) {
          codeKey = 0;
          return;
        }
        var item = $(this).parents('.title__item').attr('data-value');
        var newItem = $(this).val();
        if (newItem.length === 0) {
          view.renderList(model.data);
          return;
        }
        model.editItem(item, newItem);
        view.renderList(model.data);
      }

    }

$( function() {
    var firstToDoList = ['learn javascript', 'learn html', 'make coffee'];
    var model = new Model(firstToDoList);
    var view = new View(model);
    var controller = new Controller(model, view);

 });

