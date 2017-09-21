const Handlebars = require('handlebars');
const fs = require('fs');
const prompt = require('prompt');
const templates = {
  component: __dirname + '/templates/component/component-template.ejs',
  statelessComponent: __dirname + '/templates/component/stateless-component-template.ejs',
  statelessComponentTest: __dirname + '/templates/component/stateless-component-test-template.ejs',

  action: __dirname + '/templates/action/template.ejs',
  actionTest: __dirname + '/templates/action/template-test.ejs',
  reducer: __dirname + '/templates/reducer/template.ejs',
  reducerTest: __dirname + '/templates/reducer/template-test.ejs',
}

function generate(template, testTemplate, data) {
  const name = data.actionName || data.componentName;
  const extension = data.componentName ? '.jsx' : '.js';
  const preDir = data.dir ?  `${data.dir}/` : '';
  const dir = `${preDir}${name}/`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // component file
  fs.readFile(template, 'utf8', function(err, text) {
    if (err) throw err;
    var template = Handlebars.compile(text);
    fs.writeFileSync(
      dir + name + extension,
      template(data));
  });

  // test file
  fs.readFile(testTemplate, 'utf8', function(err, text) {
    if (err) throw err;
    var template = Handlebars.compile(text);
    fs.writeFileSync(
      dir + name + '.test.js',
      template(data));
  });

  if (data.componentName) {
    // css file if component and not action/reducer
    fs.writeFileSync(dir + data.componentName + '.scss', '');
  }

  console.log(`${name}.${extension} was created in your current directory`);
}

prompt.start();

function askIfActionOrComponent() {
  const schema = {
    properties: {
      type: {
        message: 'Are you creating an Action/Reducer or a component?'
      },
    }
  };
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      switch (result.type.toLowerCase()) {
        case 'a':
        case 'A':
        case 'action': resolve('action');
        default:
        case 'c':
        case 'C':
        case 'component': resolve('component');
      }
    });
  });
}

function askActionName() {
  const schema = {
    properties: {
      actionName: {
        pattern: /^[a-zA-Z\-]+$/,
        message: 'What would you like to name your action/reducer?',
        required: true
      },
    }
  };
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) reject(err);
      generate(
        templates.action,
        templates.actionTest,
        Object.assign({}, result, { dir: 'actions' }));
      generate(
        templates.reducer,
        templates.reducerTest,
        Object.assign({}, result, { dir: 'reducers' }));
      resolve();
    });
  });
}

function askIfComponentStateless() {
  const schema = {
    properties: {
      type: {
        message: 'Would you like your component to be Stateless?'
      },
      componentName: {
        pattern: /^[a-zA-Z\-]+$/,
        message: 'What would you like to name your component?',
        required: true
      },
      dir: {
        message: 'What dir would you like that to be created in? Defaults to (./components)',
        default: 'components',
      }
    }
  };
  return new Promise((resolve, reject) => {
    prompt.get(schema, (err, result) => {
      if (err) reject(err);
      switch (result.type.toLowerCase()) {
        default:
        case 'yes':
        case 'y':
        case 'stateless':
          generate(
            templates.statelessComponent,
            templates.statelessComponentTest,
            result);
          return resolve();
        case 'no':
        case 'n':
        case 'statefull':
          generate(
            templates.component,
            templates.statelessComponentTest,
            result);
          resolve();
      }
    });
  });
}
askIfActionOrComponent()
  .then(type => (type === 'action' ? askActionName() : askIfComponentStateless()))
  .catch(err => console.log(err));
