"use client";
import { createPreloadScene } from "@/scenes/preload-scene";
import { SCENE_KEYS } from "@/scenes/scene-keys";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let game: Phaser.Game;

    const loadPhaser = async () => {
      const Phaser = (await import("phaser")).default;

      if (!canvasRef.current) return;

      game = new Phaser.Game({
        type: Phaser.CANVAS,
        pixelArt:false,
        canvas: canvasRef.current,
        backgroundColor: "#000000",
        scale:{
          width:1024,
          height:576,
          mode:Phaser.Scale.FIT,
          autoCenter:Phaser.Scale.CENTER_BOTH,
        },
      });

      game.scene.add(SCENE_KEYS.PRELOAD_SCENE, createPreloadScene(Phaser));
      game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
    };

    loadPhaser();

    return () => {
      if (game) game.destroy(true);
    };
  }, []);

  return (
    <div className="">
      <canvas className="" ref={canvasRef} />
    </div>
  );
}
