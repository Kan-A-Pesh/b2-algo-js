const Jason = {
    name: "Melissa?",
    health: 100,
};

class Personnage {
    constructor(name, deathProb, damageProb, martyrdomProb) {
        this.name = name;
        this.deathProb = deathProb;
        this.damageProb = damageProb;
        this.martyrdomProb = martyrdomProb;
    }
}

const names = [
    "Melissa",
    "Thomas",
    "Quentin",
    "Marianne",
    "Léa",
    "Julien",
    "Alexandre",
    "Marie",
    "Paul",
    "Lucas",
    "Ziak",
    "Nicolas",
    "Alexis",
    "Antoine",
    "Jeanne",
    "Maxime",
    "Emma",
    "Hugo",
    "Ethan",
    "Arthur",
    "Louis",
    "Jules",
];

const personnages = [];
const deaths = [];

console.log("Présentation des personnages :");
for (let i = 0; i < 5; i++) {
    let deathProb = 0.1 + Math.random();
    let damageProb = 0.1 + Math.random();
    let martyrdomProb = 0.1 + Math.random();

    let total = deathProb + damageProb + martyrdomProb;
    deathProb = Math.round((deathProb / total) * 10) / 10;
    damageProb = Math.round((damageProb / total) * 10) / 10;
    martyrdomProb = Math.round((1 - deathProb - damageProb) * 10) / 10;

    personnages.push(new Personnage(names[Math.floor(Math.random() * names.length)], deathProb, damageProb, martyrdomProb));

    console.log(
        `- ${personnages[i].name} (mort : ${personnages[i].deathProb}, dégâts : ${personnages[i].damageProb}, martyrdom : ${personnages[i].martyrdomProb})`,
    );
}

console.log("\nDébut du combat :");

while (personnages.length > 1 && Jason.health > 0) {
    const randomPersonnage = personnages[Math.floor(Math.random() * personnages.length)];
    console.log(`Jason attaque ${randomPersonnage.name} !`);

    const random = Math.random();
    if (random < randomPersonnage.deathProb) {
        console.log(`${randomPersonnage.name} est mort !`);
        deaths.push(randomPersonnage.name);
        personnages.splice(personnages.indexOf(randomPersonnage), 1);
    } else if (random < randomPersonnage.deathProb + randomPersonnage.damageProb) {
        console.log(`Mais ${randomPersonnage.name} contre-attaque et blesse Jason !`);
        Jason.health -= 10;
    } else {
        console.log(`Martymor Perk: ${randomPersonnage.name} drop une grenade à sa mort !`);
        Jason.health -= 15;
        deaths.push(randomPersonnage.name);
        personnages.splice(personnages.indexOf(randomPersonnage), 1);
    }
}

console.log("\nFin du combat :");

if (Jason.health <= 0) {
    console.log("Jason est mort !");
    console.log(`${deaths.join(", ")} sont morts au combat !`);
} else {
    console.log(`Jason a survécu avec ${Jason.health} points de vie !`);
}
