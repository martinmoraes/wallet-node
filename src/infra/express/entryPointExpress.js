const express = require('express');
require('dotenv/config');

class EntryPointExpress {
  execute() {
    let app = express();

    app.use(express.json());

    app.listen(process.env.PORT, () =>
      console.log(
        'startExpress',
        `Servidor está rodando na porta ${process.env.PORT}`,
      ),
    );
  }
}

module.exports = { EntryPointExpress };
