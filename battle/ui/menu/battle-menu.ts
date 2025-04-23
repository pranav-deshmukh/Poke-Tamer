import { MONSTER_ASSET_KEYS, UI_ASSET_KEYS } from "@/assets/asset-keys/asset-keys";
import { DIRECTION_TYPE } from "@/common/direction";

const BATTLE_MENU_OPTIONS = Object.freeze({
  FIGHT: "FIGHT",
  SWITCH: "SWITCH",
  ITEM: "ITEM",
  FLEE: "FLEE",
});

const ATTACK_MOVE_OPTIONS = Object.freeze({
    MOVE_1: "MOVE_1",
    MOVE_2: "MOVE_2",
    MOVE_3: "MOVE_3",
    MOVE_4: "MOVE_4",
})

type BattleMenuOptions =keyof typeof BATTLE_MENU_OPTIONS;
type AttackMenuOptions =keyof typeof ATTACK_MOVE_OPTIONS;

const battleUITextStyle = {
  color: "black",
  fontSize: "30px",
};

type inputType = "OK" | "CANCEL";

const BATTLE_MENU_CURSOR_POSITION = Object.freeze({
    X:42,
    Y:38,
})

const ATTACK_MENU_CURSOR_POSITION = Object.freeze({
    X:42,
    Y:38,
})


export class BattleMenu{
    scene;
    mainBattleMenuPhaserContainerGameObject:Phaser.GameObjects.Container;
    moveSelectionSubBattleMenuPhaserContainerGameObject:Phaser.GameObjects.Container;
    battleTextGameObjectLine1:Phaser.GameObjects.Text;
    battleTextGameObjectLine2:Phaser.GameObjects.Text;
    mainBattleMenuCursorPhaserImageGameObject:Phaser.GameObjects.Image;
    attackBattleMenuCursorPhaserImageGameObject:Phaser.GameObjects.Image;
    selectedBattleMenuOption:BattleMenuOptions;
    selectedAttackMoveOption:AttackMenuOptions;
    constructor(scene:Phaser.Scene){
        this.scene = scene;
        this.createMainInfoPane();
        this.createMainBattleMenu();
        this.createMonsterAttackSubMenu();
        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_1;
    }

