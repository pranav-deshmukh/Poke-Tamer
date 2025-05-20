import { HEALTH_BAR_ASSET_KEYS } from "@/assets/asset-keys/asset-keys";

export class HealthBar{
    scene:Phaser.Scene;
    healthBarContainer:Phaser.GameObjects.Container;
    fullWidth:number;
    scaleY:number;
    constructor(scene:Phaser.Scene, x:number, y:number){
        this.scene = scene;
        this.fullWidth = 360;
        this.scaleY = 0.7;
        this.healthBarContainer = this.scene.add.container(x, y , []);
        this.createHealthBarImages(x, y);
    }
    get Container(){
        return this.healthBarContainer;
    }
    createHealthBarImages(x: number, y: number) {
          const scaleY = this.scaleY;
          const leftCap = this.scene.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          const middle = this.scene.add
            .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          middle.displayWidth = this.fullWidth;
          const rightCap = this.scene.add
            .image(
              middle.x + middle.displayWidth,
              y,
              HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
            )
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.healthBarContainer.add([leftCap, middle, rightCap]);
        }
}