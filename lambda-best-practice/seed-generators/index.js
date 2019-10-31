const jsf = require("json-schema-faker");
const faker = require("faker");

jsf.extend("faker", () => faker);

jsf.option({
  resolveJsonPath: true,
  alwaysFakeOptionals: true
});

const schema = require('./schema');

// use the async-version (preferred way)
jsf.resolve(schema).then(data => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      if(key === "pause-v2") {
        element.forEach(pause => {
          pause.startTime = faker.random.number({
              'min': 10,
              'max': 50
          });
          pause.endTime = pause.startTime + pause.duration;
          pause.correctedTime = pause.endTime - 30;
        });
      }

      require('fs').writeFile(`./lambda-best-practice/seeds/${key}.json`, JSON.stringify(element, null, 4), (err) => {
        if (err) {
          return console.log(err);
        }
      });
    }
  }
});