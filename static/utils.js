const log = console.log.bind(console)

const e = (selector) => document.querySelector(selector)

const bindEvent = (element, eventName, callBack) => {
    element.addEventListener(eventName, callBack)
}

const handleClass = (element, className) => {
    const l = element.classList
    if (l.value.includes(className)) {
        // 删除
        l.remove(className)
    } else {
        l.add(className)
    }
}
