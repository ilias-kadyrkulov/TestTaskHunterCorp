//NOTE - В этом примере кода используются упрощенные физические принципы и числа для столкновений шаров.
export class Ball {
    x: number
    y: number
    radius: number
    color: string
    vx: number
    vy: number
    mass: number
    static readonly DAMPING: number = 0.9

    constructor(
        x: number,
        y: number,
        radius: number,
        color: string,
        vx: number = 0,
        vy: number = 0
    ) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.vx = vx
        this.vy = vy
        this.mass = radius * radius * Math.PI //NOTE - Для простоты, масса — это площадь круга
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
    }

    update(canvasWidth: number, canvasHeight: number) {
        //NOTE - Обновляем позицию шара
        this.x += this.vx
        this.y += this.vy

        //NOTE - Проверка столкновений со стенами
        if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
            this.vx = -this.vx * Ball.DAMPING
            this.x = Math.max(
                this.radius,
                Math.min(this.x, canvasWidth - this.radius)
            )
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
            this.vy = -this.vy * Ball.DAMPING
            this.y = Math.max(
                this.radius,
                Math.min(this.y, canvasHeight - this.radius)
            )
        }

        //NOTE Применяем дополнительное затухание для имитации трения с полом
        const friction = 0.99
        this.vx *= friction
        this.vy *= friction

        //NOTE - Остановка шара, если скорость достаточно мала
        const speedThreshold = 0.01
        if (
            Math.abs(this.vx) < speedThreshold &&
            Math.abs(this.vy) < speedThreshold
        ) {
            this.vx = 0
            this.vy = 0
        }
    }

    collidesWith(ball: Ball): boolean {
        const dx = this.x - ball.x
        const dy = this.y - ball.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        return distance < this.radius + ball.radius
    }

    setColor(newColor: string) {
        this.color = newColor
    }
}
