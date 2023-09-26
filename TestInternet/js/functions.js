var player1MoveUp = false;
var player1MoveDown = false;
var player1MoveLeft = false;
var player1MoveRight = false;
var player1LastDirection = '';

var player2MoveUp = false;
var player2MoveDown = false;
var player2MoveLeft = false;
var player2MoveRight = false;


function handleFireBalls()
{
    for (let i = 0; i < fireballs.length; i++) {
        fireballs[i].update();

        if (fireballs.length > 0) {

            for (let r = 0; r < mesh.length; r++) {
                if (fireballs[i].y + fireballs[i].width > mesh[r].y - 1&&
                    fireballs[i].y + fireballs[i].width < mesh[r].y + 1&&
                    fireballs[i].x < mesh[r].x + mesh[r].width && fireballs[i].x > mesh[r].x) {
                    fireballs.splice(i, 1);
                    i--;
                    return;
                }
            }

            let a = fireballs[i].x - fireballs[i].target.x;
            let b = fireballs[i].y - fireballs[i].target.y;
            let c = Math.sqrt((a * a) + (b * b));

            if (c < fireballs[i].target.width) {
                fireballs[i].target.health -= fireballs[i].player.damage;
                fireballs[i].target.tookDCooldown = 100;
                fireballs.splice(i, 1);
                i--;
                return;
            }

            if (fireballs[i].health < 0) {
                fireballs.splice(i, 1);
                i--;
            }

        }
    }
}

function checkWorldbordersPlayer()
{
    for(let i = 0; i < players.length; i++) {
        if(players[i].x < - 18) {
            players[i].x = canvas.width - 9;
        }

        if(players[i].x > canvas.width - 5) {
            players[i].x = - 13;
        }

        if (players[i].x > players[i].standingMesh.x + players[i].standingMesh.width ||
            players[i].x < players[i].standingMesh.x) {
            if (players[i].jump == true) {
                players[i].grounded = false;
            } else {
                players[i].y += players[i].speed;
                players[i].speed += 0.05;
            }
        }

        if (players[i].y > players[i].standingMesh.y) {
            players[i].y += players[i].speed;
            players[i].speed += 0.05;
        }
    }

    for(let i = 0; i < fireballs.length; i++) {
        if(fireballs[i].x < - 9) {
            fireballs[i].x = canvas.width - 4.5;
        }

        if(fireballs[i].x > canvas.width - 2.5) {
            fireballs[i].x = - 6.5;
        }
    }
    //
    // for(let i = 0; i < blackHole.length; i++) {
    //     if(blackHole[i].x < - 9) {
    //         blackHole[i].x = canvas.width - 4.5;
    //     }
    //
    //     if(blackHole[i].x > canvas.width - 2.5) {
    //         blackHole[i].x = - 6.5;
    //     }
    // }
}

function handlePlayers()
{

    if (player1MoveDown === true) {
        if (players[0].y < canvas.height - 100) {
            players[0].grounded = false;
        }
    }

    if (player2MoveDown === true) {
        if (players[1].y < canvas.height - 100) {
            players[1].grounded = false;
        }
    }
    for (let i = 0; i < players.length; i++) {
        players[i].update();
        players[i].draw();

        if (players[i].grounded === false) {
            players[i].y -= players[i].airtime/100;
            players[i].airtime -= 20;
        }

        if (players[i].y > canvas.height - 50) {
            players[i].y = canvas.height - 50
        }

        players[i].cooldown--;

        if (players[i].health < 0) {
            reset = true;
            resetValue = i;
            connection.send({type: 'reset', value: i});
        }
    }

    if (gameStart === true) {
        if (player1MoveUp === true && players[0].grounded === true) {
            players[0].grounded = false;
            players[0].jump = true;
            players[0].airtime = 600;
        }

        if (player2MoveUp === true && players[1].grounded === true) {
            players[1].grounded = false;
            players[1].jump = true;
            players[1].airtime = 600;
        }

        if (player1MoveLeft === true) {
            players[0].x -= 1.5;
            player1LastDirection = 'LEFT';
        }

        if (player2MoveLeft === true) {
            players[1].x -= 1.5;
        }

        if (player1MoveRight === true) {
            players[0].x += 1.5;
            player1LastDirection = 'RIGHT';
        }

        if (player2MoveRight === true) {
            players[1].x += 1.5;
        }
    }
}

function handleMesh()
{
    for (let i = 0; i < mesh.length; i++) {
        mesh[i].draw();

        for (let r = 0; r < players.length; r++) {

            if (players[r].y + players[r].width > mesh[i].y - 6 &&
                players[r].y + players[r].width < mesh[i].y + 6 &&
                players[r].x < mesh[i].x + mesh[i].width &&
                players[r].x > mesh[i].x &&
                players[r].airtime < 0) {
                players[r].grounded = true;
                players[r].jump = false;
                players[r].y = mesh[i].y - players[r].width;
                players[r].standingMesh = mesh[i];
                players[r].speed = 0;
                players[r].airtime = -601;
            }
        }
    }
}

function resetGame(p)
{
    for (let i = 0; i < players.length; i++) {
        players[i].x = players[i].resetPos.x;
        players[i].y = players[i].resetPos.y;
        players[i].cooldown = players[i].resetPos.cooldown;
        players[i].health = players[i].resetPos.health;
        players[i].standingMesh = players[i].resetPos.standingMesh;
        players[i].grounded = players[i].resetPos.grounded;
        players[i].airtime = players[i].resetPos.airtime;
        players[i].healthColor = 'lightgreen';
    }
    fireballs = [];

    player1 = false;
    player2 = false;

    reset = false;

    document.getElementById('gameOver').style.display = 'flex';
    if (p === 0) {
        document.getElementById('textGameOver').innerHTML = players[1].text + " hat gewonnen!";
    } else {
        document.getElementById('textGameOver').innerHTML = players[0].text + " hat gewonnen!";
    }

    document.getElementById('gameOverlayAfCon').style.display = 'flex';
}

function setLocation()
{
    connection.send({type: 'Location', value: players[0]})
}

function removeDeathScreen()
{
    document.getElementById('gameOver').style.display = 'none';
}

function drawPlayerNamesAndHealth()
{
    ctx.font = "10px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(players[0].text, 10, 10);

    ctx.fillStyle = 'grey';
    ctx.fillRect(10, 15, players[0].health/2, players[0].width/2);

    ctx.fillStyle = 'grey';
    ctx.fillRect(10, 15, 50, players[0].width/2);

    ctx.fillStyle = players[0].healthColor;
    ctx.fillRect(10, 15, players[0].health/2, players[0].width/2);

    ctx.font = "10px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText(players[1].text, 10, 40);

    ctx.fillStyle = 'grey';
    ctx.fillRect(10, 45, players[1].health/2, players[1].width/2);

    ctx.fillStyle = 'grey';
    ctx.fillRect(10, 45, 50, players[1].width/2);

    ctx.fillStyle = players[1].healthColor;
    ctx.fillRect(10, 45, players[1].health/2, players[1].width/2);
}