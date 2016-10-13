define(
  'View', [],
  function () {
    return  function (model, data) {
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
  }
)    