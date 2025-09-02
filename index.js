const express = require('express');
const bodyParser = require('body-parser');
const RPC = require('discord-rpc');

const app = express();
const PORT = 3000;

const clientId = 'TON_CLIENT_ID_DISCORD';
RPC.register(clientId);
const rpc = new RPC.Client({ transport: 'ipc' });

let startTimestamp = new Date();

app.use(bodyParser.json());

app.post('/', (req, res) => {
    const data = req.body;
    console.log(data); // Pour debug

    const map = data.map?.name || 'unknown';
    const phase = data.round?.phase || 'Warmup';
    const player = data.player || {};
    const team = player.team || 'Spectator';
    const scoreT = data.map?.team_t?.score ?? 0;
    const scoreCT = data.map?.team_ct?.score ?? 0;

    const details = `Map: ${map}`;
    const state = `Score CT ${scoreCT} - ${scoreT} T | ${phase}`;

    rpc.setActivity({
        details: '',
        state: '',
        startTimestamp: newDate(),
        largeImageKey: map.toLowerCase(), // Assumes image is uploaded with map name
        largeImageText: map,
        instance: false
    });

    res.sendStatus(200);
});

rpc.on('ready', () => {
    console.log('Rich Presence Discord prêt 🚀');
});

rpc.login({ clientId }).catch(console.error);

app.listen(PORT, () => {
    console.log(`Serveur GSI en écoute sur http://localhost:${PORT}`);
});
