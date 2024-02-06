const getout = {
    element: document.querySelector('#getout'),
    margin: 30,
    offset: {
        x: 0,
        y: 0,
        step: 20
    }
}

const cursor = {
    x: -1,
    y: -1
}

window.addEventListener('mousemove', ({ clientX, clientY }) => {
    cursor.x = clientX
    cursor.y = clientY
})

const getSize = (size, behind=true) =>
    size + (behind ? (- getout.margin - 1) : getout.margin + 1)

const isCollisionByX = (left, right) => {
    const cLeft = cursor.x > getSize(left)
    const cRight = cursor.x < getSize(right, false)

    return {
        left: cLeft,
        right: cRight,
        collision: cLeft && cRight
    }
}

const isCollisionByY = (top, bottom) => {
    const cTop = cursor.y > getSize(top)
    const cBottom = cursor.y < getSize(bottom, false)
    
    return {
        top: cTop,
        bottom: cBottom,
        collision: cTop && cBottom
    }
}

const getCursorDirection = (left, top, right, bottom) => {
    const directions = {
        left: false,
        top: false,
        right: false,
        bottom: false
    }

    if (cursor.x < left) directions.left = true
    else if (cursor.x > right) directions.right = true

    if (cursor.y < top) directions.top = true
    else if (cursor.y > bottom) directions.bottom = true

    return directions
}

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('mousemove', () => {
        const { left, top, right, bottom } = getout.element.getBoundingClientRect()
        const cX = isCollisionByX(left, right)
        const cY = isCollisionByY(top, bottom)

        const collision = {
            x: cX.collision,
            y: cY.collision
        }

        if (Object.values(collision).every(el => el)) {
            const directions = getCursorDirection(left, top, right, bottom)
            Object.keys(directions).filter(el => directions[el]).map(direction => {
                switch (direction) {
                    case 'left':
                        getout.offset.x += getout.offset.step
                        break
                    case 'right':
                        getout.offset.x -= getout.offset.step
                        break
                    case 'top':
                        getout.offset.y += getout.offset.step
                        break
                    case 'bottom':
                        getout.offset.y -= getout.offset.step
                        break
                }
            })
        }
        getout.element.style.transform = `translate(${ getout.offset.x }px, ${ getout.offset.y }px)`
    })

    getout.element.onclick = () => {
        document.querySelector('.overlay').setAttribute('data-show', '')
        document.querySelector('#enzo').play()
    }
})