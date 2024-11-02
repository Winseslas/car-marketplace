/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events';
import fs from 'fs';

// Chemin du fichier JSON
const filePath = './cars.json';

// Création d'un EventEmitter
class DataEmitter extends EventEmitter {}
const dataEmitter = new DataEmitter();

// Variable pour stocker les données lues du fichier JSON
let cars: any[] = [];

// Fonction pour lire le fichier JSON et émettre un événement
function readJsonFile(filePath: string) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier:', err);
            return;
        }

        // Parse et stocke les données dans la variable
        try {
            cars = JSON.parse(data);
            dataEmitter.emit('dataReady', cars);
        } catch (parseErr) {
            console.error('Erreur lors de la conversion JSON:', parseErr);
        }
    });
}

// Gestionnaire d'événement pour traiter les données JSON
dataEmitter.on('dataReady', (carsData) => {
    console.log('Les données des voitures sont prêtes:', carsData);
});

// Appel de la fonction pour lire le fichier JSON
readJsonFile(filePath);

// Exporter la variable `cars` pour être utilisée dans d'autres fichiers
export default { cars };
