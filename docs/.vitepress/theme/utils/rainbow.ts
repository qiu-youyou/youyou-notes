// rainbow 效果 首页速度 为 14 否则默认速度 120s
let rainbowStyle: HTMLStyleElement | undefined;
export const updateRainbowStyle = () => {
  if (location.pathname === "/") {
    if (rainbowStyle) return;
    rainbowStyle = document.createElement("style");
    rainbowStyle.innerHTML = `
    :root {
      animation: rainbow 14s linear infinite;
    }`;
    document.body.appendChild(rainbowStyle);
  } else {
    if (!rainbowStyle) return;
    rainbowStyle.remove();
    rainbowStyle = undefined;
  }
};