    showMainBattleMenu(){
        this.battleTextGameObjectLine1.setText('what should');
        this.mainBattleMenuPhaserContainerGameObject.setAlpha(1);
        this.battleTextGameObjectLine1.setAlpha(1);
        this.battleTextGameObjectLine2.setAlpha(1);


        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
        this.mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.X, BATTLE_MENU_CURSOR_POSITION.Y);
    }
    
    hideMainBattleMenu(){
        this.mainBattleMenuPhaserContainerGameObject.setAlpha(0);
        this.battleTextGameObjectLine1.setAlpha(0);
        this.battleTextGameObjectLine2.setAlpha(0);
    }

    showMonsterAttackSubMenu(){
        this.moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(1);
    }

    hideMonsterAttackSubMenu(){
        this.moveSelectionSubBattleMenuPhaserContainerGameObject.setAlpha(0);
    }

    handlePlayerInput(input:DIRECTION_TYPE | inputType){
        console.log(input);
        if(input === "CANCEL"){
            this.hideMonsterAttackSubMenu();
            this.showMainBattleMenu();
            return;
        }
        if(input === "OK"){
            this.hideMainBattleMenu();
            this.showMonsterAttackSubMenu();
            return;
        }

        this.updateSelectedBattleMenuOption(input);
        this.moveMainBattleMenuCursor();
        this.updateSelectedMoveMenuOptionsFromInput(input);
        this.moveSelectBattleMenuCursor();
    }

    createMainBattleMenu(){
        this.battleTextGameObjectLine1 = this.scene.add.text(20,468, 'what should', battleUITextStyle);
        // TODO: add monster name such that it dynamically chnages to the mosnter name that user chose
        this.battleTextGameObjectLine2 = this.scene.add.text(20,512, `${MONSTER_ASSET_KEYS.IGUANIGNITE} do next?`, battleUITextStyle);

        this.mainBattleMenuCursorPhaserImageGameObject = this.scene.add.image(BATTLE_MENU_CURSOR_POSITION.X, BATTLE_MENU_CURSOR_POSITION.Y, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2.5);

      this.mainBattleMenuPhaserContainerGameObject = this.scene.add.container(520, 448, [
        this.createMainInfoSubPane(),
        this.scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUITextStyle),
        this.scene.add.text(240, 22, BATTLE_MENU_OPTIONS.SWITCH, battleUITextStyle),
        this.scene.add.text(55, 70, BATTLE_MENU_OPTIONS.ITEM, battleUITextStyle),
        this.scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleUITextStyle),
        this.mainBattleMenuCursorPhaserImageGameObject
      ]);
      this.hideMainBattleMenu();
    }

    createMonsterAttackSubMenu(){
        this.attackBattleMenuCursorPhaserImageGameObject = this.scene.add.image(ATTACK_MENU_CURSOR_POSITION.X, ATTACK_MENU_CURSOR_POSITION.Y, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2.5);
        this.moveSelectionSubBattleMenuPhaserContainerGameObject = this.scene.add.container(0, 448,[
        this.scene.add.text(55, 22, 'slash', battleUITextStyle),
        this.scene.add.text(240, 22, 'growl', battleUITextStyle),
        this.scene.add.text(55, 70, '-', battleUITextStyle),
        this.scene.add.text(240, 70, '-', battleUITextStyle),
        this.attackBattleMenuCursorPhaserImageGameObject,
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
        updateSelectedBattleMenuOption(direction:DIRECTION_TYPE){
            if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT){
                switch(direction){
                    
                    case DIRECTION_TYPE.DOWN:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
                        return;
                    case DIRECTION_TYPE.RIGHT:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
                        return;
                    case DIRECTION_TYPE.UP:
                    case DIRECTION_TYPE.LEFT:
                    default:
                        break;
                }
                return;
            }

            if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.SWITCH){
                switch(direction){
                    
                    case DIRECTION_TYPE.DOWN:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
                        return;
                    case DIRECTION_TYPE.LEFT:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
                        return;
                    case DIRECTION_TYPE.RIGHT:
                    case DIRECTION_TYPE.UP:
                    default:
                        break;
                }
                return;
            }

            if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM){
                switch(direction){
                    
                    case DIRECTION_TYPE.UP:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
                        return;
                    case DIRECTION_TYPE.RIGHT:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
                        return;
                    case DIRECTION_TYPE.DOWN:
                    case DIRECTION_TYPE.LEFT:
                    default:
                        break;
                }
                return;
            }

            if(this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE){
                switch(direction){
                    
                    case DIRECTION_TYPE.LEFT:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
                        return;
                    case DIRECTION_TYPE.UP:
                        this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.SWITCH;
                        return;
                    case DIRECTION_TYPE.DOWN:
                    case DIRECTION_TYPE.RIGHT:
                    default:
                        break;
                }
                return;
            }
        }
        moveMainBattleMenuCursor(){
            switch(this.selectedBattleMenuOption){
                case BATTLE_MENU_OPTIONS.FIGHT:
                    this.mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.X, BATTLE_MENU_CURSOR_POSITION.Y);
                    return;
                case BATTLE_MENU_OPTIONS.SWITCH:
                    this.mainBattleMenuCursorPhaserImageGameObject.setPosition(228, BATTLE_MENU_CURSOR_POSITION.Y);
                    return;
                case BATTLE_MENU_OPTIONS.ITEM:
                    this.mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POSITION.X, 86);
                    return;
                case BATTLE_MENU_OPTIONS.FLEE:
                    this.mainBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
                    return;
                default:
                    return;
            }
        }
        updateSelectedMoveMenuOptionsFromInput(direction:DIRECTION_TYPE){
            if(this.selectedAttackMoveOption === ATTACK_MOVE_OPTIONS.MOVE_1){ 
                switch(direction){
                    
                    case DIRECTION_TYPE.DOWN:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_3;
                        return;
                    case DIRECTION_TYPE.RIGHT:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_2;
                        return;
                    case DIRECTION_TYPE.UP:
                    case DIRECTION_TYPE.LEFT:
                    default:
                        break;
                }
                return;
            }
            if(this.selectedAttackMoveOption === ATTACK_MOVE_OPTIONS.MOVE_2){ 
                switch(direction){
                    
                    case DIRECTION_TYPE.LEFT:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_1;
                        return;
                    case DIRECTION_TYPE.DOWN:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_4;
                        return;
                    case DIRECTION_TYPE.RIGHT:
                    case DIRECTION_TYPE.UP:
                    default:
                        break;
                }
                return;
            }
            if(this.selectedAttackMoveOption === ATTACK_MOVE_OPTIONS.MOVE_3){ 
                switch(direction){
                    
                    case DIRECTION_TYPE.UP:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_1;
                        return;
                    case DIRECTION_TYPE.RIGHT:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_4;
                        return;
                    case DIRECTION_TYPE.DOWN:
                    case DIRECTION_TYPE.LEFT:
                    default:
                        break;
                }
                return;
            }
            if(this.selectedAttackMoveOption === ATTACK_MOVE_OPTIONS.MOVE_4){ 
                switch(direction){
                    
                    case DIRECTION_TYPE.UP:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_2;
                        return;
                    case DIRECTION_TYPE.LEFT:
                        this.selectedAttackMoveOption = ATTACK_MOVE_OPTIONS.MOVE_3;
                        return;
                    case DIRECTION_TYPE.DOWN:
                    case DIRECTION_TYPE.RIGHT:
                    default:
                        break;
                }
                return;
            }
        }
        moveSelectBattleMenuCursor(){
            switch(this.selectedAttackMoveOption){
                case ATTACK_MOVE_OPTIONS.MOVE_1:
                    this.attackBattleMenuCursorPhaserImageGameObject.setPosition(ATTACK_MENU_CURSOR_POSITION.X, ATTACK_MENU_CURSOR_POSITION.Y);
                    return;
                case ATTACK_MOVE_OPTIONS.MOVE_2:
                    this.attackBattleMenuCursorPhaserImageGameObject.setPosition(228, ATTACK_MENU_CURSOR_POSITION.Y);
                    return;
                case ATTACK_MOVE_OPTIONS.MOVE_3:
                    this.attackBattleMenuCursorPhaserImageGameObject.setPosition(ATTACK_MENU_CURSOR_POSITION.X, 86);
                    return;
                case ATTACK_MOVE_OPTIONS.MOVE_4:
                    this.attackBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
                    return;
                default:
                    return;
            }
        }
}
