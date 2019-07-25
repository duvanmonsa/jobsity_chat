const request = require('request');
const csv = require('async-csv');

const findStockCommand = message => {
  const commands = message.match('A?/[^&]*=[^&]*');
  if (commands) {
    const command = message.match('A?/stock=[^&]*');
    if (!command) {
      throw new Error("Command doesn't exist");
    }
    const stock = command[0].replace('/stock=', '');
    if (stock) {
      return stock;
    }
  }
  return false;
};

const getStockQuote = async stock => {
  const url = `https://stooq.com/q/l/?s=${stock}&f=sd2t2ohlcv&h&e=csv`;

  let csvData = await new Promise((resolve, reject) => {
    request.get(url, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject('Error consuming the service');
      }
    });
  }).catch(err => {
    throw new Error(err);
  });

  // Convert CSV string into rows:
  const rows = await csv.parse(csvData);
  if (rows[1][7] === 'N/D') {
    throw new Error('No quote for that stock');
  }
  return { symbol: rows[1][0], value: rows[1][6] };
};

const processMessage = async message => {
  try {
    const stock = findStockCommand(message);
    let response = false;
    if (stock) {
      // process stock command
      const quote = await getStockQuote(stock);
      response = { id: 'bot', text: `${quote.symbol} quote is $${quote.value} per share`, User: { name: 'ChatBot' } };
    }
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject({ id: 'bot', text: err.message, User: { name: 'ChatBot' } });
  }
};

module.exports = {
  processMessage
};
