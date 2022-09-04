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
    Option.classList.add("font-bold");
    Option.classList.add("border");
    Option.classList.add("m-2");
    Option.classList.add("px-4");
    Option.classList.add("py-2");
    Option.classList.add("rounded-xl");
    Option.innerHTML = `
          <a onclick="loadCard(${category_id})">${category_name}</a>
          `;
    newsCategory.appendChild(Option);
  });
};

categories();
