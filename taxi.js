class Personnage {
    constructor(name, mentalHealth) {
        this.name = name;
        this.mentalHealth = mentalHealth;
    }

    /**
     * Remove 1 mental health point
     */
    listenShittyMusic() {
        this.mentalHealth -= 1;
    }

    /**
     * Check if the person is dead or not
     * @returns {boolean} true if the person is dead, false otherwise
     */
    isDead() {
        return this.mentalHealth <= 0;
    }
}

class Trajet {
    /**
     * A list of musics
     * key: the name of the music
     * value: true if the music is good, false otherwise
     * @type {{string: boolean}}
     * @static
     * @readonly
     */
    static musics = {
        "Anissa - Wejdene": false,
        "Legends Never Die - League of Legends": true,
        "Dance Monkey - Tones and I": true,
        "GODS - League of Legends, NewJeans": true,
        "Fixette - Ziak": true,
    };

    constructor(redLightCount) {
        this.remainingLight = redLightCount;
        this.changes = 0;
        this.shuffleRadio();
    }

    /**
     * Shuffle the radio
     */
    shuffleRadio() {
        this.currentMusic = Object.keys(Trajet.musics)[Math.floor(Math.random() * Object.keys(Trajet.musics).length)];
    }

    /**
     * Check if the music is good
     * @returns {boolean} true if the music is good, false otherwise
     */
    isMusicGood() {
        return Trajet.musics[this.currentMusic];
    }
}

const John = new Personnage("John", 10);
const trajet = new Trajet(30);

for (let i = 0; i < 30; i++) {
    console.log(
        [
            "Vroom vroom, un feu rouge !",
            "Le taxi s'arrête au feu rouge.",
            "John attend, quand soudain... un feu rouge !",
            "Le taxi freine, un feu rouge !",
            "Brr skrr skibidi dop dop yes yes vrom vroom, un feu rouge !",
        ][Math.floor(Math.random() * 5)],
    );

    trajet.remainingLight--;
    trajet.shuffleRadio();

    console.log(`La radio joue ${trajet.currentMusic}, ${trajet.isMusicGood() ? "Yoooo cool!" : "Quelle horreur !"}`);

    if (!trajet.isMusicGood()) {
        John.listenShittyMusic();
        // Change taxi
        trajet.changes++;

        if (John.isDead()) {
            break;
        }
    }

    console.log(`John a ${John.mentalHealth} de santé mentale. Il reste ${trajet.remainingLight} feux rouges.\n`);
}

if (John.isDead()) {
    console.log("... il est mort.");
    setTimeout(() => {
        console.log("\nexplosion.");
        setTimeout(() => {
            console.log("\n*boom.mp3*");
        }, 2000);
    }, 1000);
} else {
    console.log(`John est arrivé à destination après ${trajet.changes} changements de taxi !`);
}
