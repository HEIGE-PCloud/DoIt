import * as echarts from "echarts";
window._echartsOnSwitchTheme = () => {
  window._echartsArr = window._echartsArr || [];
  for (let i = 0; i < window._echartsArr.length; i++) {
    window._echartsArr[i].dispose();
  }
  window._echartsArr = [];
  Array.from(document.getElementsByClassName("echarts")).forEach((e) => {
    const chart = echarts.init(e, window.isDark ? "dark" : "macarons");
    chart.setOption(JSON.parse(window.config.data[e.id]));
    window._echartsArr.push(chart);
  });
};
window.switchThemeEventSet.add(window._echartsOnSwitchTheme);
window._echartsOnSwitchTheme();
window.addEventListener("resize", () => {
  for (let i = 0; i < window._echartsArr.length; i++) {
    window._echartsArr[i].resize();
  }
});
