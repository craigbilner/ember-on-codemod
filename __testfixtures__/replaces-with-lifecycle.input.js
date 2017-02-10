import Ember from 'ember';

export default Ember.Component.extend({
  a: Ember.on('init', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  b: Ember.on('didReceiveAttrs', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  c: Ember.on('willRender', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  d: Ember.on('willInsertElement', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  e: Ember.on('didInsertElement', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  f: Ember.on('didRender', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  g: Ember.on('didUpdateAttrs', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  h: Ember.on('didReceiveAttrs', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  i: Ember.on('willUpdate', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  j: Ember.on('willRender', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  k: Ember.on('didUpdate', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  l: Ember.on('didRender', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  m: Ember.on('willDestroyElement', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  n: Ember.on('willClearRender', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),

  o: Ember.on('didDestroyElement', function() {
    const b = this.get('c');
    this.set('d', b + 1);
  }),
});
