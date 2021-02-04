class Saolei {
    constructor() {
        let s = ' [[9,1,0,0,0,1,1,1,0],[1,1,0,0,1,2,9,1,0],[1,1,1,0,1,9,2,1,0],[1,9,2,1,1,1,1,0,0],[1,2,9,1,0,0,1,1,1],[1,2,1,1,0,1,2,9,1],[9,1,0,0,1,2,9,2,1],[1,2,1,1,1,9,2,1,0],[0,1,9,1,1,1,1,0,0]]'
        let square = JSON.parse(s)
        this.square = square
    }

    templateCell(line, x) {
        let template = `<div class="row clearfix">`
        for (let i = 0; i < line.length; i++) {
            const e = line[i]
            const t = `
                <div class="cell" data-number="${e}" data-x="${x + 1}" data-y="${i + 1}">${e}</div>
            `
            template += t
        }
        template += `</div>`
        return template
    }

    templateRow() {
        const s = this.square
        let t = ``
        for (let i = 0; i < s.length; i++) {
            const l = s[i]
            const line = this.templateCell(l, i)
            t += line
        }
        return t
    }

    renderSquare() {
        const square = this.square
        const html = this.templateRow(square)
        const container = e('#id-div-mime')
        container.insertAdjacentHTML('beforeend', html)
    }

    bindEventDelegate() {
        const c = e('#id-div-mime')
        bindEvent(c, 'click', (e) => {
            const cell = e.target
            if (cell.dataset) {
                this.vjkl(cell)
            }
        })
    }

    vjkl(cell) {
        const c = cell
        // 数值
        const n = c.dataset.number
        // 列
        const x = c.dataset.x
        // 行
        const y = c.dataset.y

        const isOpened = c.classList.value.includes('opened')

        if (!isOpened) {
            if (n === '9') {
                log('gameOver')
                const h1 = e('h1')
                h1.innerHTML = '游戏结束'
                handleClass(c, 'opened')
                handleClass(h1, 'red')
            } else if (n === '0') {
                this.vjklAround(x, y)
            } else {
                handleClass(c, 'opened')
            }
        }
    }

    vjklAround(x, y) {
        x = Number(x)
        y = Number(y)
        let a = [x - 1, y - 1]
        let b = [x - 1, y - 0]
        let c = [x - 1, y + 1]
        let d = [x - 0, y - 1]
        let e = [x - 0, y + 1]
        let f = [x + 1, y - 1]
        let g = [x + 1, y - 0]
        let h = [x + 1, y + 1]
        const arounds = [a, b, c, d, e, f, g, h]
        for (let i = 0; i < arounds.length; i++) {
            const e = arounds[i]
            this.vjkl1(e[0], e[1])
        }
    }

    vjkl1(x, y) {
        const c = e(`[data-x="${x}"][data-y="${y}"]`)
        if (c) {
            const isOpened = c.classList.value.includes('opened')

            if (!isOpened) {
                const n = c.dataset.number
                if (n === '9') {
                } else if (n === '0') {
                    handleClass(c, 'opened')
                    this.vjklAround(this.square, x, y)
                } else {
                    handleClass(c, 'opened')
                }
            }
        }
    }

    setup() {
        this.renderSquare()
        this.bindEventDelegate()
    }
}

const __main = () => {
    const saolei = new Saolei()
    saolei.setup()
}

__main()
