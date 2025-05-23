export interface Monster {
  name: string;
  assetKey: string;
  assetFrame?: number;
  maxHp: number;
  currentHp: number;
  baseAttack: number;
  attackIds: number[];
}

export interface BattleMonsterConfig {
  scene: Phaser.Scene;
  monsterDetails: Monster;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Attack{
    id:number;
    name:string;
    animationName:string;

}