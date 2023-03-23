let videoData;
let posterData;

/**
 * This function fetches the videos and posters data
 */
async function getVideoAndPosterData() {
  const VIDEO_RESPONSE = await fetch("https://mocki.io/v1/4da47fc5-bbf3-4e41-b35f-c88a584bc4b0");
  videoData = await VIDEO_RESPONSE.json();

  const POSTER_RESPONSE = await fetch("https://mocki.io/v1/8c9b378b-d248-4203-93b0-b8e7659ac346");
  posterData = await POSTER_RESPONSE.json();
}

/**
 * This function dynamically adds the video, videoTitle and videoDescription
 */
const addVideoDetails = () => {
  //adding video
  const VIDEO = $("<video>");
  VIDEO.attr("src", videoData.videoUrl);
  VIDEO.attr("controls", true);
  VIDEO.attr("poster", "https://www.slashcam.de/images/news/sprite_fright1-16857_PIC1.jpg");
  VIDEO.css("width", "100%");
  $("#videoContainer").append(VIDEO);

  //adding video title
  const TITLE = $("<h2>");
  TITLE.text(videoData.title);
  $("#videoDetailsContainer").append(TITLE);

  //adding video description
  const DESCRIPTION = $("<p>");
  DESCRIPTION.text(videoData.description);
  $("#videoDetailsContainer").append(DESCRIPTION);
};

/**
 * This function dynamically creates the comment cards and adds it to commentContainer
 */
const addComments = () => {
  const COMMENT_FRAGMENT = $(document.createDocumentFragment());
  $(videoData.comments).each((index, comment) => {
    // image container
    const IMAGE = $("<img>");
    IMAGE.attr("src", comment.image);
    IMAGE.attr("alt", comment.name);
    const IMAGE_CONTAINER = $("<div>");
    IMAGE_CONTAINER.addClass("comment-image-container");
    IMAGE_CONTAINER.append(IMAGE);

    // details container
    const NAME = $("<span>");
    NAME.text(comment.name);
    const NAME_CONTAINER = $("<div>");
    NAME_CONTAINER.addClass("comment-name");
    const DESCRIPTION = $("<p>");
    DESCRIPTION.text(comment.comment);
    const DESCRIPTION_CONTAINER = $("<div>");
    DESCRIPTION_CONTAINER.addClass("comment-description");
    const DETAILS_CONTAINER = $("<div>");
    DETAILS_CONTAINER.addClass("comment-details-container");
    NAME_CONTAINER.append(NAME);
    DESCRIPTION_CONTAINER.append(DESCRIPTION);
    DETAILS_CONTAINER.append(NAME_CONTAINER);
    DETAILS_CONTAINER.append(DESCRIPTION_CONTAINER);

    //main container
    const COMMENT_CONTAINER = $("<div>");
    COMMENT_CONTAINER.addClass("comment flex");
    COMMENT_CONTAINER.append(IMAGE_CONTAINER);
    COMMENT_CONTAINER.append(DETAILS_CONTAINER);

    //adding comment
    COMMENT_FRAGMENT.append(COMMENT_CONTAINER);
  });
  $("#commentContainer").append(COMMENT_FRAGMENT);
};

/**
 * This function dynamically creates the posters and adds it to postersContainer
 */
const addPosters = () => {
  const POSTER_FRAGMENT = $(document.createDocumentFragment());
  $(posterData).each((index, poster) => {
    const IMAGE = $("<img>");
    IMAGE.attr("src", poster.imageUrl);
    IMAGE.attr("alt", poster.title);
    POSTER_FRAGMENT.append(IMAGE);
  });
  $("#postersContainer").append(POSTER_FRAGMENT);
};

// adding dynamic data
getVideoAndPosterData().then(() => {
  addVideoDetails();
  addComments();
  addPosters();
});
