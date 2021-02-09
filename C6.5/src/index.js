let btnNode = document.querySelector("#getScreen");

btnNode.addEventListener("click", () => {
  let msg = `Screen size: ${window.screen.width} x ${window.screen.height}
Content size: ${document.documentElement.clientWidth} x ${document.documentElement.clientHeight}
Window size: ${window.innerWidth} x ${window.innerHeight}`;
  window.alert(msg);
});
