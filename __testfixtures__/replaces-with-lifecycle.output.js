import Ember from 'ember';

export default Ember.Component.extend({
  init(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didReceiveAttrs(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  willRender(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  willInsertElement(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didInsertElement(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didRender(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didUpdateAttrs(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didReceiveAttrs(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  willUpdate(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  willRender(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didUpdate(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didRender(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  willDestroyElement(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  willClearRender(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },

  didDestroyElement(...args) {
    this._super(...args);
    const b = this.get('c');
    this.set('d', b + 1);
  },
});
