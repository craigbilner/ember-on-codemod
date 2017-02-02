import Ember from 'ember';

export default Ember.Component.extend({
  a: Ember.on('init', Ember.observer('something', function() {

  })),
});
