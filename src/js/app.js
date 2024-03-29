/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <YOUR_NAME>
 *      Student ID: <YOUR_STUDENT_ID>
 *      Date:       <SUBMISSION_DATE>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
document.addEventListener("DOMContentLoaded", () => {
  const artistNav = document.querySelector(".artist");
  artists.forEach((artist) => {
    const button = document.createElement("button");

    button.textContent = artist.name;
    button.setAttribute("data-artist-id", artist.artistId);

    button.className = "bg-sky-500 hover:bg-sky-700 text-yellow font-bold py-1 px-4 rounded-full";
    button.addEventListener("click", function () {
      displayArtistDetails(artist.artistId);
    });

    artistNav.appendChild(button); // Append the button to the artist navigation
    // Append the button to the menu
  });
});

function displayArtistDetails(artistId) {
  displayBasicInfo(artistId);
}

function displayBasicInfo(artistId) {
  const selectedArtist = document.getElementById("selected-artist");
  const artistBackground = document.getElementById("artist-background");

  const artist = artists.find((a) => a.artistId === artistId);
  selectedArtist.innerHTML = "";

  // blue check herererere bug !!!
  const blueCheckElem = document.createElement("img");
  blueCheckElem.setAttribute("src", "images/blueCheck.png");
  blueCheckElem.className = "blueCheck";
  selectedArtist.appendChild(blueCheckElem);

  //點擊後會出現歌手name and Wiki, ig
  const artistNameElem = document.createElement("h1");
  artistNameElem.id = "artist-name";

  artistNameElem.textContent = artist.name;
  selectedArtist.appendChild(artistNameElem);

  //背景圖
  artistBackground.style.backgroundImage = `url('${artist.profileUrl}')`;

  artist.urls.forEach((link, index, array) => {
    const anchor = document.createElement("a");
    anchor.id = "artist-link";
    anchor.href = link.url;
    anchor.textContent = link.name;
    selectedArtist.appendChild(anchor);

    if (index !== array.length - 1) {
      selectedArtist.appendChild(document.createTextNode(","));
    }
  });

  //music list
  const songsTbody = document.getElementById("songs");
  let songArray = [];
  for (let i = 0; i < songs.length; i++) {
    if (songs.artistId === artistId) {
      songArray.push(songs[i]);
    }
  }
}

// function displaySongs(artistId) {
//   const tbody = document.getElementById("songs");
//   const artist = artists.find((a) => a.artistId === artistId);

//   tbody.innerHTML = "";

//   const songsForArtist = songs.filter((song) => {
//     return song.artistId === artist.artistId && !song.expicit;
//   });
// }

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
