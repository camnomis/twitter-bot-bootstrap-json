
// Dependencies =========================
var
    twit = require('twit')

var Twitter = new twit({
  consumer_key: process.env.consumerKey,
  consumer_secret: process.env.consumerSecret,
  access_token: process.env.accessToken,
  access_token_secret: process.env.accessTokenSecret
})

var tweetTrack = function(){

const https = require('https');

https.get('https://ws.audioscrobbler.com/2.0/?method=user.getLovedTracks&user=zharrt&limit=1&api_key=51de025812af79cb70f4a872936181a0&format=json', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    // *** This stuff has been moved inside this callback function, so it can "see" the data ***
    var response_object = JSON.parse(data);
    var Artist = response_object.lovedtracks.track[0].artist.name;
    var Lovedtrack = response_object.lovedtracks.track[0].name;
//    var Image = response_object.lovedtracks.track[0].image[1]['#text'];
//    var URL = response_object.lovedtracks.track[0].url;

    Twitter.post('statuses/update', { status: 'New loved track '+Artist+' - '+Lovedtrack }, function(err, data, response) {
      if(err){
        console.log(data);
      }
      else{
        console.log('TRACK TWEETED... Success!!!');
      }

    });
  }
   );
});
}

// grab & retweet as soon as program is running...
tweetTrack();
// retweet track every x milliseconds
setInterval(tweetTrack, 2576435);
