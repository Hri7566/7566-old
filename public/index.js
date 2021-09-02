let secure = window.location.protocol == 'https';
let wss = secure ? 'wss' : 'ws';
let hostname = window.location.hostname;
let port = secure ? 3000 : 3001;

let uri = `${wss}://${hostname}:${port}`;

let ws = new WebSocket(uri);

ws.addEventListener('open', evt => {
    console.log("Sending test message");
    ws.send(JSON.stringify({
        m: "test"
    }));

    ws.addEventListener('message', evt => {
        console.log('Received message!');
        console.log(evt.data);
    });
});
