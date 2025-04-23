import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUND_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from "@/assets/asset-keys/asset-keys";
import { SCENE_KEYS } from "./scene-keys";
import { BattleMenu } from "@/battle/ui/menu/battle-menu";
import { DIRECTION, DIRECTION_TYPE } from "@/common/direction";



export const createBattleScene = (Phaser: typeof import("phaser")) => {
  return class BattleScene extends Phaser.Scene {
    battleMenu:BattleMenu;
    cursorKeys:Phaser.Types.Input.Keyboard.CursorKeys;
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
      this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0);

      //render player and enemy
      this.add.image(768, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0);
      this.add
        .image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0)
        .setFlipX(true);

      //render player health bar
      const playerMonsterName = this.add.text(
        30,
        20,
        MONSTER_ASSET_KEYS.IGUANIGNITE,
        {
          color: "#7E3D3F",
          fontSize: "32px",
        }
      );
      this.add.container(556, 318, [
        this.add
          .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
          .setOrigin(0),
        playerMonsterName,
        this.createHealthBar(34, 34),
        this.add.text(playerMonsterName.width + 35, 23, "L1", {
          color: "#ED474B",
          fontSize: "28px",
        }),
        this.add.text(30, 55, "HP", {
          color: "#FF6505",
          fontSize: "24px",
          fontStyle: "italic",
        }),
        this.add
          .text(443, 80, "25/25", {
            color: "#7E3D3F",
            fontSize: "16px",
          })
          .setOrigin(1, 0),
      ]);

      const enemyMonsterName = this.add.text(
        30,
        20,
        MONSTER_ASSET_KEYS.CARNODUSK,
        {
          color: "#7E3D3F",
          fontSize: "32px",
        }
      );
      this.add.container(0, 0, [
        this.add
          .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
          .setOrigin(0)
          .setScale(1, 0.8),
        enemyMonsterName,
        this.createHealthBar(34, 34),
        this.add.text(enemyMonsterName.width + 35, 23, "L1", {
          color: "#ED474B",
          fontSize: "28px",
        }),
        this.add.text(30, 55, "HP", {
          color: "#FF6505",
          fontSize: "24px",
          fontStyle: "italic",
        }),

        //render main and sub indo panes
      ]);
      this.battleMenu = new BattleMenu(this);
      this.battleMenu.showMainBattleMenu();
      this.cursorKeys = this.input.keyboard?.createCursorKeys();
      
    }

    update(){
        const wasSpaceKeyPresses = Phaser.Input.Keyboard.JustDown(this.cursorKeys?.space);
        if(wasSpaceKeyPresses){
            this.battleMenu.handlePlayerInput("OK");
            return;
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorKeys?.shift)){
            this.battleMenu.handlePlayerInput("CANCEL");
            return;
        }

        let selectedDirection:DIRECTION_TYPE = DIRECTION_TYPE.NONE;
        if(this.cursorKeys.left.isDown){
            selectedDirection = DIRECTION_TYPE.LEFT;
        }else if(this.cursorKeys.right.isDown){
            selectedDirection = DIRECTION_TYPE.RIGHT;
        }
        if(this.cursorKeys.up.isDown){
            selectedDirection = DIRECTION_TYPE.UP;
        }else if(this.cursorKeys.down.isDown){
            selectedDirection = DIRECTION_TYPE.DOWN;
        }

        if(selectedDirection !== DIRECTION_TYPE.NONE){
            this.battleMenu.handlePlayerInput(selectedDirection);
            return;
        }
    }
    createHealthBar(x: number, y: number) {
      const scaleY = 0.7;
      const leftCap = this.add
        .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
        .setOrigin(0, 0.5)
        .setScale(1, scaleY);
      const middle = this.add
        .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
        .setOrigin(0, 0.5)
        .setScale(1, scaleY);
      middle.displayWidth = 360;
      const rightCap = this.add
        .image(
          middle.x + middle.displayWidth,
          y,
          HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
        )
        .setOrigin(0, 0.5)
        .setScale(1, scaleY);
      return this.add.container(x, y, [leftCap, middle, rightCap]);
    }

    
  };
};
