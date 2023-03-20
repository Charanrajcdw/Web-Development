import data from "../assets/friends.json" assert { type: "json" };

const cardsContainer = document.getElementById("cardsContainer");

let result = new DocumentFragment();
for (let friendDetail of data) {
  // image container
  let friendImageContainer = document.createElement("div");
  friendImageContainer.classList.add("friend-image");
  let image = document.createElement("img");
  image.setAttribute("src", friendDetail.img);
  image.setAttribute("alt", friendDetail.first_name);
  friendImageContainer.appendChild(image);

  // detail container
  let friendDetailsContainer = document.createElement("div");
  friendDetailsContainer.classList.add("friend-details");
  let friendName = document.createElement("p");
  friendName.classList.add("friend-name");
  friendName.innerText = friendDetail.first_name + " " + friendDetail.last_name;
  let friendEmail = document.createElement("p");
  friendEmail.classList.add("friend-email");
  friendEmail.innerText = friendDetail.email;
  friendDetailsContainer.appendChild(friendName);
  friendDetailsContainer.appendChild(friendEmail);

  // main container
  let friendCardContainer = document.createElement("div");
  friendCardContainer.classList.add("friend-card");
  friendCardContainer.appendChild(friendImageContainer);
  friendCardContainer.appendChild(friendDetailsContainer);
  
  result.appendChild(friendCardContainer);
}
cardsContainer.appendChild(result);
