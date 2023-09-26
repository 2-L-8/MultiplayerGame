const element = document.querySelector('.gameContainer')
const canvas = element.querySelector('canvas');
const ctx = canvas.getContext('2d');

let fireballs = [];
const mesh = [];
var reset = false;
var resetValue = undefined;

mesh.push(new WorlMesh(-50, canvas.height - 40, canvas.width + 100, 50, 'brown'));
mesh.push(new WorlMesh(-50, canvas.height - 40, canvas.width + 100, 6, 'lightgreen'));

mesh.push(new WorlMesh(100, canvas.height - 100, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(100, canvas.height - 100, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(220, canvas.height - 150, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(220, canvas.height - 150, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(400, canvas.height - 100, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(400, canvas.height - 100, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(600, canvas.height - 180, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(600, canvas.height - 180, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(100, canvas.height - 230, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(100, canvas.height - 230, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(370, canvas.height - 180, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(370, canvas.height - 180, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(300, canvas.height - 230, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(300, canvas.height - 230, canvas.width/8, 2, 'lightgreen'));

mesh.push(new WorlMesh(500, canvas.height - 240, canvas.width/8, 10, 'brown'));
mesh.push(new WorlMesh(500, canvas.height - 240, canvas.width/8, 2, 'lightgreen'));

players = [
    new Player(100, canvas.height - 50, "P1", 'red', 1),
    new Player(canvas.width - 100, canvas.height - 50, "P2", 'blue', 2)
];

const image = new Image(60, 45); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image.src = "Boden-removebg-preview.png";

const image2 = new Image(20, 80); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image2.src = "Player.png";

const image3 = new Image(20, 80); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image3.src = "Player2.png";

const image4 = new Image(10, 10); // Using optional size for image
// Load an image of intrinsic size 300x227 in CSS pixels
image4.src = "fireball.png";


function animate()
{
    if (player1 === true && player2 === true) {
        gameStart = true;
    } else {
        gameStart = false;
    }

    if (reset === true) {
        resetGame(resetValue);
    }

    ctx.clearRect(0, 0,  canvas.width, canvas.height);

    handleFireBalls();
    handleMesh();

    image.onload = drawTextureMesh();

    handlePlayers();

    image2.onload = drawTexturePlayer();
    image3.onload = drawTexturePlayer2();
    image4.onload = drawTextureFireblls();
    drawPlayerNamesAndHealth();

    checkWorldbordersPlayer();

    if (players[0].health < 30) {
        document.getElementById('almostDeadGradient').style.display = 'block';
    } else {
        document.getElementById('almostDeadGradient').style.display = 'none';
    }

    requestAnimationFrame(animate);
}
animate();

setInterval(setLocation, 500);

function drawTextureMesh()
{
    ctx.drawImage(image, 0, canvas.height - 60,  canvas.width/2, 60);
    ctx.drawImage(image, canvas.width/2, canvas.height - 60,  canvas.width/2, 60);

    ctx.drawImage(image, 100, canvas.height - 105,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 220, canvas.height - 155,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 400, canvas.height - 105,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 600, canvas.height - 185,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 100, canvas.height - 235,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 370, canvas.height - 185,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 300, canvas.height - 235,  canvas.width/8 + 1, 16);

    ctx.drawImage(image, 500, canvas.height - 245,  canvas.width/8 + 1, 16);
}

var timer = 0;
function drawTexturePlayer()
{
    if (timer % 10 < 2.5) {
        ctx.drawImage(image2, 0, 0, 20, 20, players[0].x - players[0].width, players[0].y - players[0].width, 20, 20);
    } else  if (timer % 10 >= 2.5 && timer % 10 < 5) {
        ctx.drawImage(image2, 20, 0, 20, 20, players[0].x - players[0].width, players[0].y - players[0].width, 20, 20);
    } else  if (timer % 10 >= 5 && timer % 10 < 7.5) {
        ctx.drawImage(image2, 40, 0, 20, 20, players[0].x - players[0].width, players[0].y - players[0].width, 20, 20);
    } else  if (timer % 10 >= 7.5) {
        ctx.drawImage(image2, 60, 0, 20, 20, players[0].x - players[0].width, players[0].y - players[0].width, 20, 20);
    }
    timer++;
}

function drawTexturePlayer2()
{
    if (timer % 10 < 2.5) {
        ctx.drawImage(image3, 0, 0, 20, 20, players[1].x - players[1].width, players[1].y - players[1].width, 20, 20);
    } else  if (timer % 10 >= 2.5 && timer % 10 < 5) {
        ctx.drawImage(image3, 20, 0, 20, 20, players[1].x - players[1].width, players[1].y - players[1].width, 20, 20);
    } else  if (timer % 10 >= 5 && timer % 10 < 7.5) {
        ctx.drawImage(image3, 40, 0, 20, 20, players[1].x - players[1].width, players[1].y - players[1].width, 20, 20);
    } else  if (timer % 10 >= 7.5) {
        ctx.drawImage(image3, 60, 0, 20, 20, players[1].x - players[1].width, players[1].y - players[1].width, 20, 20);
    }
    timer++;
}

function drawTextureFireblls()
{
    for (let i = 0; i < fireballs.length; i++) {
        ctx.drawImage(image4, 0, 0, 20, 20, fireballs[i].x - fireballs[i].width, fireballs[i].y - fireballs[i].width, 10, 10);
    }
}
