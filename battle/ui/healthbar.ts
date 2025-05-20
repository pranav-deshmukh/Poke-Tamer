import { HEALTH_BAR_ASSET_KEYS } from "@/assets/asset-keys/asset-keys";

export class HealthBar{
    scene:Phaser.Scene;
    healthBarContainer:Phaser.GameObjects.Container;
    fullWidth:number;
    scaleY:number;
    leftCap:Phaser.GameObjects.Image;
    middle:Phaser.GameObjects.Image;
    rightCap:Phaser.GameObjects.Image;
    constructor(scene:Phaser.Scene, x:number, y:number){
        this.scene = scene;
        this.fullWidth = 360;
        this.scaleY = 0.7;
        this.healthBarContainer = this.scene.add.container(x, y , []);
        this.createHealthBarImages(x, y);
        this.setMeterPercentage(1);
    }
    get Container(){
        return this.healthBarContainer;
    }
    createHealthBarImages(x: number, y: number) {
          const scaleY = this.scaleY;
          this.leftCap = this.scene.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.middle = this.scene.add
            .image(this.leftCap.x + this.leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.middle.displayWidth = this.fullWidth;
          this.rightCap = this.scene.add
            .image(
              this.middle.x + this.middle.displayWidth,
              y,
              HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
            )
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.healthBarContainer.add([this.leftCap, this.middle, this.rightCap]);
        }
        setMeterPercentage(percentage: number=1) {
            const width = this.fullWidth * percentage;
            this.middle.displayWidth = width;
            this.rightCap.x = this.middle.x + this.middle.displayWidth;
        }
}