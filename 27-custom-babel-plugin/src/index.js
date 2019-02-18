module.exports = function({ types: t }) {
  const plugin = {
    name: 'let-to-var',
    pre(state) {
      console.log('执行之前');
    },
    visitor: {
      Program: {
        enter(path) {
          console.log('Program Entered!');
          // console.log(t.isProgram(path.node));
        },
        exit() {
          console.log('Program Exited!');
        }
      },
      VariableDeclaration(path, state) {
        if (path.node.kind !== 'let') return;
        path.node.kind = 'var';
        // console.log(path.scope);
        // console.log(state);
        // console.log(state.opts);
        // { option1: true, option2: false }
      }
    },
    post(state) {
      console.log('执行之后');
    }
  };
  return plugin;
};
