import Ember from 'ember';

export default Ember.Component.extend({
  a: Ember.on('init', function() {
    this._super();
    const b = this.get('c');
    this.set('d', b + 1);
  }),
});
