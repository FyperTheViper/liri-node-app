require("dotenv").config();
let keys = require('./keys');
let Spotify = require('node-spotify-api');
let request = require('request');
let moment = require('moment');
let fs = require("fs");
let chalk = require('chalk');
let log = console.log
let spotify = new Spotify(keys.spotify);
let spacing = "";

let caseLine = process.argv[2];
let userLine = process.argv[3];

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

function concertThis() {
    if (userLine == undefined) {
        log("Type in a musician or band to see their upcoming concerts.");
    };
    request("https://rest.bandsintown.com/artists/" + userLine + "/events?app_id=codingbootcamp", function (err, response, body) {

        // A status code 200 means a successful request in HTTP
        if (!err && response.statusCode === 200) {
            let jBody = JSON.parse(body);
            for (i = 0; i < jBody.length; i++) {
                let showConcert =
                    chalk.grey("\n****************************** BANDS IN TOWN RESULT *******************************\n") +
                    "\nVenue: " + chalk.green.bold(jBody[i].venue.name) +
                    "\nCity: " + chalk.green.bold(jBody[i].venue.city + ", " + jBody[i].venue.country) +
                    "\nDate: "+ chalk.green.bold(moment(jBody[i].datetime).format("MM/DD/YY"));
                log(showConcert);
            }
        } else {
            log(err);
        }
    });
}

function spotifyThis() {
    if (userLine == undefined) {
        userLine = "The Sign Ace of Base"
        log("No user input found, so here's the best song in the world.");
    };
    spotify.search({
        type: 'track',
        query: userLine,
    }, function (err, data) {
        if (!err && data) {
            let narrow = data.tracks.items
            let showSpotify =
                chalk.grey("\n****************************** SPOTIFY RESULT *******************************\n") +
                "\nArtist: " + chalk.green.bold(narrow[0].artists[0].name) +
                "\nSong title: " + chalk.green.bold(narrow[0].name) +
                "\nAlbum name: " + chalk.green.bold(narrow[0].album.name) +
                "\nURL Preview: " + narrow[0].preview_url +
                "\n" + spacing + "\n";
            log(showSpotify);
        };
    });
};

function movieThis() {
    if (userLine == undefined) {
        userLine = "Mr. Nobody"
        log("Here's an overrated movie, enjoy");
    };
    request("http://www.omdbapi.com/?t=" + userLine + "&y=&plot=short&apikey=trilogy", function(error, response, data) {

    if (!error && response.statusCode === 200 && userLine != undefined) {
        let jBody = JSON.parse(data);
        let showMovie =
            chalk.grey("\n****************************** OMDB RESULT *******************************\n") +
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
    }
});
};

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