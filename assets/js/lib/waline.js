/* eslint-disable no-new */
import Waline from '@waline/client'

if (window.config?.comment?.waline) {
  new Waline(window.config.comment.waline)
}
