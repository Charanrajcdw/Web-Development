const CARD_DISPLAY_COUNT = 10;
let currentCard = "";

//containers
const EMPTY_CONTAINER = $("#emptyContainer");
const CARD_CONTAINER = $("#cardContainer");
const CARDS_CONTAINER = $("#cardsContainer");

//buttons
const LOAD_MORE_BUTTON = $("#loadMoreButton");
const BACK_BUTTON = $("#backButton");
const DELETE_BUTTON = $("#delete");
const DELETE_ALL_BUTTON = $("#deleteAll");
const INSERT_BUTTON = $("#insert");
const EDIT_BUTTON = $("#edit");
const CENTER_MODAL_CLOSE_BUTTON = $(".centerModalClose");
const SIDE_MODAL_CLOSE_BUTTON = $(".sideModalClose");
const MODAL_DELETE_BUTTON = $("#deleteButton");
const MODAL_MODIFY_BUTTON = $("#modifyButton");

//modals
const SIDE_MODAL = $("#sideModal");
const CENTER_MODAL = $("#centerModal");
const MODAL_BG = $("#modalBg");

//inputs
const INPUT_TITLE = $("#noteTitle");
const INPUT_CONTENT = $("#noteContent");
const COLOR_ICONS = $(".modal-color-icon");