/**
 * Pokemon class
 * @param {string} name
 * @param {number} attack
 * @param {number} defense
 * @param {number} hp
 * @param {number} luck
 * @constructor
 * @classdesc Pokemon class
 */
class Pokemon {
    constructor(name, attack, defense, hp, luck) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
        this.hp = hp;
        this.luck = luck;
    }

    /**
     * Check if the pokemon is lucky
     * @returns {boolean} true if the pokemon is lucky, false otherwise
     */
    isLucky() {
        return Math.random() < this.luck;
    }

    /**
     * Attack a pokemon
     * @param {Pokemon} pokemon
     */
    attackPokemon(pokemon) {
        const damage = this.attack - pokemon.defense;
        pokemon.hp -= damage;
    }
}

const registeredPokemons = [
    new Pokemon("Pikachu", 20, 10, 45, 0.5),
    new Pokemon("Bulbizarre", 15, 15, 50, 0.3),
    new Pokemon("Salamèche", 25, 10, 55, 0.7),
    new Pokemon("Carapuce", 20, 20, 60, 0.4),
    new Pokemon("Rattata", 10, 5, 40, 1),
    new Pokemon("Abo", 25, 10, 25, 0.9),
    new Pokemon("Piafabec", 15, 10, 30, 0.8),
];

const pokemon1 = registeredPokemons[Math.floor(Math.random() * registeredPokemons.length)];
const pokemon2 = registeredPokemons[Math.floor(Math.random() * registeredPokemons.length)];

console.log(`Un combat entre ${pokemon1.name} et ${pokemon2.name} va commencer !`);

while (pokemon1.hp > 0 && pokemon2.hp > 0) {
    console.log("--------------------------------------------------");
    console.log(`Au tour de ${pokemon1.name} !`);
    if (pokemon1.isLucky()) {
        pokemon1.attackPokemon(pokemon2);
        console.log(`${pokemon1.name} attaque ${pokemon2.name} (-${pokemon1.attack - pokemon2.defense} HP) !`);
    } else {
        console.log(`${pokemon1.name} a raté son attaque !`);
    }
    console.log(`${pokemon2.name} : ${pokemon2.hp} HP`);
    console.log("--------------------------------------------------");

    console.log("--------------------------------------------------");
    console.log(`Au tour de ${pokemon2.name} !`);
    if (pokemon2.isLucky()) {
        pokemon2.attackPokemon(pokemon1);
        console.log(`${pokemon2.name} attaque ${pokemon1.name} (-${pokemon2.attack - pokemon1.defense} HP) !`);
    } else {
        console.log(`${pokemon2.name} a raté son attaque !`);
    }
    console.log(`${pokemon1.name} : ${pokemon1.hp} HP`);
    console.log("--------------------------------------------------");
}

if (pokemon1.hp <= 0) {
    console.log(`${pokemon1.name} a perdu !`);
} else {
    console.log(`${pokemon2.name} a perdu !`);
}
