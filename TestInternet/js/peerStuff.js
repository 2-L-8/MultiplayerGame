const peerId = Math.floor(Math.random() * 900000 + 100000)
document.getElementById('peerId').innerHTML = 'Dein Game Code: ' + peerId;
const peer = new Peer(peerId)
var connection

var gameStart = false;

var connector = false;

var player1 = false;
var player2 = false;

window.onbeforeunload = function(event)
{
    return connection.send({ type: 'disconnected', value: true})
};

peer.on('connection', x => {
    //hier werden die daten empfangen
    x.on('data', data => {
        if (data.type === 'start') {
            // gameStart = true;
            document.getElementById('gameOverlayPreCon').style.display = 'none';
            document.getElementById('gameOverlayAfCon').style.display = 'flex';
        }

        if (data.type === 'reset') {
            reset = true;
            if (data.value === 0) {
                resetValue = 1;
            } else {
                resetValue = 0;
            }
        }

        if (data.type === 'name') {
            players[1].text = data.value;
            player2 = true;
        }

        if (data.type === 'shoot') {
            fireballs.push(new FireBalls(players[1].x, players[1].y, 5, "lightred", data.value,  players[0], players[1]));
            players[1].cooldown = 30;
        }

        if (data.type === 'disconnected') {
            alert("Other Player Disconnected");
        }

        if (data.type === 'Location') {
            players[1].x = data.value.x;
            players[1].y = data.value.y;
        }

        if (data.type === 'moveUp') {
            player2MoveUp = data.value;
        }

        if (data.type === 'moveLeft') {
            player2MoveLeft = data.value;
        }

        if (data.type === 'moveDown') {
            player2MoveDown = data.value;
        }

        if (data.type === 'moveRight') {
            player2MoveRight = data.value;
        }
    })
    x.on('open', () => {
        //wird bei beiden ausgeführt
        console.log('open called from peer', x.peer)
        if(!connection) connection = peer.connect(x.peer)
        if (connector === true) {
            document.getElementById('textGameOverlay').innerHTML = 'Warten das Sie das Spiel starten!';
        } else {
            document.getElementById('textGameOverlay').innerHTML = 'Warten bis der Verbundende Spieler das Spiel startet!';
        }
    })
})

const connect = () => {
    //wird nur bei dem der Code eingeben wured ausgeführt
    const connectTo = document.getElementById('connect-to').value.trim();
    if (connectTo !== '') {
        if (!connection) connection = peer.connect(connectTo)
        console.log('connecting to', connectTo)
        players = [
            new Player(canvas.width - 100, canvas.height - 50, 'P2', 'blue', 1),
            new Player(100, canvas.height - 50, 'P1', 'red', 2)
        ];
        document.getElementById('inputs').style.display = 'block';
        connector = true;
    }
}

const start = () => {
    connection.send({ type: 'start', value: true })
    // gameStart = true;
    document.getElementById('gameOverlayPreCon').style.display = 'none';
    document.getElementById('gameOverlayAfCon').style.display = 'flex';
}

const setName = () => {
    const connectAs = document.getElementById('connect-as').value.trim();
    players[0].text = connectAs;
    player1 = true;
    connection.send({ type: 'name', value: connectAs });
    document.getElementById('gameOverlayAfCon').style.display = 'none';
}