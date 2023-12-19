const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d', {
    willReadFrequently: true
})

function initCanvasSize(){
    // 可乘以devicePixelRatio保证清晰度
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

initCanvasSize()