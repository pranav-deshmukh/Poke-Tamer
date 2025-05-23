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

    constructor() {
      super({ key: SCENE_KEYS.BATTLE_SCENE });
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
          attackIds: [],
          baseAttack: 5,
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
          attackIds: [],
          baseAttack: 5,
          currentLevel: 1,
        },
      });

      //render main and sub indo panes
      this.battleMenu = new BattleMenu(this);
      this.battleMenu.showMainBattleMenu();

      this.cursorKeys = this.input.keyboard?.createCursorKeys();

      this.activeEnemyMonster.takeDamage(20, () => {
        this.activePlayerMonster.takeDamage(15);
      });
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
        console.log(
          `Player selected attack: ${this.battleMenu.selectedAttack}`
        );
        this.battleMenu.hideMonsterAttackSubMenu();
        this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
          ["Your monster attacks the enemy"],
          () => {
            this.battleMenu.showMainBattleMenu();
          }
        );
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
  };
};
