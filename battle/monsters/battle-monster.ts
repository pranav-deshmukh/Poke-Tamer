import { BATTLE_ASSET_KEYS, DATA_ASSET_KEYS } from "@/assets/asset-keys/asset-keys";
import { HealthBar } from "../ui/healthbar";
import {
  Attack,
  BattleMonsterConfig,
  Coordinate,
  Monster,
} from "@/types/typedef";

export class BattleMonster {
  protected _scene: Phaser.Scene;
  protected _monsterDetails: Monster;
  protected _phaserGameObject: Phaser.GameObjects.Image;
  protected _healthBar: HealthBar;
  protected _currentHealth: number;
  protected _maxHealth: number;
  protected _monsterAttacks: Attack[];
  protected phaserHealthBarGameContainer:Phaser.GameObjects.Container;

  constructor(config: BattleMonsterConfig, position: Coordinate) {
    this._scene = config.scene;
    this._monsterDetails = config.monsterDetails;
    this._currentHealth = this._monsterDetails.currentHp;
    this._maxHealth = this._monsterDetails.maxHp;
    this._monsterAttacks = [];

    this._phaserGameObject = this._scene.add.image(
      position.x,
      position.y,
      this._monsterDetails.assetKey,
      this._monsterDetails.assetFrame || 0
    );
    this.createHealthBarComponents(config.scaleHealthBarBackgroundImageByY);

    const data:Attack[] = this._scene.cache.json.get(DATA_ASSET_KEYS.ATTACKS)

    this._monsterDetails.attackIds.forEach((attackId)=>{
      const monsterAttack = data.find((attack)=>attack.id === attackId);
      if(monsterAttack!=undefined){
        this._monsterAttacks.push(monsterAttack);
      }
    })
  }

  get isFainted(): boolean {
    return this._currentHealth <= 0;
  }
  get name(): string {
    return this._monsterDetails.name;
  }

  get attacks(): Attack[] {
    return [...this._monsterAttacks];
  }

  get baseAttack(): number {
    return this._monsterDetails.baseAttack;
  }

  get level():number{
    return this._monsterDetails.currentLevel;
  }

  takeDamage(damage: number, callback?: () => void) {
    //update current monster health and animate healthbar
    this._currentHealth -= damage;
    if (this._currentHealth < 0) {
      this._currentHealth = 0;
    }
    this._healthBar.setMeterPercentageAnimated(
      this._currentHealth / this._maxHealth,
      { callback }
    );
  }

  createHealthBarComponents(scaleHealthBarBackgroundImageByY:number = 1) {
    this._healthBar = new HealthBar(this._scene, 34, 34);

    const monsterNameGameText = this._scene.add.text(
      30,
      20,
      this.name,
      {
        color: "#7E3D3F",
        fontSize: "32px",
      }
    );

    const healthBarBackgroundImage = this._scene.add
    .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
    .setOrigin(0)
    .setScale(1, scaleHealthBarBackgroundImageByY);

    const monsterHealthBarLevelText = this._scene.add.text(monsterNameGameText.width + 35, 23, `L${this.level}`, {
      color: "#ED474B",
      fontSize: "28px",
    });
    const monsterHpText = this._scene.add.text(30, 55, "HP", {
      color: "#FF6505",
      fontSize: "24px",
      fontStyle: "italic",
    });

    this.phaserHealthBarGameContainer = this._scene.add.container(0, 0, [
      healthBarBackgroundImage,
      monsterNameGameText,
      this._healthBar.Container,
      monsterHealthBarLevelText,
      monsterHpText
    ]);
  }
}
