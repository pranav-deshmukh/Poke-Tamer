import { HEALTH_BAR_ASSET_KEYS } from "@/assets/asset-keys/asset-keys";

export class HealthBar{
    scene:Phaser.Scene;
    healthBarContainer:Phaser.GameObjects.Container;
    fullWidth:number;
    scaleY:number;
    leftCap:Phaser.GameObjects.Image;
    middle:Phaser.GameObjects.Image;
    rightCap:Phaser.GameObjects.Image;
    leftShadowCap:Phaser.GameObjects.Image;
    middleShadow:Phaser.GameObjects.Image;
    rightShadowCap:Phaser.GameObjects.Image;
    constructor(scene:Phaser.Scene, x:number, y:number){
        this.scene = scene;
        this.fullWidth = 360;
        this.scaleY = 0.7;
        this.healthBarContainer = this.scene.add.container(x, y , []);
        this.createHealthBarShadowImages(x, y);
        this.createHealthBarImages(x, y);
        this.setMeterPercentage(1);
    }
    get Container(){
        return this.healthBarContainer;
    }
    createHealthBarShadowImages(x:number,y:number){
      const scaleY = this.scaleY;
          this.leftShadowCap = this.scene.add
            .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP_SHADOW)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.middleShadow = this.scene.add
            .image(this.leftShadowCap.x + this.leftShadowCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE_SHADOW)
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.middleShadow.displayWidth = this.fullWidth;
          this.rightShadowCap = this.scene.add
            .image(
              this.middleShadow.x + this.middleShadow.displayWidth,
              y,
              HEALTH_BAR_ASSET_KEYS.RIGHT_CAP_SHADOW
            )
            .setOrigin(0, 0.5)
            .setScale(1, scaleY);
          this.healthBarContainer.add([this.leftShadowCap, this.middleShadow, this.rightShadowCap]);
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
        setMeterPercentageAnimated(percentage:number, options?){
            const width = this.fullWidth * percentage;

            this.scene.tweens.add({
                targets:this.middle,
                displayWidth:width,
                duration:options?.duration || 1000,
                ease: Phaser.Math.Easing.Sine.Out,
                onUpdate:()=>{
                    this.rightCap.x = this.middle.x + this.middle.displayWidth;
                    const isVisible = this.middle.displayWidth > 0;
                    this.leftCap.visible = isVisible;
                    this.middle.visible = isVisible;
                    this.rightCap.visible = isVisible;
                },
                onComplete:options?.callback,
            })

        }
}