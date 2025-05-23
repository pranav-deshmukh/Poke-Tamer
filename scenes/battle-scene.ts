import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from "@/assets/asset-keys/asset-keys";
import { SCENE_KEYS } from "./scene-keys";
import { BattleMenu } from "@/battle/ui/menu/battle-menu";
import { DIRECTION_TYPE } from "@/common/direction";
import { Background } from "@/battle/background";
import { HealthBar } from "@/battle/ui/healthbar";
import { EnemyBattleMonster } from "@/battle/monsters/enemy-battle-monster";
import { PlayerBattleMonster } from "@/battle/monsters/player-battle-monster";

export const createBattleScene = (Phaser: typeof import("phaser")) => {
  return class BattleScene extends Phaser.Scene {
    battleMenu: BattleMenu;
    cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    activeEnemyMonster: EnemyBattleMonster;
    activePlayerMonster: PlayerBattleMonster;
    activePlayerAttackIndex: number;

    constructor() {
      super({ key: SCENE_KEYS.BATTLE_SCENE });
    }

    init(){
      this.activePlayerAttackIndex = -1;
    }

    preload() {
      const monsterTamerAssetsPath = "/assets/images/monster-tamer";
      const kenneysAssetsPath = "/assets/images/kenneys-assets";

      //battle backgrounds
      this.load.image(
        BATTLE_BACKGROUND_ASSET_KEYS.FOREST,
        `${monsterTamerAssetsPath}/battle-backgrounds/forest-background.png`
      );

      //battle assets
      this.load.image(
        BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
        `${kenneysAssetsPath}/ui-space-expansion/custom-ui.png`
      );

      //health-bar assets
      this.load.image(
        HEALTH_BAR_ASSET_KEYS.LEFT_CAP,
        `${kenneysAssetsPath}/ui-space-expansion/barHorizontal_green_left.png`
      );
      this.load.image(
        HEALTH_BAR_ASSET_KEYS.MIDDLE,
        `${kenneysAssetsPath}/ui-space-expansion/barHorizontal_green_mid.png`
      );
      this.load.image(
        HEALTH_BAR_ASSET_KEYS.RIGHT_CAP,
        `${kenneysAssetsPath}/ui-space-expansion/barHorizontal_green_right.png`
      );

      //monsters assets
      this.load.image(
        MONSTER_ASSET_KEYS.CARNODUSK,
        `${monsterTamerAssetsPath}/monsters/carnodusk.png`
      );
      this.load.image(
        MONSTER_ASSET_KEYS.IGUANIGNITE,
        `${monsterTamerAssetsPath}/monsters/iguanignite.png`
      );
    }

    create() {
      console.log(`[${BattleScene.name}] Preload complete`);
      //main background
      const background = new Background(this);
      background.showForest();

      //render player and enemy
      this.activeEnemyMonster = new EnemyBattleMonster({
        scene: this,
        monsterDetails: {
          name: MONSTER_ASSET_KEYS.CARNODUSK,
          assetKey: MONSTER_ASSET_KEYS.CARNODUSK,
          assetFrame: 0,
          currentHp: 25,
          maxHp: 25,
          attackIds: [1],
          baseAttack: 25,
          currentLevel: 1,
        },
      });

      this.activePlayerMonster = new PlayerBattleMonster({
        scene: this,
        monsterDetails: {
          name: MONSTER_ASSET_KEYS.IGUANIGNITE,
          assetKey: MONSTER_ASSET_KEYS.IGUANIGNITE,
          assetFrame: 0,
          currentHp: 25,
          maxHp: 25,
          attackIds: [2],
          baseAttack: 5,
          currentLevel: 1,
        },
      });

      //render main and sub info panes
      this.battleMenu = new BattleMenu(this, this.activePlayerMonster);
      this.battleMenu.showMainBattleMenu();

      this.cursorKeys = this.input.keyboard?.createCursorKeys();
    }

    update() {
      const wasSpaceKeyPresses = Phaser.Input.Keyboard.JustDown(
        this.cursorKeys?.space
      );
      if (wasSpaceKeyPresses) {
        this.battleMenu.handlePlayerInput("OK");

        //check if player selected an attack, and update display text
        if (this.battleMenu.selectedAttack === undefined) {
          return;
        }
        
        this.activePlayerAttackIndex = this.battleMenu.selectedAttack;

        if(!this.activePlayerMonster.attacks[this.activePlayerAttackIndex]){
          return;
        }

        console.log(
          `Player selected attack: ${this.battleMenu.selectedAttack}`
        );

        this.battleMenu.hideMonsterAttackSubMenu();
        this.handleBattleSequence();
      }

      if (Phaser.Input.Keyboard.JustDown(this.cursorKeys?.shift)) {
        this.battleMenu.handlePlayerInput("CANCEL");
        return;
      }

      let selectedDirection: DIRECTION_TYPE = DIRECTION_TYPE.NONE;
      if (this.cursorKeys.left.isDown) {
        selectedDirection = DIRECTION_TYPE.LEFT;
      } else if (this.cursorKeys.right.isDown) {
        selectedDirection = DIRECTION_TYPE.RIGHT;
      }
      if (this.cursorKeys.up.isDown) {
        selectedDirection = DIRECTION_TYPE.UP;
      } else if (this.cursorKeys.down.isDown) {
        selectedDirection = DIRECTION_TYPE.DOWN;
      }

      if (selectedDirection !== DIRECTION_TYPE.NONE) {
        this.battleMenu.handlePlayerInput(selectedDirection);
        return;
      }
    }
    handleBattleSequence(){
      //general battle flowt
      //show attack used, brief pause
      //then play attack animation, brief pause
      //then show damage taken, brief pause
      //then show monster health bar, brief pause
      //then repeat above steps fro enemy monster
      this.playerAttack();
    }
    playerAttack(){
      this.battleMenu.updateInfoPaneMessagesAndWaitForInput([`${this.activePlayerMonster.name} used ${this.activePlayerMonster.attacks[this.activePlayerAttackIndex].name}`],()=>{
        this.time.delayedCall(500, ()=>{
          this.activeEnemyMonster.takeDamage(this.activePlayerMonster.baseAttack, ()=>{
            this.enemyAttack();
          })
        })
      })
    }
    enemyAttack(){
      if(this.activeEnemyMonster.isFainted){
        this.postBattleSequenceCheck();
        return;
      }
      this.battleMenu.updateInfoPaneMessagesAndWaitForInput([`for ${this.activeEnemyMonster.name} used ${this.activeEnemyMonster.attacks[0].name}`],()=>{
        this.time.delayedCall(500, ()=>{
          this.activePlayerMonster.takeDamage(this.activeEnemyMonster.baseAttack, ()=>{
            this.postBattleSequenceCheck();
          })
        })
      })
    }

    postBattleSequenceCheck(){
      if(this.activeEnemyMonster.isFainted){
        this.battleMenu.updateInfoPaneMessagesAndWaitForInput([`WIld ${this.activeEnemyMonster.name} fainted`,`You have gained some experience`],
        ()=>{
          this.transitionToNextScene();
        });
        return;
      }

      if(this.activePlayerMonster.isFainted){
        this.battleMenu.updateInfoPaneMessagesAndWaitForInput([`WIld ${this.activePlayerMonster.name} fainted`,`You have no more monsters, escaping to safety...`],
        ()=>{
          this.transitionToNextScene();
        });
        return;
      }
      this.battleMenu.showMainBattleMenu();
    }

    transitionToNextScene(){
      this.cameras.main.fadeOut(600, 0, 0, 0);
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, ()=>{
        this.scene.start(SCENE_KEYS.BATTLE_SCENE);
      })
    }
  };
};
