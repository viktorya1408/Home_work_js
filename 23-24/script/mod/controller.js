define(
  'Controller', [],
  function () {
    return  function (model, view) {
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
  }
)    