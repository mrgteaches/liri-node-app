require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var moment = require('moment');

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var userCommand=process.argv[2];

var userInput=process.argv.splice(3,process.argv.length).join(' ');

switch (userCommand) {
  
  case "concert-this":
      myConcert(userInput);
      break;
  case "spotify-this-song":
      mySpotify(userInput);
      break;
  case "movie-this":
      myMovies(userInput);
      break;
  case "do-what-it-says":
      doWhatItSays();
      break;
  
};

function myConcert(userInput) {
  var artist = userInput;
  var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(url).then(
      function (response) {
          
          for (var i = 0; i < response.data.length; i++) {
              console.log("Concert Time: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
              console.log("Concert Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
              console.log("Concert Venue: " + response.data[i].venue.name);
              console.log('--------------------------------------------------')              
          }
      }
  );
}; //closes myConcert function

function mySpotify(userInput) {
  var song = userInput;
  if (!song) {
      song = "the sign Ace of Base" 
  }
  spotify.search({ type: 'track', query: song }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    console.log("\n---------------------\nSong Name: " + data.tracks.items[0].name);
    console.log("Artist(s) Name: "+ data.tracks.items[0].artists[0].name);
    console.log("Album Name: "+ data.tracks.items[0].album.name);  
    console.log("Preview URL: " + data.tracks.items[0].preview_url+"\n---------------\n"); 
  });
  } // closes mySpotify function

function myMovies(userInput) {
    var movie = userInput;
    if (!movie) {
        console.log("If you haven't watched 'Mr. Nobody,' then you should.")
        console.log("It's on Netflix!")
        movie = "Mr. Nobody"
    }
    var url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    axios.get(url).then(
        function (response) {
                console.log("--------------------------\n")
                console.log("Movie Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("\n--------------------------\n")           
        }
    );
}; //closes myMovies function

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {

      if (error) {
          return console.log(error);
      }
  
      var dataArr = data.split(",");
      
      if (dataArr[0] === "spotify-this-song") {
          var songcheck = dataArr[1].slice(1, -1);      // Removes quotes from text file
          console.log("Song Check: "+songcheck)
          mySpotify(songcheck);
      } else if (dataArr[0] === "concert-this") {
          var venueName = dataArr[1].slice(1, -1);
          console.log("Venue Name: "+venueName)
          myConcert(venueName);
      } else if(dataArr[0] === "movie-this") {
          var movieName = dataArr[1].slice(1, -1);
          console.log("Movie Name: "+movieName)
          myMovies(movieName);
      }
  });
};



// Commented out old version starts here!!!!!!!

// //Bands in town starts here

// var nodeArgs = process.argv;

// var artist = "";

// if(nodeArgs[2]=== "concert-this") {

//   for (var i = 3; i < nodeArgs.length; i++) {
//     if (i > 3 && i < nodeArgs.length) {
//       artist = artist + "+" + nodeArgs[i];
//     } else {
//       artist += nodeArgs[i];
//     }
//   }

//   var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// axios.get(queryUrl).then(
//   function(response) {
//     //console.log(response.data);
//     console.log(JSON.stringify(response.data, null, 2));

//   })
// .catch(function(error) {
//   if (error.response) {
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     console.log(error.request);
//   } else {
//     console.log("Error", error.message);
//   }
//   console.log(error.config);
// });
// } //closes big if


// //Omdb starts here

// var nodeArgs = process.argv;

// var movie = "";

// if(nodeArgs[2]=== "movie-this") {

//   if(nodeArgs[3]) {

//     for (var i = 3; i < nodeArgs.length; i++) {
//       if (i > 3 && i < nodeArgs.length) {
//         movie = movie + "+" + nodeArgs[i];
//       } else {
//         movie += nodeArgs[i];
//       }
//     }//closes for loop
//   } else {
//   movie = "Mr. Nobody";
//   } //closes second if statement
  

//   var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// axios.get(queryUrl).then(
//   function(response) {
//     console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating
//     + "\nRotten Tomatoes Rating: " + JSON.stringify(response.data.Ratings[1].Value)  + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language
//     + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
//   })
// .catch(function(error) {
//   if (error.response) {
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     console.log(error.request);
//   } else {
//     console.log("Error", error.message);
//   }
//   console.log(error.config);
// });


// } //closes big if

// // spotify starts here



// var nodeArgs = process.argv;

// var song = "";

// if (nodeArgs[2]=== "spotify-this-song") {

//   if (nodeArgs[3]) {    

//     for (var i = 3; i < nodeArgs.length; i++) {
//       if (i > 3 && i < nodeArgs.length) {
//         song = song + "+" + nodeArgs[i];
//       }     else {
//         song += nodeArgs[i];
//       }
//     } //closes for loop
//   } else {
//   song= "The Sign";
//   } 

//   spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){    
//     if(!error){
//     for(var i = 0; i < data.tracks.items.length; i++){
//         var songData = data.tracks.items[i];
//                 //artist
//         console.log("Artist: " + songData.artists[0].name);
//                 //song name
//         console.log("Song: " + songData.name);
//                 //spotify preview link
//         console.log("Preview URL: " + songData.preview_url);
//                 //album name
//         console.log("Album: " + songData.album.name);
//         console.log("-----------------------");
//         } 
//     } else {
//     console.log('Error occurred.');
//       }
//     });
//   } //closes spotify if

// //Do-what-it-says starts here

// if (nodeArgs[2] === "do-what-it-says") {

 

//   fs.readFile('random.txt', "utf8", function(error, data){
//     var txt = data.split(',');

//     spotifyThisSong(txt[1]);
//   });

// }




