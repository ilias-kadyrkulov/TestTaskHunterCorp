import { FC, useEffect, useRef, useState } from 'react'
import { Ball } from '@/entities/Ball'
import ColorPicker from './ColorPicker'

const GameCanvas: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [balls, setBalls] = useState<Ball[]>([])

    const [selectedBall, setSelectedBall] = useState<Ball | null>(null)
    console.log(selectedBall?.x, 'ball x');
    
    const handleBallClick = (ball: Ball) => {
        setSelectedBall(ball)
    }

    useEffect(() => {
        setBalls([ //NOTE - Инициализируем шары
            new Ball(20, 20, 20, 'red'),
            new Ball(20, 80, 40, 'green'),
            new Ball(20, 140, 60, 'blue'),
        ])
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                balls.forEach(ball => {
                    ball.update(canvas.width, canvas.height)
                    ball.draw(ctx)
                })

                requestAnimationFrame(render)
            }

            render()
        }
    }, [balls])

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (canvas) {
                const canvasBounds = canvas.getBoundingClientRect()
                const mouseX = event.clientX - canvasBounds.left
                const mouseY = event.clientY - canvasBounds.top
                console.log(canvasBounds, 'bounds')
                console.log(event.clientX, 'clientX')
                console.log(event.clientY, 'clientY')

                console.log(mouseX, 'mouseX')
                console.log(mouseY, 'mouseY')

                const clickedBall = balls.find(ball => {
                    const distance = Math.sqrt( //NOTE - Теорема Пифагора дляр асчета расстояния до точки клика
                        Math.pow(ball.x - mouseX, 2) +
                            Math.pow(ball.y - mouseY, 2)
                    )
                    console.log(distance, 'distance')

                    return distance < ball.radius
                })

                if (clickedBall) {
                    const speedFactor = 0.10
                    const vx = (clickedBall.x - mouseX) * speedFactor
                    const vy = (clickedBall.y - mouseY) * speedFactor
                    clickedBall.vx = vx
                    clickedBall.vy = vy
                    handleBallClick(clickedBall)
                }
            }
        }

        const canvas = canvasRef.current
        canvas?.addEventListener('mousedown', handleMouseDown)

        return () => canvas?.removeEventListener('mousedown', handleMouseDown)
    }, [balls])


    return (
        <>
            <canvas
                ref={canvasRef}
                width={1200}
                height={600}
                style={{margin: '20px', border: '1px solid black'}}
            />
            {selectedBall && (
                <ColorPicker
                    ball={selectedBall}
                    onChangeComplete={color => {
                        selectedBall.setColor(color)
                        setSelectedBall(null)
                    }}
                />
            )}
        </>
    )
}

export default GameCanvas
