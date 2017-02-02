import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement(...args) {
    this._super(...args);

    const b = this.get('c');
    this.set('d', b + 1);
  },
});
