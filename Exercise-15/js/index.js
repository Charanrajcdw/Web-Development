import videoData from "../assets/video.json" assert { type: "json" };
import posterData from "../assets/posters.json" assert { type: "json" };

//-----videos section-----
let videoContainer = document.getElementById("videoContainer");
let videoTitle = document.getElementById("videoTitle");
let videoDescription = document.getElementById("videoDescription");

//adding video
let video = document.createElement("video");
video.src = videoData.videoUrl;
video.setAttribute("width", "100%");
video.controls = true;
videoContainer.appendChild(video);

//adding video title
let title = document.createElement("span");
title.innerText = videoData.title;
videoTitle.appendChild(title);

//adding video description
let description = document.createElement("p");
description.innerText = videoData.description;
videoDescription.appendChild(description);

//-----comments section-----
let commentMainContainer = document.getElementById("commentContainer");

for (let comment of videoData.comments) {
  //image container
  let image = document.createElement("img");
  image.src = comment.image;
  image.alt = comment.name;
  let imageContainer = document.createElement("div");
  imageContainer.className = "comment-image-container";
  imageContainer.appendChild(image);

  //details container
  let name = document.createElement("span");
  name.innerText = comment.name;
  let nameContainer = document.createElement("div");
  nameContainer.className = "comment-name";
  let description = document.createElement("p");
  description.innerText = comment.comment;
  let descriptionContainer = document.createElement("div");
  descriptionContainer.className = "comment-description";
  let detailsContainer = document.createElement("div");
  detailsContainer.className = "comment-details-container";
  nameContainer.appendChild(name);
  descriptionContainer.appendChild(description);
  detailsContainer.appendChild(nameContainer);
  detailsContainer.appendChild(descriptionContainer);

  //main container
  let commentContainer = document.createElement("div");
  commentContainer.className = "comment flex";
  commentContainer.appendChild(imageContainer);
  commentContainer.appendChild(detailsContainer);

  //adding comment
  commentMainContainer.appendChild(commentContainer);
}

//-----posters section-----
let posterMainContainer = document.getElementById("postersContainer");

for (let poster of posterData) {
  // adding image to posters
  let image = document.createElement("img");
  image.src = poster.imageUrl;
  image.alt = poster.title;
  posterMainContainer.appendChild(image);
}
