import echarts from 'echarts'

window._echartsOnSwitchTheme = () => {
  window._echartsArr = window._echartsArr || []
  for (let i = 0; i < window._echartsArr.length; i++) {
    window._echartsArr[i].dispose()
  }
  window._echartsArr = []
  Array.from(document.getElementsByClassName('echarts')).forEach(e => {
    const chart = echarts.init(e, window.isDark ? 'dark' : 'macarons', { renderer: 'svg' })
    chart.setOption(JSON.parse(window.data[e.id]))
    window._echartsArr.push(chart)
  })
}
window.switchThemeEventSet.add(window._echartsOnSwitchTheme)
window._echartsOnSwitchTheme()
window._echartsOnResize = () => {
  for (let i = 0; i < window._echartsArr.length; i++) {
    window._echartsArr[i].resize()
  }
}
window.resizeEventSet.add(window._echartsOnResize)
