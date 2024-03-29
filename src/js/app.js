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
 *      Name:      Hao Han Kao
 *      Student ID: 151604220
 *      Date:       2024/03/29
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
display("1");
document.addEventListener("DOMContentLoaded", () => {
  const artistNav = document.querySelector(".artist");
  artists.forEach((artist) => {
    const button = document.createElement("button");

    button.textContent = artist.name;
    button.setAttribute("data-artist-id", artist.artistId);

    button.addEventListener("click", function () {
      display(artist.artistId);
    });

    artistNav.appendChild(button);
  });
});

function display(artistId) {
  const selectedArtist = document.getElementById("selected-artist");
  const artistBackground = document.getElementById("artist-background");

  const artist = artists.find((a) => a.artistId === artistId);
  selectedArtist.innerHTML = "";

  // blue check herererere bug !!!
  const subscriptionDiv = document.createElement("div");
  selectedArtist.appendChild(subscriptionDiv);
  const verifyDiv = document.createElement("span");
  verifyDiv.innerHTML = "Verified Artist";
  const blueCheckElem = document.createElement("img");
  blueCheckElem.src = new URL("../images/blueCheck.png", import.meta.url);

  subscriptionDiv.className = "blueCheck";
  blueCheckElem.id = "blueCheck";
  subscriptionDiv.appendChild(blueCheckElem);
  subscriptionDiv.appendChild(verifyDiv);

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
  songsTbody.innerHTML = "";
  let songArray = [];

  for (let i = 0; i < songs.length; i++) {
    if (songs[i].artistId === artistId) {
      songArray.push(songs[i]);
    }
  }

  for (let i = 0; i < songArray.length; i++) {
    const tr = document.createElement("tr");
    tr.addEventListener("click", () => console.log(songArray[i]));
    const tdTitle = document.createElement("td");
    const link = document.createElement("a");
    link.href = songArray[i].url;
    // link.target = "_blank";
    link.textContent = songArray[i].title;
    tdTitle.appendChild(link);

    const tdYear = document.createElement("td");
    tdYear.textContent = songArray[i].year;

    const tdDuration = document.createElement("td");
    const minutes = Math.floor(songArray[i].duration / 60);
    const seconds = songArray[i].duration % 60;
    tdDuration.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    tr.appendChild(tdTitle);
    tr.appendChild(tdYear);
    tr.appendChild(tdDuration);

    songsTbody.appendChild(tr);
  }
}

// For debugging, display all of our data in the console. You can remove this later.
console.log({ artists, songs }, "App Data");
