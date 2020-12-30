function isSpecialShaped() {
  const x = screen.width / (screen.height / 9);
  return (x >= 17.5 && x <= 21) || (x >= 4 && x < 5);
}
function reset() {
  // var size = document.documentElement.clientWidth / 1280 * 10 / fontSize * 1000;
  const liuHai = 0;
  if (isSpecialShaped()) {
    // liuHai = window.screen.availWidth - window.screen.availHeight * 16 / 9;
  }

  const size = (document.documentElement.clientWidth - liuHai) / 1280 * 100;
  // size = size > 371 ? 371 : size;
  document.documentElement.style.fontSize = `${size}px`;
  console.log('size', size);

  const realsize = ~~(window.getComputedStyle(document.getElementsByTagName('html')[0]).fontSize.replace('px', '') * 10000) / 10000;
  if (size != realsize) {
    document.documentElement.style.fontSize = `${size * (Math.min(realsize, size) / Math.max(realsize, size))}px`;
  }
}

function iphoneX() {
  reset();
  if (isSpecialShaped()) {
    const ele = document.getElementsByTagName('body');
    // ele[0].setAttribute("class", "iphonex");
    // var u = navigator.userAgent;
    ele[0].setAttribute('class', 'iphonex overall');
    // if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //     ele[0].setAttribute("class", "iphonex overall");
    // }
    if (document.body.clientWidth < 770) {
      ele[0].setAttribute('class', 'overall scale');
    }
  }
}

export const remSet = function () {
  let timer = null;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(iphoneX, 300);
  }, !1);
  iphoneX();
};
