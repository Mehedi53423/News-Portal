//Load Categories
const categories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

//Display Categories
const displayCategories = async (data) => {
  const newsCategory = document.getElementById("newsCategory");
  data.forEach((category) => {
    const { category_name, category_id } = category;
    const Option = document.createElement("li");
    Option.classList.add(
      "font-bold",
      "border",
      "shadow-2xl",
      "hover:bg-indigo-500",
      "hover:text-white",
      "m-2",
      "px-4",
      "py-2",
      "rounded-xl"
    );
    Option.innerHTML = `
          <a onclick="loadCard(${category_id})">${category_name}</a>
          `;
    newsCategory.appendChild(Option);
  });
};

//Cards
const cards = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCard(data.data);
    console.log(data.data);
  } catch (error) {
    console.log(error);
  }
};

//Display Card
const displayCard = (cards) => {
  const cardSection = document.getElementById("cardSection");
  cardSection.textContent = "";

  const foundedMessege = document.getElementById("foundedMessage");
  foundedMessege.classList.remove("hidden");

  const foundedNumber = document.getElementById("foundedNumber");
  foundedNumber.innerText = cards.length;

  const speenerContainer = document.getElementById("speener-container");
  speenerContainer.classList.remove("hidden");
  // console.log(speenerContainer);

  // sort

  const sortFind = cards.sort((x, y) => {
    if (x.total_view < y.total_view) {
      return 1;
    } else {
      return -1;
    }
  });
  // console.log(sortFind);

  cards.forEach((card) => {
    const { image_url, thumbnail_url, title, details, author, total_view } =
      card;
    const { name, published_date, img } = author;

    const cardSectionDiv = document.createElement("div");

    const speenerContainer = document.getElementById("speener-container");
    speenerContainer.classList.add("hidden");

    cardSectionDiv.classList.add("card", "shadow-xl", "mb-5", "lg:w-full");

    cardSectionDiv.innerHTML = `
        <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row hover:bg-gray-100">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${thumbnail_url}" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${title}</h5>
                <p class="mb-3 font-normal text-gray-700">${
                  details.length > 400
                    ? details.slice(0, 400) + " ....."
                    : details
                }</p>
            </div>
        </div>         
        `;
    cardSection.appendChild(cardSectionDiv);
  });
};

cards("1");
categories();
