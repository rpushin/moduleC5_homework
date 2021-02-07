function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };
  xhr.send();
}
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

  // console.log('end cards', cards);

  outNode.innerHTML = cards;
}
let btnNode = document.querySelector("#getpics");
let inpNode = document.querySelector("#numpics");
let outNode = document.querySelector("#output");

btnNode.addEventListener("click", () => {
  if (inpNode.value && inpNode.value < 11 && inpNode.value >= 1) {
    useRequest(
      "https://picsum.photos/v2/list/?limit=" + inpNode.value,
      displayResult
    );
  } else {
    outNode.innerHTML = "Число вне границ 1-10";
  }
  console.log(inpNode.value);
  //useRequest('https://picsum.photos/v2/list/?limit=5',displayResult);
});
