const balls = document.getElementById('balls')
const context = balls.getContext('2d')
const colors = ['#99cccc', '#FFCC99', '#FFCCCC', '#0099CC', '#FF9999', '#FFFF66', '#FF6666', '#FFFF00', '#99CCFF']

balls.width = innerWidth
balls.height = innerHeight

const Random = (min, max) => Math.random() * (max - min) + min

// https://blog.csdn.net/sunshine_0880/article/details/81199033
class Bubble {
  init() {
    this.x = Random(0, innerWidth)
    this.y = Random(0, innerHeight)
    this.r = Random(5, 30)
    this.vX = Random(-1, 1)
    this.vY = Random(-1, 1)
    this.colors = colors[Math.floor(Random(0, 6))]
  }

  draw() {
    context.beginPath()
    context.fillStyle = this.colors
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    context.fill()
  }

  move() {
    this.x += this.vX
    this.y += this.vY
    if (this.x - this.r < 0 || this.x + this.r > innerWidth) this.vX = -this.vX
    if (this.y - this.r < 0 || this.y + this.r > innerHeight) this.vY = -this.vY
    this.draw()
  }
}

const ary = []

function createBubble(count) {
  for (let i = 0; i < count; i++) {
    const bubble = new Bubble()
    ary.push(bubble)
    bubble.init()
    bubble.draw()
  }
}

createBubble(5000)

// https://refined-x.com/2019/04/27/canvas-click/
// 每个小球是一个对象，判断单击的坐标位置与是否在小球内
balls.addEventListener('click', (event) => {
  console.log(event)
})

setInterval(() => {
  context.clearRect(0, 0, innerWidth, innerHeight)

  for (const item of ary) {
    item.move()
  }
}, 10)
