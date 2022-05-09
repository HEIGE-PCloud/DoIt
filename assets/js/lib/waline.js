import { init } from '@waline/client'

if (window.config?.comment?.waline) {
  init(window.config.comment.waline)
}
