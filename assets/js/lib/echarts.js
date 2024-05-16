import params from "@params";
import * as echarts from "echarts";
if (params.bundle === true) {
  // // Import themes
  // import 'echarts/theme/macarons.js'
  // import 'echarts/theme/dark.js'
  // // Import the echarts core module, which provides the necessary interfaces for using echarts.
  // import * as echarts from 'echarts/core'
  // // Import bar charts, all suffixed with Chart
  // import { BarChart, LineChart } from 'echarts/charts'
  // // Import the tooltip, title, rectangular coordinate system, dataset and transform components
  // // all suffixed with Component
  // import {
  //   TitleComponent,
  //   TooltipComponent,
  //   GridComponent,
  //   DatasetComponent,
  //   TransformComponent
  // } from 'echarts/components'
  // // Features like Universal Transition and Label Layout
  // import { LabelLayout, UniversalTransition } from 'echarts/features'
  // // Import the Canvas renderer
  // // Note that introducing the CanvasRenderer or SVGRenderer is a required step
  // import { CanvasRenderer } from 'echarts/renderers'
  // // Register the required components
  // echarts.use([
  //   TitleComponent,
  //   TooltipComponent,
  //   GridComponent,
  //   DatasetComponent,
  //   TransformComponent,
  //   BarChart,
  //   LineChart,
  //   LabelLayout,
  //   UniversalTransition,
  //   CanvasRenderer
  // ])
}

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
window._echartsOnResize = () => {
  for (let i = 0; i < window._echartsArr.length; i++) {
    window._echartsArr[i].resize();
  }
};
window.resizeEventSet.add(window._echartsOnResize);
