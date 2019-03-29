# The liri-node-app

LIRI, which stands for "Language Interpretation and Recognition Interface," is a command line node app that takes in parameters and gives back data to the user. Using OMDB for movies, Spotify for songs, and Bands in Town for upcoming concerts, the liri-node-app searches these APIs and returns data to the user based on specific commands entered and movie, song, or band/artist input.

If the user enters the command **movie-this** followed by the name of a movie, the app will search the OMDB API and print the following to the console:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   
If no movie name is entered following the command movie-this, the app will print the above information for the movie "Mr. Nobody" by default.

If the user enters the command **spotify-this-song** followed by the name of a song, the app will search the Spotify API and print the following to the console:
  * Artist(s)
  * The song's name
  * The album that the song is from
  * A preview link of the song from Spotify
  
If no song is entered following the command spotify-this-song, the app will print the above information for the song "The Sign" by Ace of Base by default.

If the user enters the command **concert-this** followed by the name of a band or artist, the app will search the Bands in Town API and print the following information on upcoming concerts to the console:
  * Name of the venue
  * Venue location
  * Date of the Event 
  
 The output for the date is formatted to MM/DD/YYYY using moment.js.
 
Finally, if the user enters the command **do-what-it-says** the app takes the text from random.txt and uses the appropriate API to search for information on the song, movie or band/artist found in random.txt. Currently the text reads spotify-that-song "I Want It That Way." 
 
 
