const lifecycleEvents = [
  'init',
  'didReceiveAttrs',
  'willRender',
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

const transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const emberOns = root.find(j.Property, {
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
  }).filter((path) => {
    const [, func] = path.node.value.arguments;

    if (!func.callee) {
      return true;
    }

    const isEmberCall = func.callee.object.name === 'Ember';
    const isObserver = func.callee.property.name === 'observer';

    return !(isEmberCall && isObserver);
  });

  emberOns.replaceWith((path) => {
    const [{ value: name }] = path.node.value.arguments;

    if (!isLifecycleEvent(name)) {
      return path.node;
    }

    const [, func] = path.node.value.arguments;

    if (func.params.length) {
      return path.node;
    }

    const newParam = [makeRestArg(j, 'args')];
    const funcBlock = func.body;
    funcBlock.body.unshift(makeArgsSuperCall(j));
    const newFunc = j.functionExpression(func.id, newParam, funcBlock);
    const lifecycle = j.identifier(name);
    const lifecycleMethod = j.property('init', lifecycle, newFunc);

    lifecycleMethod.method = true;

    return lifecycleMethod;
  });

  return root.toSource();
};

module.exports = transform;
