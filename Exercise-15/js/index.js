import videoData from "../assets/video.json" assert { type: "json" };
import posterData from "../assets/posters.json" assert { type: "json" };

//-----videos section-----
const videoContainer = document.getElementById("videoContainer");
const videoDetailsContainer = document.getElementById("videoDetailsContainer");

/**
 * This function dynamically adds the video, videoTitle and videoDescription
 */
function addVideoDetails() {
  //adding video
  const video = document.createElement("video");
  video.src = videoData.videoUrl;
  video.setAttribute("width", "100%");
  video.controls = true;
  video.poster = "https://www.slashcam.de/images/news/sprite_fright1-16857_PIC1.jpg";
  videoContainer.appendChild(video);

  //adding video title
  const title = document.createElement("h2");
  title.innerText = videoData.title;
  videoDetailsContainer.appendChild(title);

  //adding video description
  const description = document.createElement("p");
  description.innerText = videoData.description;
  videoDetailsContainer.appendChild(description);
}

//-----comments section-----
const commentMainContainer = document.getElementById("commentContainer");

/**
 * This function dynamically creates the comment cards and adds it to commentContainer
 */
function addComments() {
  const commentFragment = new DocumentFragment();
  for (let comment of videoData.comments) {
    //image container
    const image = document.createElement("img");
    image.src = comment.image;
    image.alt = comment.name;
    const imageContainer = document.createElement("div");
    imageContainer.className = "comment-image-container";
    imageContainer.appendChild(image);

    //details container
    const name = document.createElement("span");
    name.innerText = comment.name;
    const nameContainer = document.createElement("div");
    nameContainer.className = "comment-name";
    const description = document.createElement("p");
    description.innerText = comment.comment;
    const descriptionContainer = document.createElement("div");
    descriptionContainer.className = "comment-description";
    const detailsContainer = document.createElement("div");
    detailsContainer.className = "comment-details-container";
    nameContainer.appendChild(name);
    descriptionContainer.appendChild(description);
    detailsContainer.appendChild(nameContainer);
    detailsContainer.appendChild(descriptionContainer);

    //main container
    const commentContainer = document.createElement("div");
    commentContainer.className = "comment flex";
    commentContainer.appendChild(imageContainer);
    commentContainer.appendChild(detailsContainer);

    //adding comment
    commentFragment.appendChild(commentContainer);
  }
  commentMainContainer.appendChild(commentFragment);
}

//-----posters section-----
const posterMainContainer = document.getElementById("postersContainer");

/**
 * This function dynamically creates the posters and adds it to postersContainer
 */
function addPosters() {
  const posterFragment = new DocumentFragment();
  for (let poster of posterData) {
    // adding image to posters
    const image = document.createElement("img");
    image.src = poster.imageUrl;
    image.alt = poster.title;
    posterFragment.appendChild(image);
  }
  posterMainContainer.appendChild(posterFragment);
}

// adding dynamic data
addVideoDetails();
addComments();
addPosters();
