require("dotenv").config();
let keys = require('./keys');
let Spotify = require('node-spotify-api');
let request = require('request');
let moment = require('moment');
let fs = require("fs");
let chalk = require('chalk');
let log = console.log;
let spotify = new Spotify(keys.spotify);
let spacing = " ";

let caseLine = process.argv[2];
let userLine = process.argv[3];

//*******WELCOME TO LIRI **********//
switch (caseLine) {
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doThis();
        break;
}

//Greeting message
log(chalk.grey("\nWelcome to LIRI! Type in a command below followed by a song, artist or movie:"), chalk.green("\nconcert-this  spotify-this-song  movie-this  do-what-it-says") + spacing);

//Bands in Town
function concertThis() {
    if (userLine == undefined) {
        log("Type in a musician or band to see their upcoming concerts.");
    }
    request("https://rest.bandsintown.com/artists/" + userLine + "/events?app_id=codingbootcamp", function (error, response, body) {
        saveSearch();
        // A status code 200 means a successful request in HTTP
        if (!error && response.statusCode === 200  && userLine != undefined) {
            let jBody = JSON.parse(body);
            for (i = 0; i < jBody.length; i++) {
                let showConcert =
                    "\n****************************** BANDS IN TOWN RESULT *******************************\n" +
                    "\nVenue: " + jBody[i].venue.name +
                    "\nCity: " + jBody[i].venue.city + ", " + jBody[i].venue.country +
                    "\nDate: "+ moment(jBody[i].datetime).format("MM/DD/YY");
                log(showConcert);
                logResults(showConcert);
            }
        } else {
            return log(error);
        }
    });
}

//Spotify track search query
function spotifyThis() {
    if (userLine == undefined) {
        userLine = "The Sign Ace of Base";
        log(chalk.grey("\nNo user input found, so here's the best song in the world."));
    };
    saveSearch();
    spotify.search({
        type: 'track',
        query: userLine,
    }, function (error, data) {
        if (!error && data) {
            let narrow = data.tracks.items;
            let showSpotify =
                "\n****************************** SPOTIFY RESULT *******************************\n" +
                "\nArtist: " + narrow[0].artists[0].name +
                "\nSong title: " + narrow[0].name +
                "\nAlbum name: " + narrow[0].album.name +
                "\nURL Preview: " + narrow[0].preview_url +
                "\n" + spacing + "\n";
            log(showSpotify);
            logResults(showSpotify);
        } else {
            return log(error);
        }
    });
}

//OMDB movie info dump
function movieThis() {
    if (userLine == undefined) {
        userLine = "Mr. Nobody"
        log(chalk.grey("\nHere's an overrated movie, enjoy"));
    }
    request("http://www.omdbapi.com/?t=" + userLine + "&y=&plot=short&apikey=trilogy", function(error, response, data) {
    saveSearch();
    if (!error && response.statusCode === 200 && userLine != undefined) {
        let jBody = JSON.parse(data);
        let showMovie =
            "\n****************************** OMDB RESULT *******************************\n" +
            "\nTitle: " + jBody.Title +
            "\nYear Released: " + jBody.Year +
            "\nIMDB Rating: " + jBody.imdbRating +
            "\nRotten Tomatoes Rating: " + jBody.Ratings[1].Value +
            "\nCountry: " + jBody.Country +
            "\nLanguage: " + jBody.Language +
            "\nPlot Summary: " + jBody.Plot +
            "\nActors: " + jBody.Actors +
            "\n" + spacing + "\n";
        log(showMovie);
        logResults(showMovie);
    } else {
        return log(error);
    }
});
}

//Reads contents of random.txt, runs spotify function
function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return log(error);
        }
        let chop = data.split(",");
        caseLine = chop[0];
        userLine = chop[1];
        if (caseLine === "spotify-this-song") {
            spotifyThis();
        }
    });
}

//Adds search terms and results to log.txt file
function logResults(results) {
    fs.appendFile("log.txt", results, function(error, logged) {
        if (error) return log(error);
    });
}

function saveSearch() {
    logResults("\n\n____________________NEW  " + caseLine + "  SEARCH_____________________\nRESULTS FOR:\n" + userLine + "\n");
}
