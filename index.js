import express from 'express';
import { createServer } from 'http';
import { join } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('Utilisaté connecté: ', socket.id);

  // quand un joueur se connecte
  socket.broadcast.emit('playerConnected', { id: socket.id });

  // déconnexion
  socket.on('disconnect', () => {
      console.log('Utilisaté déconnecté: ', socket.id);
      socket.broadcast.emit('playerDisconnected', { id: socket.id });
  });

  socket.on('cardOpened', (data) => {
      console.log('Carte ouverte : ', data.cardId);
      // Ajouter la logique de jeu
  });

  // autres events du jeu
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

server.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
