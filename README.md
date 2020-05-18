
### Boilerplate project: ReactJS (With Webpack) + ExpressJS

##### repo name: boilerplate-reactjs-withWebpack-expressjs

##### repo desc: ye olde boilerplate.  Clientside: ReactJS + Webpack + Scss.  Serverside: ExpressJS + KnexJS (for PostgreSQL connection)


Install this boilerplate project:

yarn install

Install PostgreSQL as well in order to connect with it in the included expressjs server project, via KnexJS.

### ReactJS (+ Webpack + scss)

to compile webpack (reactjs & scss files):  yarn run dev

node_modules & project root locaton: .  (root)

The root folder of the whole project contains the ReactJS & Webpack related node_modules.
The ./webpack-config directory contains prod & dev webpack configs.

Regarding the difference between prod & dev webpack configs--

When the developer runs yarn run build:prod  a .css file is output, for the production configuration.
Otherwise, the .css is included in the compiled .js files 

This can be seen in the main example expressjs .ejs file, into which the reactjs app mounts, at:

./src/server/views/pages/initialDashboard.ejs

It contains a .css file refernence, but this .css is only pulled in if the .css file exists (and it gets output with yarn run build:prod).  Otherwise, the .css reference is ignored, yet the .css is technically pulled in (compiled scss) via the .js file (css is output into js via dev config, where js file is at: /reactBundles/component_modules/initial_dashboard/initial_dashboard.js)

The entry file is: ./src/client/InitialDashboard_EntryFile.js

You can see this in the webpack configuration files-- see line 14 of ./webpack-config/webpack.dev.js for example.

### ExpressJS (+ PostgreSQL via KnexJS)

node_modules & project root location: ./src/server (as "..." below)

The ExpressJS server contains its own .env file, which states info necessary for the KnexJS connection-- such as:

DB_CONNECTION=postgres://localhost/<yourDatabaseNameHere>

The knexfile.js then pulls this info, to setup the KnexJS file.

In order to setup a migration & seed, transfer from the `.../db/examples_and_backups/examples` files into the appropriate folder within DB: the migration example to .../db/migration and seed example to .../db/seed .  I provide two examples styles-- One shows use of foreign keys as a unique string, whereas the other references foreign keys via ID (which is what I personally prefer: to follow ID referencing convention and simple use a join to bring in the string info, such as, for example: reference "id" -> join -> can then reference "status" string)

(Note: I also include old style KnexJS migration & seed, as an example, showing how it used to be, prior to KnexJS's update where it natively includes Promises.)

More details on that:

In the ./src/server/db directory youll find two sets of examples

- Example 1: the String/name FK->PK example -- the "examples" directory -- currently this directory contains files for migration & seeding of an example where a two foreignKeys reference a PrimaryKey, where the foreignKeys reference strings and are strings (such as users.status => user_status.status_name, e.g. "admin") rather than IDs, as integers.)

- Example 2: the Integer/ID FK->PK example -- the "migratiomns" and "seeds directory -- This is the current example which will be run if the dev runs commands `knex migrate:latest` to run the migration file, `knex migrate:rollback` to rollback the migration, and `knex seed:run` to run the seed file.  In this example, we use two foreignKeys to reference a PrimaryKey where the foreignKeys reference IDs and are integers (users.status => user_status.status_id) 
  
  
(Using Linux Tree package below to show directory contents -- `tree -L 3 .` from within .../db directory)

<pre>
├── examples_and_backups
│   ├── examples
│   │   ├── migrationExample_foreignKeyIsID.js
│   │   ├── migrationExample_foreignKeyIsString_uniqueAsPK.js
│   │   ├── seedExample_foreignKeyIsID.js
│   │   └── seedExample_foreignKeyIsString_uniqueAsPK.js
│   └── oldStyle_originalMigrationAndSeed
│       ├── 01_timetracker_seed.js
│       └── 20180511183651_01_timetracker_tables.js
├── migrations  (place the migration example file here)
└── seeds  (place the migration seed file here)
</pre>


### Overview of Tech stack I use for this sort of project
- Server: Ubuntu 18 + Nginx
- App Serverside: ExpressJS
- App Clientside: ReactJS

#### Server Mgmt related
- Ubuntu 18: server os
- Nginx: web server
- Pm2: process manager for node.[Pm2 Cheatsheet](https://devhints.io/pm2)
