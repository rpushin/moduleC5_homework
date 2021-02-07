let btnNode = document.querySelector("#getpics");
let inpWidthNode = document.querySelector("#width");
let inpHeightNode = document.querySelector("#height");
let outNode = document.querySelector("#output");
console.log(inpHeightNode.value);

const useRequest = (w, h) => {
  return fetch(`https://picsum.photos/${w}/${h}`)
    .then((response) => {
      console.log("response", response);
      return response.url;
    })
    .then((item) => {
      console.log(item);
      let cards = "";
      const cardBlock = `
          <div class="card">
            <img
              src="${item}"
              class="card-image"
            />
          </div>
        `;
      cards = cards + cardBlock;
      return cards;
    })
    .catch(() => {
      console.log("error");
    });
};

btnNode.addEventListener("click", async () => {
  let w_in_bounds = inpWidthNode.value
    ? inpWidthNode.value < 301 && inpWidthNode.value >= 100
    : false;
  let h_in_bounds = inpHeightNode.value
    ? inpHeightNode.value < 301 && inpHeightNode.value >= 100
    : false;
  if (w_in_bounds && h_in_bounds) {
    outNode.innerHTML = "Гружу";
    let cards = await useRequest(inpWidthNode.value, inpHeightNode.value);
    console.log(cards);
    outNode.innerHTML = cards;
  } else {
    outNode.innerHTML = "Одно из значений вне границ 100-300";
  }
});
