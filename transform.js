const lifecycleEvents = [
  'init',
  'didReceiveAttrs',
  'willRender',
  'willInsertElement',
  'didInsertElement',
  'didRender',
  'didUpdateAttrs',
  'didReceiveAttrs',
  'willUpdate',
  'willRender',
  'didUpdate',
  'didRender',
  'willDestroyElement',
  'willClearRender',
  'didDestroyElement',
];

const isLifecycleEvent = name => lifecycleEvents.includes(name);
const makeRestArg = (j, name) => j.restElement(j.identifier(name));
const makeArgsSuperCall = j =>
  j.expressionStatement(
    j.callExpression(
      j.memberExpression(j.thisExpression(), j.identifier('_super')),
      [j.spreadElement(j.identifier('args'))],
    ),
  );

const isEmberOn = j => [
  j.Property,
  {
    value: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'Ember',
        },
        property: {
          type: 'Identifier',
          name: 'on',
        },
      },
    },
  },
];

const notObserver = (path) => {
  const [, func] = path.node.value.arguments;

  if (!func.callee) {
    return true;
  }

  const isEmberCall = func.callee.object.name === 'Ember';
  const isObserver = func.callee.property.name === 'observer';

  return !(isEmberCall && isObserver);
};

const superCalls = (j, contextNode) => j(contextNode).find(j.ExpressionStatement, {
  expression: {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'ThisExpression',
      },
      property: {
        type: 'Identifier',
        name: '_super',
      },
    },
  },
});

const transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const emberOns =
    root
      .find(...isEmberOn(j))
      .filter(notObserver); // ignore: Ember.on('init', ... observer stuff ...

  emberOns.replaceWith((path) => {
    const [{ value: name }] = path.node.value.arguments;

    if (!isLifecycleEvent(name)) {
      return path.node;
    }

    const [, func] = path.node.value.arguments;

    if (func.params.length) {
      // although DRA params have been deprecated, leave them be until refactored
      return path.node;
    }

    const newParam = [makeRestArg(j, 'args')];
    const funcBlock = func.body;
    const hasSuperCall = superCalls(j, funcBlock).size() > 0;

    if (!hasSuperCall) {
      funcBlock.body.unshift(makeArgsSuperCall(j));
    }
    const newFunc = j.functionExpression(func.id, hasSuperCall ? [] : newParam, funcBlock);
    const lifecycle = j.identifier(name);
    const lifecycleMethod = j.property('init', lifecycle, newFunc);

    lifecycleMethod.method = true;

    return lifecycleMethod;
  });

  return root.toSource();
};

module.exports = transform;
