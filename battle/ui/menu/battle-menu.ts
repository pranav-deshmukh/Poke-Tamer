import { MONSTER_ASSET_KEYS } from "@/assets/asset-keys";

const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: "FIGHT",
  SWITCH: "SWITCH",
  ITEM: "ITEM",
  FLEE: "FLEE",
});

const battleUITextStyle = {
  color: "black",
  fontSize: "30px",
};

export class BattleMenu{
    scene;
    mainBattleMenuPhaserContainerGameObject:Phaser.GameObjects.Container;
    moveSelectionSubBatttleMenuPhaserContainerGameObject:Phaser.GameObjects.Container;
    battleTextGameObjectLine1:Phaser.GameObjects.Text;
    battleTextGameObjectLine2:Phaser.GameObjects.Text;
    constructor(scene:Phaser.Scene){
        this.scene = scene;
        this.createMainInfoPane();
        this.createMainBattleMenu();
        this.createMonsterAttackSubMenu();

    }

    showMainBattleMenu(){
        this.battleTextGameObjectLine1.setText('what should');
        this.mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.battleTextGameObjectLine1.setAlpha(1);
        this.battleTextGameObjectLine2.setAlpha(1);
    }
    
    hideMainBattleMenu(){
        this.mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.battleTextGameObjectLine1.setAlpha(0);
        this.battleTextGameObjectLine2.setAlpha(0);
    }

    showMonsterAttackSubMenu(){
        this.moveSelectionSubBatttleMenuPhaserContainerGameObject.setAlpha(1);
    }

    hideMonsterAttackSubMenu(){
        this.moveSelectionSubBatttleMenuPhaserContainerGameObject.setAlpha(0);
    }

    createMainBattleMenu(){
        this.battleTextGameObjectLine1 = this.scene.add.text(20,468, 'what should', battleUITextStyle);
        // TODO: add monster name such that it dynamically chnages to the mosnter name that user chose
        this.battleTextGameObjectLine2 = this.scene.add.text(20,512, `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next?`, battleUITextStyle);
      this.mainBattleMenuPhaserContainerGameObject = this.scene.add.container(520, 448, [
        this.createMainInfoSubPane(),
        this.scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUITextStyle),
        this.scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, battleUITextStyle),
        this.scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, battleUITextStyle),
        this.scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleUITextStyle),
      ]);
      this.hideMainBattleMenu();
    }

    createMonsterAttackSubMenu(){
        this.moveSelectionSubBatttleMenuPhaserContainerGameObject = this.scene.add.container(0, 448,[
        this.scene.add.text(55, 22, 'slash', battleUITextStyle),
        this.scene.add.text(240, 22, 'growl', battleUITextStyle),
        this.scene.add.text(55, 70, '-', battleUITextStyle),
        this.scene.add.text(240, 70, '-', battleUITextStyle),
      ])
      this.hideMonsterAttackSubMenu();
    }
    createMainInfoPane() {
          const padding = 4;
          const rectHeight = 124;
          this.scene.add
            .rectangle(
              padding,
              this.scene.scale.height - rectHeight - padding,
              this.scene.scale.width - padding * 2,
              rectHeight,
              0xede4f3,
              1
            )
            .setOrigin(0)
            .setStrokeStyle(8, 0xe4434a, 1);
        }
        createMainInfoSubPane() {
          const rectWidth = 500;
          const rectHeight = 124;
          return this.scene.add
            .rectangle(0, 0, rectWidth, rectHeight, 0xede4f3, 1)
            .setOrigin(0)
            .setStrokeStyle(8, 0x905ac2, 1);
        }
}
