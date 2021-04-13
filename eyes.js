let NUM_COLS = 5;
let NUM_ROWS = 5;

let canvas;
let context;
let width;
let height;
let mouseLoc;

function initialize(){
    // load canvas/context
    canvas = document.getElementById("id-canvas");
    context = canvas.getContext("2d");

    // make the canvas the same size as the screen
    width = window.innerWidth
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    mouseLoc = {
        x: width / 2,
        y: height / 2,
    };

    // add a listener to the mouse movement
    window.addEventListener("mousemove", e => {
        if(e.offsetX) {
            mouseLoc = {
                x: e.offsetX,
                y: e.offsetY,
            };
        }
        else if(e.layerX) {
            mouseLoc = {
                x: e.layerX,
                y: e.layerY,
            };
        }
        render();
    });

    // left mouse click makes less eyes appear
    window.addEventListener("click", e => {
        if(e.button == 0  && NUM_ROWS != 3 && NUM_COLS != 3){
            NUM_ROWS -= 2;
            NUM_COLS--;
        }
        render();

    });

    // right mouse click makes more eyes appear
    document.addEventListener('contextmenu', e => {
        if(NUM_ROWS != 20 && NUM_COLS != 20){
            NUM_ROWS += 2;
            NUM_COLS++;
        }
        render();
        e.preventDefault();

    });

    // mobile support
    document.addEventListener('touchstart', e => {
        mouseLoc = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
        render();
        e.preventDefault();

    }, {passive: false});

    document.addEventListener('touchmove', e => {
        mouseLoc = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
        render();
        e.preventDefault();
        
    }, {passive: false});


    // start rendering
    render();
}

function render(){
    context.clearRect(0, 0, width, height);
    context.fillStyle = "black";
    context.fillRect(0,0, canvas.width, canvas.height);
    let center;
    let size = width / (NUM_COLS * 4);
    let step_x = width / NUM_COLS;
    let step_y = height / NUM_ROWS;
    let sin_pi_4 = Math.sin(Math.PI / 4);

    for(let i = 0; i < NUM_ROWS; i++){
        for(let j = 0; j < NUM_COLS; j++){
            center = {
                x: j * step_x + size * 2, 
                y: i * step_y + step_y / 2,
            };
            drawEyes(center, size, size*sin_pi_4);
            drawPupils(center, size, size*sin_pi_4);
        }
    }
}

// draws an eye to the screen
function drawEyes(center, size, displacement){
    context.beginPath();
    center.y = center.y + displacement;
    context.fillStyle = "white";
    context.arc(
        center.x - displacement*1.1, 
        center.y, 
        size, 
        5 * Math.PI / 4, 
        7 * Math.PI / 4
    );
    context.arc(
        center.x - displacement*1.1, 
        center.y - 2 * displacement, 
        size, 
        Math.PI / 4, 
        3 * Math.PI / 4
    );

    context.arc(
        center.x + displacement*1.1, 
        center.y, 
        size, 
        5 * Math.PI / 4, 
        7 * Math.PI / 4
    );
    context.arc(
        center.x + displacement*1.1, 
        center.y - 2 * displacement, 
        size, 
        Math.PI / 4, 
        3 * Math.PI / 4
    );
    context.fill();
}

// draws a pair of pupils to the screen
function drawPupils(center, size, displacement){

    // do calculations for pupil location
    let difference_x = mouseLoc.x - center.x;
    let difference_y = mouseLoc.y - (center.y - displacement);
    let angle = Math.atan2(difference_x, difference_y);
    let pull_x = 1 - Math.abs(difference_x) / size / displacement;
    let pull_y = 1 - Math.abs(difference_y) / size / displacement;
    if(pull_x < 0) pull_x = 0;
    if(pull_y < 0) pull_y = 0;
    let x_displacement = (pull_x * Math.sin(angle) * displacement / 2);
    let y_displacement = (pull_y * Math.cos(angle) * displacement / 4) - displacement;

    // decide if the pupil should be red or not
    if(Math.abs(difference_x) < width / (NUM_COLS * 2) && Math.abs(difference_y) < height / (NUM_ROWS * 2)){
        context.fillStyle = "red";
        x_displacement = 0;
        y_displacement = -displacement;
    } else {
        context.fillStyle = "black";
    }

    context.beginPath();
    context.arc(
        center.x + x_displacement - displacement*1.1, 
        center.y + y_displacement, 
        size - displacement, 
        0, 
        2 * Math.PI,
    );
    context.arc(
        center.x + x_displacement + displacement*1.1, 
        center.y + y_displacement, 
        size - displacement, 
        0, 
        2 * Math.PI,
    );
    context.fill();
}