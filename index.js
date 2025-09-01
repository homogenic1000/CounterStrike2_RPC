const RPC = require('discord-rpc');

const clientId = '1412042561391951912'; // Mets ton vrai client ID ici
RPC.register(clientId);

const rpc = new RPC.Client({ transport: 'ipc' });

async function setActivity() {
    if (!rpc) return;

    const kd = 1.57; // Valeur fictive du MDA, on va plus tard la rendre dynamique

    rpc.setActivity({
        details: `Rang : Gold Nova 3'`,
        state: 'In Competitive - 12 / 8',
        largeImageKey: 'dust_2', // Doit correspondre au nom de l’image dans ton app Discord
        largeImageText: 'Playing on Dust II',
        smallImageKey: 't',
        smallImageText:'In Terrorist Team',
        startTimestamp: new Date(),
        instance: false,
    });
}

rpc.on('ready', () => {
    setActivity();

    // Optionnel : mettre à jour toutes les 15 secondes
    setInterval(() => {
        setActivity();
    }, 15 * 1000);
});

rpc.login({ clientId }).catch(console.error);
