import { FC } from 'react'
import { Ball } from '@/entities/Ball'

type ColorPickerProps = {
    ball: Ball
    onChangeComplete: (color: string) => void
}

const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']

const ColorPicker: FC<ColorPickerProps> = ({
    ball,
    onChangeComplete
}) => {
    return (
        <div style={{ position: 'absolute', top: ball.y, left: ball.x }}>
            {colors.map(color => (
                <button
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onChangeComplete(color)}
                >
                    {color}
                </button>
            ))}
        </div>
    )
}

export default ColorPicker
