import chalk from 'chalk';
import readlineSync from 'readline-sync';

class Player {
    constructor() {
        this.minDice = 1;
        this.maxDice = 6;
        this.hp = 50;
        this.playerDmg =
            Math.floor(Math.random() * (this.maxDice - this.minDice + 1)) + 1;
        const dmg = this.playerDmg;
        return dmg;
    }

    attack(monster) {
        // 플레이어의 공격
        const dmg = this.playerDmg;
        monster.hp -= dmg;
        return dmg;
    }
}

class Monster {
    constructor(stage) {
        this.hp = 20 + stage * 5;
        this.power = 3 + stage * 2;
    }

    attack(player) {
        // 몬스터의 공격
        const dmg = this.power;
        player.hp -= dmg;
        return dmg;
    }
}

function displayStatus(stage, player, monster) {
    console.log(chalk.magentaBright(`\n=== Current Status ===`));
    console.log(
        chalk.cyanBright(`\n | Stage: ${stage} `) +
            chalk.blueBright(
                ` \n | 플레이어의 체력 : ${player.hp}  |  플레이어의 공격력 : ${player.minDice} ~ ${player.maxDice} |`
            ) +
            chalk.redBright(
                ` \n | 몬스터의 체력 : ${monster.hp}  |  몬스터의 공격력 : ${monster.power} |`
            )
    );
    console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
    let logs = [];

    while (player.hp > 0) {
        console.clear();
        displayStatus(stage, player, monster);

        logs.forEach((log) => console.log(log));

        console.log(chalk.green(`\n1. 공격한다 2. 도망친다.`));
        const choice = readlineSync.question('당신의 선택은? ');

        switch (choice) {
            case '1':
                player.attack(monster);
                logs.push(`플레이어의 공격!`),
                    logs.push(chalk.green(`${player.playerDmg}의 데미지!`));
                monster.attack();
                logs.push(`몬스터의 공격!`),
                    logs.push(chalk.red(`${monster.power}의 데미지!`));
                break;
            case '2':
                logs.push(`플레이어는 도망쳤다...`);
                break;

            default:
                logs.push('그런선택지는 없서용');
                break;
        }
    }
};

export async function startGame() {
    console.clear();
    const player = new Player();
    let stage = 1;

    while (stage <= 10) {
        const monster = new Monster(stage);
        await battle(stage, player, monster);

        // 스테이지 클리어 및 게임 종료 조건

        stage++;
    }
}
