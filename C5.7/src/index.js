let btnNode = document.querySelector("#getpics");
let pageNumNode = document.querySelector("#page_num");
let limitNode = document.querySelector("#limit");
let outNode = document.querySelector("#output");
let btnClearNode = document.querySelector("#clear");

const useRequest = (p, l) => {
  return fetch(`https://picsum.photos/v2/list?page=${p}&limit=${l}`)
    .then((response) => {
      const result = response.json();
      return result;
    })
    .then((json) => {
      return json;
    })
    .catch(() => {
      console.log("error");
    });
};
function displayResult(apiData) {
  let cards = "";
  // console.log('start cards', cards);

  apiData.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  return cards;
}

let cache = localStorage.getItem("cached");
if (cache) {
  outNode.innerHTML = cache;
} else {
  outNode.innerHTML = "Вы у нас впервые! Грузите же картинки!";
}

btnNode.addEventListener("click", async () => {
  let page_in_bounds = pageNumNode.value
    ? pageNumNode.value < 11 && pageNumNode.value >= 1
    : false;
  let limit_in_bounds = limitNode.value
    ? limitNode.value < 11 && limitNode.value >= 1
    : false;
  if (page_in_bounds && limit_in_bounds) {
    outNode.innerHTML = "Гружу";
    let apiData = await useRequest(pageNumNode.value, limitNode.value);
    let outputData = await displayResult(apiData);
    localStorage.setItem("cached", outputData);
    outNode.innerHTML = outputData;
  } else {
    outNode.innerHTML = "Одно из значений вне границ 1-10";
  }
});

btnClearNode.addEventListener("click", () => {
  localStorage.clear();
  outNode.innerHTML = "";
  console.log("Данные из localStorage удалены");
});
