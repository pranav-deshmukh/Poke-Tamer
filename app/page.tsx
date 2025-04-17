"use client";
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
        canvas: canvasRef.current,
        width: 800,
        height: 600,
        scene: {
          preload() {
            this.load.image("logo", "https://labs.phaser.io/assets/sprites/phaser3-logo.png");
          },
          create() {
            this.add.image(400, 300, "logo");
          },
        },
      });
    };

    loadPhaser();

    return () => {
      if (game) game.destroy(true);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
