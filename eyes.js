let NUM_COLS = 5;
let NUM_ROWS = 5;

let lastTimeStamp = performance.now();
let blinkWait = 0;
let blinkTime = 0;
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
    });

    // left mouse click zooms in
    window.addEventListener("click", e => {
        if(e.button == 0  && NUM_ROWS != 1 && NUM_COLS != 1){
            NUM_ROWS -= 2;
            NUM_COLS--;
        } else if(NUM_ROWS == 1) {
            NUM_COLS = 1;
        }
    });

    // right mouse click zooms out
    document.addEventListener('contextmenu', e => {
        if(NUM_ROWS != 20 && NUM_COLS != 20){
            NUM_ROWS += 2;
            NUM_COLS++;
        }
        e.preventDefault();

    });

    // mobile support
    document.addEventListener('touchstart', e => {
        mouseLoc = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
        e.preventDefault();

    }, {passive: false});

    document.addEventListener('touchmove', e => {
        mouseLoc = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
        e.preventDefault();
        
    }, {passive: false});

    // start rendering
    requestAnimationFrame(render);
}

function render(time){
    let elapsedTime = time - lastTimeStamp;
    lastTimeStamp = time;
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
            if(NUM_ROWS == 1 && NUM_COLS == 1) {
                blink(center, size, size*sin_pi_4, elapsedTime);
            } else {
                blinkWait = 0;
            }
        }
    }
    requestAnimationFrame(render);
}

