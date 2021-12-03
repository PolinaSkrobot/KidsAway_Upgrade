// load .env data into process.env
require("dotenv").config();

// other dependencies
const fs = require("fs");
const chalk = require("chalk");
const Client = require("pg-native");
const { startOfWeek, endOfWeek, eachDayOfInterval, add } = require("date-fns");
const date = new Date();
const start = startOfWeek(date, { weekStartsOn: 1 });
const end = endOfWeek(date, { weekStartsOn: 1 });
const arrWeek = eachDayOfInterval({
  start: new Date(start),
  end: new Date(end),
});

// PG connection setup

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;
const client = new Client();

// Loads the schema files from db/schema
const runSchemaFiles = function () {
  console.log(chalk.cyan(`-> Loading Schema Files ...`));
  const sql = fs.readFileSync(`./db/schema/create.sql`, "utf8");
  client.querySync(sql);
};

const runSeedFiles = function () {
  console.log(chalk.cyan(`-> Loading Seeds ...`));
  const sql = fs.readFileSync(`./db/seeds/seeds.sql`, "utf8");
  client.querySync(sql);
};

const runSeedsAvailability = function (list) {
  for (let day of arrWeek) {
    let dayToPass = add(day, { hours: 8 });//format date to write in db
    let numOfSittersForThisDay = Math.floor(Math.random() * (9 - 3) + 3);
    let listOfSittersID = [...list];//prevent end of avail sitters
    for (let i = 1; i <= numOfSittersForThisDay; i++) {
      let startTime = add(day, {
        hours: Math.floor(Math.random() * (23 - 19) + 19),
      });
      let endTime = add(startTime, {
        hours: Math.floor(Math.random() * (5 - 1) + 1),
      });
      let randomElemOfSittersArray = Math.floor(Math.random() * (listOfSittersID.length));
      console.log(listOfSittersID[randomElemOfSittersArray].id, dayToPass, startTime, endTime);

      client.querySync(
        `
      insert into availability (sitter_id, date, start_time, end_time, booked, order_id)
       values ($1, $2, $3, $4, false, null);
      `,
        [listOfSittersID[randomElemOfSittersArray].id, `${dayToPass.toISOString()}`, `${startTime.toISOString()}`, `${endTime.toISOString()}`]
      );
      //listOfSittersID.push(list[j]);
      listOfSittersID.splice(randomElemOfSittersArray, 1);
    }
  }
};
try {
  console.log(`-> Connecting to PG using ${connectionString} ...`);
  client.connectSync(connectionString);
  runSchemaFiles();
  runSeedFiles();
  let sitters = client.querySync(
    `select id from users where babysitter = true;`
  );
  console.log(sitters);
  runSeedsAvailability(sitters);

  client.end();
} catch (err) {
  console.error(chalk.red(`Failed due to error: ${err}`));
  client.end();
}
