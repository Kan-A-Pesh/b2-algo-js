// Definitly not a ripoff of Valorant

globalThis.log = (message, color = "default", returnInstead = false) => {
    let colorCode = "\x1b[0m";
    switch (color) {
        case "red":
            colorCode = "\x1b[31m";
            break;
        case "green":
            colorCode = "\x1b[32m";
            break;
        case "yellow":
            colorCode = "\x1b[33m";
            break;
        case "blue":
            colorCode = "\x1b[34m";
            break;
        case "magenta":
            colorCode = "\x1b[35m";
            break;
        case "cyan":
            colorCode = "\x1b[36m";
            break;
        case "debug":
            colorCode = "\x1b[90m";
            break;
        default:
            colorCode = "\x1b[0m";
            break;
    }

    if (color === "debug") {
        //! REMOVE THIS LINE TO ENABLE DEBUG LOGS
        return;
    }

    if (returnInstead) return colorCode + message + "\x1b[0m";
    else console.log(colorCode + message + "\x1b[0m");
};

class Agent {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class Round {
    constructor(attackerTeam, defenderTeam) {
        this.attackerTeam = [...attackerTeam];
        this.defenderTeam = [...defenderTeam];

        this.isSpikePlanted = false;

        this.attackerKillProbabilty = 0.5;
        this.defenderKillProbabilty = 0.5;
    }

    getRandomTeam() {
        return Math.random() < this.attackerKillProbabilty ? this.attackerTeam : this.defenderTeam;
    }

    getRandomTeamIndex() {
        return Math.random() < this.attackerKillProbabilty ? 0 : 1;
    }

    getRandomAgentFrom(team) {
        return team[Math.floor(Math.random() * team.length)];
    }

    getRandomAgent() {
        return this.getRandomAgentFrom(this.getRandomTeam());
    }

    formatTeamFromIndex(index) {
        return index === 0 ? "ATK" : "DEF";
    }

    kill(isAttackerTeam, agent) {
        log(`68::kill - isAttackerTeam: ${isAttackerTeam} - agent: ${agent}`, "debug");
        if (isAttackerTeam) {
            this.attackerTeam.splice(this.attackerTeam.indexOf(agent), 1);
        } else {
            this.defenderTeam.splice(this.defenderTeam.indexOf(agent), 1);
        }
    }

    plantSpike() {
        log("Le spike a été posé !", "magenta");
        this.isSpikePlanted = true;
        this.attackerKillProbabilty = 0.7;
        this.defenderKillProbabilty = 0.3;
    }

    hasEnded() {
        return this.attackerTeam.length === 0 || this.defenderTeam.length === 0;
    }

    getWinningTeamIndex() {
        return this.attackerTeam.length === 0 ? 1 : 0;
    }

    isFirstDual() {
        return this.attackerTeam.length === 5 && this.defenderTeam.length === 5;
    }

    /**
     * Format current state in the following format:
     * ATK[ P J F ] DEF[ O J C ]
     * Where each letter represents an agent
     * @returns {string} - Formatted state log
     */
    getStateLog() {
        return (
            "\x1b[31mATK" +
            (this.attackerTeam.length === 0 ? "[N//A]" : `[${this.attackerTeam.map((agent) => agent.name.charAt(0)).join(" ")}]`).padEnd(
                11,
            ) +
            " \x1b[36mDEF" +
            (this.defenderTeam.length === 0 ? "[N//A]" : `[${this.defenderTeam.map((agent) => agent.name.charAt(0)).join(" ")}]`).padEnd(
                11,
            ) +
            "\x1b[0m"
        );
    }

    logRound(advantagedTeamIndex, advantageAgent, disadvantagedAgent, isFirstDual) {
        log(
            this.getStateLog() +
                log(
                    ` (${this.formatTeamFromIndex(advantagedTeamIndex)}) ${advantageAgent.name}` +
                        " a tué " +
                        `(${this.formatTeamFromIndex(advantagedTeamIndex === 0 ? 1 : 0)}) ${disadvantagedAgent.name} !` +
                        (isFirstDual ? " (First blood)" : ""),
                    advantagedTeamIndex === 0 ? "red" : "cyan",
                    true,
                ),
        );
    }