function blink(center, size, displacement, elapsedTime) {
    blinkWait += elapsedTime;
    if(blinkWait > 5000) {
        blinkTime += elapsedTime / 250;
        context.fillStyle = "black";
        context.beginPath();
        context.arc(
            center.x - displacement*1.1, 
            center.y, 
            size*1.01, 
            (3 * Math.PI / 2) - blinkTime, 
            (3 * Math.PI / 2) + blinkTime
        );
        context.fill();
        context.beginPath();
        context.arc(
            center.x - displacement*1.1, 
            center.y - 2 * displacement, 
            size*1.01, 
            (Math.PI / 2) - blinkTime, 
            (Math.PI / 2) + blinkTime
        );
        context.fill();

        context.beginPath();
        context.arc(
            center.x + displacement*1.1, 
            center.y, 
            size*1.01, 
            (3 * Math.PI / 2) - blinkTime, 
            (3 * Math.PI / 2) + blinkTime
        );
        context.fill();
        context.beginPath();
        context.arc(
            center.x + displacement*1.1, 
            center.y - 2 * displacement, 
            size*1.01, 
            (Math.PI / 2) - blinkTime, 
            (Math.PI / 2) + blinkTime
        );
        context.fill();

        if(blinkWait > 8000) {
            localStorage.setItem("hexagon", "3c2kq2te3bv5eliqhfj7q4w5qavrjatllm4emaf57ngvp6hamjo4ol0u34agx585a037s6pazjukveu3qqj39qd73drghu666y9vmdhrjy40jtqk5797kerjv149g02ba9rdt5gsb95keaeixhixw4itl52bzsleviv1vrq62yuom1yoeilms3g8m7fjsz2qhb2inde654jh5rnci9ke8kjp86vx5iylresayfw6pwyq5zch5hlyv2nqjsqw5lbffybht09oice973xae8bjc0vx7oloumug7tz0iq333tr5a11tr1rx2gc0sm0e9h9yf9b6bkwry0ck0uhkpatagd9oteino7uogk6fmvhlu9u0xniju5qqeg3wkb16qh1me0v7zdzh4y7qck7tpyshbzbztb2np37frnkms6p9dasn3bpbovm9wg56g8vvognvo0yr9d6q9zdw095tzxzce7ftqkeryoux911tatv7y1avybrzsp7d0df4mna2jt9eggov5co150gaupyowhmm21px6tshjxhkafmippo1zs0lfgtrzjr6mzjuqksoghi7z2rzi4xbxazk4tn6az2wr00nr8m2cs3e7tbcrwliohpb4p9xtv9ksy5ltar5376bogalmvmvnc1vi3dixfiwxxrbfurzen6ldasb0zxgqpf3fk5qvvhnihgrxl43esn9tbz172e22ogvyvu5qzkitmxr2jznu8qv4eztykjuzrvwwi3il8ss715yoh6pxzr00u4habaandurrae9ymfq90crfrcg53iu8p5mr30vqtrqxvwxfvep8jfts838czcct1t9c78mplxffhtesl4espbel4stds153sfc9wnju31aitje2xhyxakv4cr1fmt30p1zpe1rpwd46ts6kjdfjfx2x94i3e9tv62kkfoivmhl79j0spp5r86346zc3n9qi7jg6emmnhvpggfo91s6dqhwvylm7806klg4r6y7exq9ppkfrrnejf2lspv5azsbsqlhj0syw9bxqh6ryse4gqr2cq724hfrgzlrle7i3jqh19h7f0z1t652a5mdcxq4h7lh4abcxm86zz9i44g00u6z4kulqod6ys4gmhgb39wcqciil0567hem0ct65p7ito2by0w65kslphaks01o3dcrvc77ijeom2w3mwlqgmr3qbd7eo7bt5bs1tv8e043xw7d89deranuy54s95xvec729dwvc93by3oo6zttrt7ixyfy4gy44kv7qvk9qvu85f43y1sutmasoikbwbaye91viyww3a1brglapqzy8ykk3y8uk0ptcq0beiriiwu361r6g1b2ac78dbwaaqie0qyz8gtuem3f0mtcx8q8izgrn1jyffulhni7irqqpt02fbd20bkuiufzss1lun833eq9vjrdk9q80h9uxljsutok8f54gtof0lcmtdkxshd114i9x86c55p0tbi1ldbr4xkaiy2b7f1hu5ozb8zb94zrpglidww64ip2izl1mk398zxpefc5qzksp2t4wvm51nsu8xkeyn0jqmfi1k7hyj9dei7en5gcrzp7e4cxwvujssm9g0a8reow1d2gs89ms82he4m9ooa90d7opi583duqitu5uu9ijzwrmsl4wrj8qhg6cnmovpbew8yuiuh6uo8nywu87gran56t4b83adahhgbhvkm3qgsmzg0wf7q6lf80cqjumes6md1dvd9uipqomkef89x8og9ph0y4i8ok3q9y1oralaz27deryzjqfrm9yyal1mmz59anscbl2psvl7k5dvpl3l5yrnck99jq42y2b80w1ji01a9oc0wejlunfbuf34972ae933zy39e7dfvcfu733xvjj0x16cmdqcebft90o3n0ej8b5gnoxs1u2ngxpjaur6wl9n3jo8brxcqr6iksehrx7whrlu34w87ye30ys8rzryxs6o3fpfs5ij831aq1gp2bjjf6p1op0228t2vssw12jukskdqqhbzj3mkqvxrehznfnyid0gw13qn62yuxcjtj8o0v1ojry21rdvudr8lsf9smdul7qus1fqinntcrrff4a7sbpwxcftif5hjrp6m4bjor7b90vhi67ecc3wgublp9li074ork9ggmqjdrj8ghi1ofwg2rax7flc8tdra5x8vkonzvabh9y4iucyc8uhfdtg7wctspmwmhn3uq4lorkos7or2iebpmx82zxln2eaf0dn6hkfsqrbk6kn8s54yqnsfv72b4m1jdzx6q1kv2vnvn0t82yidu83exqbx3hx0k400ig50h9nomzdq7qa08qi9vcnbv1y2sozh9h3he609yayn02b3oxzopa7isbpt6lachjpko4a10e3j5kdq5cc6t2dadsdxpew67kers5bx5j9anoot1q3q1xfxxb2sz59c4ls4d8dsqhg8cjyq9t0uurpf1j9v0atgnj3ntcnumw98m0g6ze3vxsz85o6ffswnk8g1dcyizdf77l444dnr0z7zpykj05svs9jsxnrog4kn7olaustt6righlr1wn4l1jna1v5l48h3zto16qzatn1axy5xbdgdqkfx1eh25wpum236732v41y8pwrpgzl2mm4i45ahlwzci12r8afwxacfi9xt8vzvczlvewexgv5xfhlhhc1bogfabym1vhyrm80tmcwe3hrvzpoebefnzkgfkeg7j1jwoblncurklt0752rw8ragbqdmn08gf01g1lfz9nvyu95xu03lska3ie0vx13zy0g0p5cmowrrfgom19mtlb887kiovp143ztmqm0c2ivtngf50lvvf5sqg3rbawm0l3gpc05izzdltx5nfmnfag8cc5cqff5961hlyncbg0iw994y9b1a7wtu0qrdlxawo6ubp36m05i2394oyta6mb6d81zikvher3ws85wxf4noho3mkl2e1hpmhy4gq6kqcxzuingu8bkd2i5fvhg9wf8kerg055f478e2w7vmqs3ta5ci1nhs57co9o7xdly95guwcs82sivld8mjuousj0ys33hnj4lnfvfpos9dx15esfob55yujze2hra8l0d9zdgtdn2c9eubabe3zeeadeuxrxv1qhqdx2nuf0wrbxmjwragl4rt4tjkkjnepsfd2vjlbufpco4wotet96wlf6cw04ft0i293w73i190qxqkgn6nhyccquj1a2i4h8vjm7d");
            localStorage.setItem("wall", "3");
            localStorage.setItem("shelf", "4");
            localStorage.setItem("volume", "16");
            localStorage.setItem("page", "51");
            window.close();
        }
    } 
}

// draws a pair of eyes to the screen
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
    // do calculations for pupil location (I made sure it's as complicated as possible)
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