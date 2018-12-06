# liri-node-app
Node Project 

Hello and Welcome to this installment of Github tours. Today we'll be exploring LIRI bot, a project that uses node and contains four commands. 
Typing "concert-this" and a band uses the Bands In Town API to locate where and when future concerts are.
Typing "spotify-this-song" and a song name uses the Spotify API to find the artist, album, and a preview URL.
Typing "movie-this" and a movie title brings back a multitude of information about the movie.
"do-what-it-says" reads a text file and invokes the spotify-this-song command on the text.


![alt text](https://i.imgur.com/sLLZPP5.png "Switch Cases")
LIRI is built on switch cases which different functions depending on what is typed in index 2 on the terminal command line (variable caseLine). Index 3 and beyond are the user search terms (variable userLine). 

![alt text](https://i.imgur.com/CynRQun.png "Bands in Town Function")
Inside concertThis() are conditional statements which check if userLine is undefined. If it is not undefined it sends a request query to Bands in Town and checks if the response code is 200 and not an error. If those conditions are met then it does a for loop through the recieved results.

![alt text](https://i.imgur.com/cVAdqum.png "Spotify and OMDB Function")

![alt text](https://i.imgur.com/GhEmGqp.png "Do this ")

![alt text](https://i.imgur.com/MYPrHzb.png "Do this ")

![alt text](https://i.imgur.com/Z1Xbhqb.png "Append Results to Text File")



