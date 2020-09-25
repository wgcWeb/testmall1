import {Button, Form, FormItem, Input, Message} from 'element-ui'

const element = {
  install: function (Vue) {
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.prototype.$message = Message
  }
}
export default element