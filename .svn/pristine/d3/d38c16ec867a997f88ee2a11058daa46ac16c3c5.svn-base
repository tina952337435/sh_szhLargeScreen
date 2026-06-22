//Dialog.ts
import { createApp, h } from "vue";
import DialogVue from "@/components/untils/Dialog.vue";

//也可以直接创建一个函数，而不是在DialogVue对象上加方法
DialogVue.open = (props, content) => {
    const mountDom = document.createElement('div')
    document.body.appendChild(mountDom)
    return new Promise((resolve, reject) => {
        const dialogInstance = createApp(h(DialogVue, {
            ...props,
            cancel,
        }, content))    //content作为Dialog.vue中的slot
        dialogInstance.mount(mountDom)  //挂载

        /**
         * 关闭
         */
        function cancel() {
            //卸载实例
            dialogInstance.unmount()
            //卸载容器
            mountDom.remove()
            //执行回调
            resolve(null)
        }
    })
}

export default DialogVue