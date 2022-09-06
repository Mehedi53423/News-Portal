const modalId = document.getElementById("modal");
const spinner = document.getElementById("spinner");

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
      "rounded-xl",
      "cursor-pointer"
    );
    Option.innerHTML = `
          <a onclick="cards(${category_id})">${category_name}</a>
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

  spinner.classList.remove("hidden");

  //Sort By View
  const sortFind = cards.sort((x, y) => {
    if (x.total_view < y.total_view) {
      return 1;
    } else {
      return -1;
    }
  });

  cards.forEach((card) => {
    const { image_url, thumbnail_url, title, details, author, total_view } =
      card;
    const { name, published_date, img } = author;

    const cardSectionDiv = document.createElement("div");

    spinner.classList.add("hidden");

    cardSectionDiv.classList.add(
      "card",
      "shadow-xl",
      "mb-5",
      "lg:w-full",
      "rounded-xl"
    );

    cardSectionDiv.innerHTML = `
        <div class="flex flex-col items-center bg-white rounded-xl shadow-lg md:flex-row hover:bg-gray-100 w-full">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg p-3" src="${thumbnail_url}" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal w-full text-justify">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-justify">${title}</h5>
                <p class="mb-3 font-normal text-gray-700">${
                  details.length > 400
                    ? details.slice(0, 400) + " ..."
                    : details
                }</p>
                <div class="md:flex card-actions items-center justify-between w-full text-center md:text-left">
                  <div class="md:flex">
                      <div class="mr-3 flex justify-center md:block">
                          <img class="w-[40px] rounded-full" src="${
                            img ? img : "Image Is Not Available"
                          }" alt="">
                      </div>
                      <div >
                        <h4 class="font-bold text-xl">${
                          name ? name : "Name Is Not Available"
                        }</h4>
                        <h5>${
                          published_date
                            ? published_date
                            : "Published Date Is Not Available"
                        }</h5>
                      </div>
                  </div>
                  <div class="md:flex ml-3 items-center">
                      <i class="fa-solid fa-eye pr-2"></i>
                      <h1>
                          <span>
                              ${total_view ? total_view + " M" : "No Views"}
                          </span>
                      </h1>
                  </div>
                  <div>
                      <i class="fa-regular fa-star hover:text-yellow-500"></i>
                      <i class="fa-regular fa-star hover:text-yellow-500"></i>
                      <i class="fa-regular fa-star hover:text-yellow-500"></i>
                      <i class="fa-regular fa-star hover:text-yellow-500"></i>
                      <i class="fa-regular fa-star hover:text-yellow-500"></i>
					          </div>
                  <div class="md:flex" >
                    <div class="card-actions justify-end">
                        <button type="button" data-modal-toggle="defaultModal" class="hover:bg-indigo-500 hover:text-white py-2 px-3 rounded-xl" onclick="modal('${
                          card._id
                        }')"><i class="fa-solid fa-arrow-right md:text-xl text-2xl"></i></button>
                    </div>                                                
				          </div>
                </div>
            </div>
        </div>
        `;
    cardSection.appendChild(cardSectionDiv);
  });
};

const modal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  let data = {};
  try {
    const res = await fetch(url);
    data = await res.json();
  } catch (error) {
    console.log(error);
  }
  const { name, published_date, img } = data.data[0].author;
  const modalDetails = document.getElementById("modalDetails");
  modalDetails.innerHTML = `
    <p class="mb-3 text-lg font-bold">Author Name : ${
      name ? name : "Name Is Not Available"
    }</p>
    <p class="mb-3 text-lg font-bold">Published Date : ${
      published_date ? published_date : "Published Date Is Not Available"
    }</p>
    <img class="rounded-lg" src="${img ? img : "Image Is Not Available"}"/>
  `;
  modalId.classList.remove("hidden");
};

const closeModal = () => {
  modalId.classList.add("hidden");
};

cards("1");
categories();
