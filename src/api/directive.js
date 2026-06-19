// 判断来检查元素是否溢出，如果溢出将 title 属性设置为元素的原始内容。
// 元素原始内容存储在变量 originalContent。
export function myEllipsis(app) {
    app.directive('myEllipsis', {
        mounted(el, binding) {
            let originalContent = el.textContent;
            const resizeHandler = () => {
                if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
                    let start = 0;
                    let end = originalContent.length;
                    while (start <= end) {
                        const middle = Math.floor((start + end) / 2);
                        // el.innerHTML = originalContent.slice(0, middle) + '&hellip;';
                        if (el.scrollWidth > el.clientWidth) {
                            end = middle - 1;
                        } else {
                            start = middle + 1;
                        }
                    }
                    el.setAttribute('title', originalContent);
                } else {
                    el.innerHTML = originalContent
                    el.setAttribute('title', '');
                }
            }
            if (originalContent) {
                resizeHandler()
            }
            // el._resizer = new window.ResizeObserver(resizeHandler)
            // el._resizer.observe(el)
        },
        updated(el, binding, vnode, prevVnode) {

            if (binding.value) {
                const originalContent = binding.value;
                if (el.scrollWidth > el.clientWidth) {
                    let start = 0;
                    let end = originalContent.length;
                    while (start <= end) {
                        const middle = Math.floor((start + end) / 2);
                        // el.innerHTML = originalContent.slice(0, middle) + '&hellip;';
                        if (el.scrollWidth > el.clientWidth) {
                            end = middle - 1;
                        } else {
                            start = middle + 1;
                        }
                    }
                    el.setAttribute('title', originalContent);
                } else {
                    el.innerHTML = originalContent
                    el.setAttribute('title', '');
                }
            }
        },
        unmounted(el) {
            // if(el){
            //     el._resizer.disconnect()
            // }
        }
    })
}
