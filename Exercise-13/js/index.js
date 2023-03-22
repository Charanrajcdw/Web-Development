import data from "../assets/friends.json" assert { type: "json" };

const cardsContainer = document.getElementById("cardsContainer");

/**
 * Creates the friends card containers and adds it to the main page
 */
function addFriendsData() {
  const friendsCards = new DocumentFragment();
  for (let friendDetail of data) {
    // image container
    const friendImageContainer = document.createElement("div");
    friendImageContainer.classList.add("friend-image");
    const image = document.createElement("img");
    image.setAttribute("src", friendDetail.img);
    image.setAttribute("alt", friendDetail.first_name);
    friendImageContainer.appendChild(image);

    // detail container
    const friendDetailsContainer = document.createElement("div");
    friendDetailsContainer.classList.add("friend-details");
    const friendName = document.createElement("p");
    friendName.classList.add("friend-name");
    friendName.innerText = friendDetail.first_name + " " + friendDetail.last_name;
    const friendEmail = document.createElement("a");
    friendEmail.classList.add("friend-email");
    friendEmail.innerText = friendDetail.email;
    friendDetailsContainer.appendChild(friendName);
    friendDetailsContainer.appendChild(friendEmail);

    // main container
    const friendCardContainer = document.createElement("div");
    friendCardContainer.classList.add("friend-card");
    friendCardContainer.appendChild(friendImageContainer);
    friendCardContainer.appendChild(friendDetailsContainer);

    friendsCards.appendChild(friendCardContainer);
  }
  cardsContainer.appendChild(friendsCards);
}

addFriendsData();
