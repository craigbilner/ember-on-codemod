import Ember from 'ember';

export default Ember.Component.extend({
  a: Ember.on('didInsertElement', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),
});
