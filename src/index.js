const { EntryPointExpress } = require('./infra/express/entryPointExpress');

(() => {
  try {
    // const synchronizeDB = new SynchronizeDB();
    // await synchronizeDB.execute();
    new EntryPointExpress().execute();
  } catch (error) {
    console.log('index.js', 'Não conectou ao banco', error);
    process.exit(1);
  }
})();
