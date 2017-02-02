# Ember on codemod

To conform to [this linting rule](https://github.com/netguru/eslint-plugin-ember/blob/master/docs/rules/no-on-calls-in-components.md),
this codemod will replace uses of `Ember.on` with their method equivalent.

## Changes

### willChange

```js
export default Component.extend({
  abc: on('didInsertElement', function () { /* custom logic */ }),  
});
```
will become

```js
export default Component.extend({
  didInsertElement() { /* custom logic */ }
});
```

### wontChange

#### non-lifecycle events

```js
export default Ember.Component.extend({
  onSomething: Ember.on('something', function() {

  }),
});
```

#### initted observers

cos probably done for a reason and observer needs manual refactoring
and proper testing

```js
export default Ember.Component.extend({
  a: Ember.on('init', Ember.observer('something', function() {

  })),
});
```

#### with params

soon to be deprecated, should remain as a linting error until refactored

```js
export default Ember.Component.extend({
  onDidReceiveAttrs: Ember.on('didReceiveAttrs', function({ newAttrs, oldAttrs }) {

  }),
});
```