    playDual() {
        const isFirstDual = this.isFirstDual();

        // selectionne un tueur et une victime aléatoirement
        const advantagedTeamIndex = this.getRandomTeamIndex();
        const [advantageTeam, disadvantagedTeam] =
            advantagedTeamIndex === 0 ? [this.attackerTeam, this.defenderTeam] : [this.defenderTeam, this.attackerTeam];

        const advantageAgent = this.getRandomAgentFrom(advantageTeam);
        const disadvantagedAgent = this.getRandomAgentFrom(disadvantagedTeam);

        log(`Advantage team: ${advantageTeam.length}`, "debug");
        log(`Disadvantage team: ${disadvantagedTeam.length}`, "debug");
        log(`Advantage agent: ${advantageAgent.name}`, "debug");
        log(`Disadvantage agent: ${disadvantagedAgent.name}`, "debug");

        this.kill(advantagedTeamIndex === 1, disadvantagedAgent);

        this.logRound(advantagedTeamIndex, advantageAgent, disadvantagedAgent, isFirstDual);

        // execute la logique du spike (au premier tour)
        if (isFirstDual) {
            this.playSpikeLogic(advantagedTeamIndex === 0);
        }
    }

    playSpikeLogic(isAttackerAdvantaged) {
        // si le joueur mort est défenseur : 60% de chance d’amorcer le spike, ​
        if (!isAttackerAdvantaged) {
            if (Math.random() < 0.6) {
                this.plantSpike();
            } else {
                log("Le spike n'a pas été posé !", "magenta");
            }
        }
        // si le joueur mort est attaquant, 40% de chance.​
        else {
            if (Math.random() < 0.4) {
                this.plantSpike();
            } else {
                log("Le spike n'a pas été posé !", "magenta");
            }
        }
    }
}

// creation des équipes
const attackerTeam = [
    new Agent("Omen", "smoker"),
    new Agent("Phoenix", "flasher"),
    new Agent("Jett", "killer"),
    new Agent("Fade", null),
    new Agent("Chamber", null),
];

const defenderTeam = [
    new Agent("Omen", "smoker"),
    new Agent("Phoenix", "flasher"),
    new Agent("Jett", "killer"),
    new Agent("Fade", null),
    new Agent("Chamber", null),
];

let gameStats = {
    attackerWins: 0,
    defenderWins: 0,
};

let getRoundCount = () => gameStats.attackerWins + gameStats.defenderWins + 1;

while (gameStats.attackerWins < 13 && gameStats.defenderWins < 13) {
    log(`Début du round ${getRoundCount()}!`, "yellow");

    const round = new Round(attackerTeam, defenderTeam);

    // Tous les 3 rounds, la Jett attaquante a 80% de chance de tuer un ennemi dès le début du round.​
    if (getRoundCount() % 3 === 0 && Math.random() < 0.8) {
        const randomVictim = round.getRandomAgentFrom(round.defenderTeam);
        round.kill(false, randomVictim);
        log("[JETT] Get out of my way !", "magenta");
        round.logRound(
            0,
            round.attackerTeam.find((agent) => agent.name === "Jett"),
            randomVictim,
            false,
        );

        round.playSpikeLogic(true);
    }

    while (!round.hasEnded()) {
        const isFirstDual = round.isFirstDual();

        round.playDual();

        // Le Omen attaquant a 50% de chance de mettre une smoke si le spike n’est pas amorcé.
        // Les duels suivants seront à 60%/40% en avantage aux attaquants dans le cas où la smoke est posée.​
        if (isFirstDual && !round.isSpikePlanted && Math.random() < 0.5) {
            log("[OMEN] Smoke out !", "magenta");
            round.attackerKillProbabilty = 0.6;
            round.defenderKillProbabilty = 0.4;
        }

        // Si le spike n’est pas posé le Phoenix attaquant a 50% de chance de lancer une flash.
        // Si il la lance, il a 80% de chance d’aveugler les ennemis et 20% de chance d’aveugler ses alliés.
        // Si il aveugle les ennemis, les duels passent en 60%/40% en avantage aux attaquants.
        if (isFirstDual && !round.isSpikePlanted && Math.random() < 0.5) {
            log("[PHOENIX] Flash out !", "magenta");
            if (Math.random() < 0.8) {
                log("[PHOENIX] Blinded!", "magenta");
                round.attackerKillProbabilty = 0.6;
                round.defenderKillProbabilty = 0.4;
            } else {
                log("[JETT] rep phoenix", "magenta");
                round.attackerKillProbabilty = 0.3;
                round.defenderKillProbabilty = 0.7;
            }
        }
    }

    if (round.getWinningTeamIndex() === 0) {
        gameStats.attackerWins++;
    } else {
        gameStats.defenderWins++;
    }

    log(
        "\n> Fin du round !\n" +
            `> Remporté par ${round.formatTeamFromIndex(round.getWinningTeamIndex())}!\n` +
            `> Score actuel: ${gameStats.attackerWins} ATK - DEF ${gameStats.defenderWins}\n`,
        "blue",
    );
}

log(`\n[!] Fin de la partie !\n[!] Score final: ${gameStats.attackerWins} ATK - DEF ${gameStats.defenderWins}`, "green");
