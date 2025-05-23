import { BattleMonsterConfig, Coordinate } from "@/types/typedef";
import { BattleMonster } from "./battle-monster";

const PLAYER_POSITION:Coordinate = Object.freeze({
    x:256,
    y:316
})
export class PlayerBattleMonster extends BattleMonster {
    healthBarTextGameObject:Phaser.GameObjects.Text;
    constructor(config:BattleMonsterConfig){
        super(config, PLAYER_POSITION);
        this._phaserGameObject.setFlipX(true);
        this.phaserHealthBarGameContainer.setPosition(556, 318);
        this.addHealthBarComponents();
    }

    setHealthBarText(){
        this.healthBarTextGameObject.setText(`${this._currentHealth}/${this._maxHealth}`);
    }

    addHealthBarComponents(){
        this.healthBarTextGameObject = this._scene.add
          .text(443, 80, '', {
            color: "#7E3D3F",
            fontSize: "16px",
          })
          .setOrigin(1, 0);
          this.setHealthBarText();
          this.phaserHealthBarGameContainer.add(this.healthBarTextGameObject);
    }

    takeDamage(damage: number, callback?: () => void) {
        super.takeDamage(damage, callback);
        this.setHealthBarText();
      }
}