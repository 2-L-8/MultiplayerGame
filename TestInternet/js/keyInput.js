document.addEventListener('keydown', function (key) {
    if (gameStart === true) {
        if (key.key === 'w' || key.key === 'ArrowUp') {
            player1MoveUp = true;
            connection.send({type: 'moveUp', value: true})
        }
        if (key.key === 'a' || key.key === 'ArrowLeft') {
            player1MoveLeft = true;
            connection.send({type: 'moveLeft', value: true})
        }

        if (key.key === 's' || key.key === 'ArrowDown') {
            player1MoveDown = true;
            connection.send({type: 'moveDown', value: true})
        }

        if (key.key === 'd' || key.key === 'ArrowRight') {
            player1MoveRight = true;
            connection.send({type: 'moveRight', value: true})
        }

        if (key.code === 'Space') {
            if (player1MoveLeft === true && player1MoveRight === false && players[0].cooldown < 0) {
                fireballs.push(new FireBalls(players[0].x, players[0].y, 5, "lightred", 3, players[1], players[0]));
                players[0].cooldown = 30;
                connection.send({type: 'shoot', value: 3})
                player1LastDirection = 'LEFT';
            }

            if (player1MoveLeft === false && player1MoveRight === true && players[0].cooldown < 0) {
                fireballs.push(new FireBalls(players[0].x, players[0].y, 5, "lightred", -3,  players[1], players[0]));
                players[0].cooldown = 30;
                connection.send({type: 'shoot', value: -3})
                player1LastDirection = 'RIGHT';
            }

            if (player1LastDirection === 'RIGHT' && players[0].cooldown < 0) {
                fireballs.push(new FireBalls(players[0].x, players[0].y, 5, "lightred", -3,  players[1], players[0]));
                players[0].cooldown = 30;
                connection.send({type: 'shoot', value: -3})
            }

            if (player1LastDirection === 'LEFT' && players[0].cooldown < 0) {
                fireballs.push(new FireBalls(players[0].x, players[0].y, 5, "lightred", 3, players[1], players[0]));
                players[0].cooldown = 30;
                connection.send({type: 'shoot', value: 3})
            }
        }
    }
});

document.addEventListener('keyup', function (key) {
    if (gameStart === true) {
        if (key.key === 'w' || key.key === 'ArrowUp') {
            player1MoveUp = false;
            connection.send({type: 'moveUp', value: false})
        }

        if (key.key === 'a' || key.key === 'ArrowLeft') {
            player1MoveLeft = false;
            connection.send({type: 'moveLeft', value: false})
        }

        if (key.key === 's' || key.key === 'ArrowDown') {
            player1MoveDown = false;
            connection.send({type: 'moveDown', value: false})
        }

        if (key.key === 'd' || key.key === 'ArrowRight') {
            player1MoveRight = false;
            connection.send({type: 'moveRight', value: false})
        }
    }
});