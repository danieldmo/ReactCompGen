const Handlebars = require('handlebars');
const fs = require('fs');
const prompt = require('prompt');
const templates = {
  component: 'templates/component-template.ejs',
  statelessComponent: 'templates/stateless-component-template.ejs',
  statelessComponentTest: 'templates/stateless-component-test-template.ejs',
}

var schema = {
  properties: {
    type: {
      message: 'Would you like your component to be Stateless?'
    },
    componentName: {
      pattern: /^[a-zA-Z\-]+$/,
      message: 'What would you like to name your component?',
      required: true
    },
  }
};

function generate(componentTemplate, testTemplate, result) {
  var dir = __dirname + '/' + result.componentName + '/';
  var data = {
    componentName: result.componentName
  };

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  // component file
  fs.readFile(componentTemplate, 'utf8', function(err, text) {
    if (err) throw err;
    var template = Handlebars.compile(text);
    fs.writeFileSync(
      dir + result.componentName + '.jsx',
      template(data));
  });

  // test file
  fs.readFile(testTemplate, 'utf8', function(err, text) {
    if (err) throw err;
    var template = Handlebars.compile(text);
    fs.writeFileSync(
      dir + result.componentName + '.test.js',
      template(data));
  });

  // css file
  fs.writeFileSync(dir + result.componentName + '.scss', '');
}

prompt.start();

prompt.get(schema, (err, result) => {
  switch (result.type.toLowerCase()) {
    default:
    case 'yes':
    case 'y':
    case 'stateless':
      return generate(
        templates.statelessComponent,
        templates.statelessComponentTest,
        result);
    case 'no':
    case 'n':
    case 'statefull':
      return generate(
        templates.component,
        templates.statelessComponentTest,
        result);
  }
});
