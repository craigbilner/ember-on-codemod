import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super();
    const b = this.get('c');
    this.set('d', b + 1);
  },
});
