import data from "../assets/friends.json" assert {type:'json'};

const cardsContainer = document.getElementById("cardsContainer");

let result = "";
for (let friendDetail of data) {
  result += '<div class="friend-card"><div class="friend-image">';
  result += "<img src=" + friendDetail.img + " alt=" + friendDetail.first_name + " />";
  result += '</div><div class="friend-details">';
  result += '<p class="friend-name">' + friendDetail.first_name + " " + friendDetail.last_name + "</p>";
  result += '<p class="friend-email">' + friendDetail.email + "</p>";
  result += "</div></div>";
}
cardsContainer.innerHTML = result;
