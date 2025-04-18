import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, MONSTER_ASSET_KEYS } from "@/assets/asset-keys";
import { SCENE_KEYS } from "./scene-keys";

export const createPreloadScene = (Phaser: typeof import("phaser")) => {
  return class PreloadScene extends Phaser.Scene {
    constructor() {
      super({ key: SCENE_KEYS.PRELOAD_SCENE });
      console.log(SCENE_KEYS.PRELOAD_SCENE);
    }

    preload() {
      const monsterTamerAssetsPath = '/assets/images/monster-tamer';
      const kenneysAssetsPath = '/assets/images/kenneys-assets';

      //battle backgrounds
      this.load.image(BATTLE_BACKGROUND_ASSET_KEYS.FOREST, `${monsterTamerAssetsPath}/battle-backgrounds/forest-background.png`)

      //battle assets
      this.load.image(BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND, `${kenneysAssetsPath}/ui-space-expansion/custom-ui.png`)

      //health-bar assets
      this.load.image(HEALTH_BAR_ASSET_KEYS.LEFT_CAP, `${kenneysAssetsPath}/ui-space-expansion/barHorizontal_green_left.png`)
      this.load.image(HEALTH_BAR_ASSET_KEYS.MIDDLE, `${kenneysAssetsPath}/ui-space-expansion/barHorizontal_green_mid.png`)
      this.load.image(HEALTH_BAR_ASSET_KEYS.RIGHT_CAP, `${kenneysAssetsPath}/ui-space-expansion/barHorizontal_green_right.png`)

      //monsters assets
      this.load.image(MONSTER_ASSET_KEYS.CARNODUSK, `${monsterTamerAssetsPath}/monsters/carnodusk.png`)
      this.load.image(MONSTER_ASSET_KEYS.IGUANIGNITE, `${monsterTamerAssetsPath}/monsters/iguanignite.png`)
    }

    create() {
      console.log(this.textures.get(BATTLE_BACKGROUND_ASSET_KEYS.FOREST))
      this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setOrigin(0)
    }
  };
};
