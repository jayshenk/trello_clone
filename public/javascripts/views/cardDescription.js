var CardDescriptionView = Backbone.View.extend({
  el: '#description',
  template: App.templates.cardDescription,
  editTemplate: App.templates.editDescription,
  events: {
    'click .edit': 'edit',
    'click .close': 'cancelEdit',
    'submit': 'update'
  },
  edit: function(e) {
    e.preventDefault();
    this.$('.edit').remove();
    this.$('dd').html(this.editTemplate(this.model.toJSON()));
    this.$('textarea').select();
  },
  cancelEdit: function(e) {
    e.preventDefault();
    this.render();
  },
  update: function(e) {
    e.preventDefault();
    var description = this.$('textarea').val();
    this.model.set('description', description);
    this.model.trigger('description_updated');
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function() {
    this.render();
  }
});
