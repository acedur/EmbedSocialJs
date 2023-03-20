const div = document.getElementById("layout");

const profile_image = document.getElementById("profile_image");
const name = document.getElementById("name");
const date = document.getElementById("date");
const source_type = document.getElementById("source_type");
const image = document.getElementById("image");
const caption = document.getElementById("caption");
const likes = document.getElementById("likes");

const loadMoreButton = document.getElementById("load-more");

async function getData() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function renderScreen() {
  getData().then((res) => {
    res.forEach((element) => {
      // card container
      let elem = document.createElement("div");
      elem.classList.add("card-container");
      // header
      let header = document.createElement("div");
      header.classList.add("header", "width-100");
      let headerLeft = document.createElement("div");
      headerLeft.classList.add("header-left");
      // profile_image
      let profileImage = document.createElement("img");
      profileImage.classList.add("profile-img");
      profileImage.src = element.profile_image;
      elem.appendChild(profileImage);
      // name and date
      let nameDate = document.createElement("div");
      nameDate.classList.add("name-date");
      // name
      let fullName = document.createElement("div");
      fullName.classList.add("name");
      fullName.innerHTML = element.name;
      elem.appendChild(fullName);
      // date
      let newDate = document.createElement("div");
      newDate.classList.add("date");
      newDate.innerHTML = element.date;
      elem.appendChild(newDate);

      // source
      let source = document.createElement("div");
      source.classList.add("source");
      source.innerHTML = element.source_type;
      elem.appendChild(source);

      // image
      let bigImage = document.createElement("img");
      bigImage.classList.add("image", "width-100");
      bigImage.src = element.image;
      elem.appendChild(bigImage);
      // caption
      let text = document.createElement("div");
      text.classList.add("caption");
      text.innerHTML = element.caption;
      elem.appendChild(text);
      // heart
      let heart = document.createElement("img");
      heart.setAttribute("id", "heart");
      heart.classList.add("heart");
      heart.src = "/icons/heart.svg";
      // like
      let like = document.createElement("div");
      like.classList.add("likes", "width-100");

      like.innerHTML = element.likes;
      elem.appendChild(like);
      elem.appendChild(heart);
      heart.addEventListener("click", (e) => {
        if (!e.target.classList.contains("isLiked")) {
          let countLikes = parseInt(element.likes++);

          like.innerHTML = countLikes;
          heart.classList.add("isLiked");
        } else {
          heart.classList.remove("isLiked");
        }
      });
      div.appendChild(elem);
    });
  });
}
3;
// load more button
const cardLimit = 2;
const cardIncrease = 1;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

const handleButtonStatus = () => {
  if (pageCount === currentPage) {
    loadMoreButton.classList.add("disabled");
    loadMoreButton.setAttribute("disabled", true);
  }
};

const addCards = (pageIndex) => {
  currentPage = pageIndex;

  handleButtonStatus();

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;

  for (let i = startRange + 1; i <= endRange; i++) {
    renderScreen(i);
  }
};

window.onload = function () {
  addCards(currentPage);
  loadMoreButton.addEventListener("click", () => {
    renderScreen(currentPage);
  });
};
let layout = document.getElementById("layout");
console.log(layout);
let numberOfColumns = document.getElementById("numberOfColumns");
let column = 0;

// columns
numberOfColumns.addEventListener("change", (e) => {
  console.log(e.target.value);
  column = e.target.value;
  layout.style.gridTemplateColumns = `repeat(${column},1fr)`;
});

// light / dark mode
function darkMode() {
  document.getElementById("layout").className = "dark-mode";
}
function lightMode() {
  document.getElementById("layout").classList.remove("dark-mode");
}
