/**
 * Implement PacMan Factory to bounce on the screen 
 */ 

// Factory to make a PacMan 
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];

const pacMen = [];

/**
 * 
 * @param {Int} scale 
 * @returns Velocity object, x,y, properties
 */
function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

/**
 * 
 * @returns a PacMan Object
 */
function makePac() {

    // returns an object with values scaled {x: 33, y: 21}
    let velocity = setToRandom(10);
    let position = setToRandom(200);

    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'PacMan1.png';
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    game.appendChild(newimg);

    // new style of creating an object
    let focus= 0;
    let direction= 0;
    let counter=0;
    let counterbite= Math.floor((velocity.x**2 + velocity.y**2)**.5);
    if (counterbite<10) counterbite = 10;
    return {
        position,
        velocity,
        newimg,
        direction,
        focus,
        counter,
        counterbite
    }
}

/**
 * updates every pacMan according to their properties
 */
function update() {

    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        if(item.velocity.x > 0){
            item.direction= 0;
        } else item.direction = 1;
        item.counter = item.counter+1;
        if( item.counter > item.counterbite ){
            item.focus = (item.focus + 1) % 2;
            item.counter = 1;
        }

        // now update position and image  
        item.newimg.src = pacArray[item.direction][item.focus]
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
    setTimeout(update, 20);
}

/**
 * @param {Object} item 
 * changes velocity for -velocity if position is outside screen
 */
function checkCollisions(item) {
    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
        item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
        item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}

/**
 * add a new PacMan to pacMen
 */
function makeOne() {
    pacMen.push(makePac());  
}