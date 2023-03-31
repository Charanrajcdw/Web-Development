let videoData;
let posterData;

/**
 * This function fetches the videos data
 */
(() => {
  $.ajax({
    url: "https://mocki.io/v1/4da47fc5-bbf3-4e41-b35f-c88a584bc4b0",
    success: (data) => {
      addVideoDetails(data);
      addComments(data);
    },
    error: (err) => {
      console.log(err);
      $("#videoContainer").html("Can't able to fetch the video");
      $("#commentContainer").html("Can't able to fetch the comments");
    },
  });
})();

/**
 * This function fetches the posters data
 */
(() => {
  $.ajax({
    url: "https://mocki.io/v1/8c9b378b-d248-4203-93b0-b8e7659ac346",
    success: (data) => {
      addPosters(data);
    },
    error: (err) => {
      console.log(err);
      $("#postersContainer").html("Can't able to fetch the posters");
    },
  });
})();

/**
 * This functions helps to create a element with given attributes and innertext
 *
 * @param {String} tag - the element to create
 * @param {Object} attributes - the attributes of the element
 * @param {String|Object} content - the innertext or innerhtml of the element
 * @returns the created element
 */
function createCustomElement(tag, attributes, content) {
  const element = $(tag);
  for (let attributeName in attributes) {
    element.attr(attributeName, attributes[attributeName]);
  }
  if (content) {
    typeof content === String ? element.text(content) : element.append(content);
  }
  return element;
}

/**
 * This function dynamically adds the video, videoTitle and videoDescription
 */
const addVideoDetails = (videoData) => {
  $("#videoContainer").prepend(
    createCustomElement("<video>", {
      src: videoData.videoUrl,
      poster: "https://www.slashcam.de/images/news/sprite_fright1-16857_PIC1.jpg",
    })
  );
  $("#playButton").removeClass("hide");
  $("#videoDetailsContainer").append(createCustomElement("<h2>", {}, videoData.title));
  $("#videoDetailsContainer").append(createCustomElement("<p>", {}, videoData.description));
};

$("#playButton").click(() => {
  $("#playButton").addClass("hide");
  const VIDEO = $("#videoContainer video");
  VIDEO.attr("controls", "controls");
  VIDEO.trigger("play");
});

/**
 * This function dynamically creates the comment cards and adds it to commentContainer
 */
const addComments = (videoData) => {
  const COMMENT_FRAGMENT = $(document.createDocumentFragment());
  $(videoData.comments).each((index, comment) => {
    // image container
    const IMAGE = createCustomElement("<img>", { src: comment.image, alt: comment.name });
    const IMAGE_CONTAINER = createCustomElement("<div>", { class: "comment-image-container" }, IMAGE);

    // details container
    const NAME_CONTAINER = createCustomElement("<div>", { class: "comment-name" }, createCustomElement("<span>", {}, comment.name));
    const DESCRIPTION_CONTAINER = createCustomElement("<div>", { class: "comment-description" }, createCustomElement("<p>", {}, comment.comment));
    const DETAILS_CONTAINER = createCustomElement("<div>", { class: "comment-details-container" });
    DETAILS_CONTAINER.append(NAME_CONTAINER, DESCRIPTION_CONTAINER);

    //main container
    const COMMENT_CONTAINER = createCustomElement("<div>", { class: "comment flex" });
    COMMENT_CONTAINER.append(IMAGE_CONTAINER, DETAILS_CONTAINER);
    COMMENT_FRAGMENT.append(COMMENT_CONTAINER);
  });
  $("#commentContainer").append(COMMENT_FRAGMENT);
};

/**
 * This function dynamically creates the posters and adds it to postersContainer
 */
const addPosters = (posterData) => {
  const POSTER_FRAGMENT = $(document.createDocumentFragment());
  $(posterData).each((index, poster) => {
    POSTER_FRAGMENT.append(createCustomElement("<img>", { src: poster.imageUrl, alt: poster.title }));
  });
  $("#postersContainer").append(POSTER_FRAGMENT);
};
