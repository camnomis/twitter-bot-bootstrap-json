
// Dependencies =========================
var
    twit = require('twit')

var Twitter = new twit({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
})

var tweetPrice = function(){

const https = require('https');

https.get('https://api.coindesk.com/v1/bpi/currentprice.json', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    // *** This stuff has been moved inside this callback function, so it can "see" the data ***
    var response_object = JSON.parse(data);
    var GBPrate = response_object.bpi.GBP.rate;
    var USDrate = response_object.bpi.USD.rate;
    var EURrate = response_object.bpi.EUR.rate;

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + (currentdate.getHours()<10?'0':'') + currentdate.getHours() + ":"
                + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes() + ":"
                + (currentdate.getSeconds()<10?'0':'') + currentdate.getSeconds();

    Twitter.post('statuses/update', { status: 'The current price of $BTC at '+datetime+' is $'+USDrate+' / £'+GBPrate+' / €'+EURrate }, function(err, data, response) {
      if(err){
        console.log('CANNOT CREATE TWEET... Error');
      }
      else{
        console.log('PRICE TWEETED... Success!!!');
      }

    });
  }
   );
});
}

// grab & retweet as soon as program is running...
tweetPrice();
// retweet price every x milliseconds
setInterval(tweetPrice, 2576435);
