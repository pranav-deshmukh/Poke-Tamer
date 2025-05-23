import {
    BATTLE_ASSET_KEYS,
    BATTLE_BACKGROUND_ASSET_KEYS,
    HEALTH_BAR_ASSET_KEYS,
    MONSTER_ASSET_KEYS,
  } from "@/assets/asset-keys/asset-keys";

export class Background{
    scene:Phaser.Scene;
    backgroundGameObject:Phaser.GameObjects.Image;
    constructor(scene:Phaser.Scene){
        this.scene = scene;
        this.backgroundGameObject = this.scene.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.FOREST)
        .setOrigin(0)
        .setAlpha(0);
    }
    showForest(){
        this.backgroundGameObject.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.FOREST).setAlpha(1);
    }
}