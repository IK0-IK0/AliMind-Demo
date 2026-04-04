import { useEffect, useRef } from 'react';

interface ShapeGridProps {
  shape?: 'square' | 'hexagon' | 'circle' | 'triangle';
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  hoverTrailAmount?: number;
}

export function ShapeGrid({
  shape = 'square',
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  squareSize = 40
}: ShapeGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        // Set canvas internal size to match display size to prevent stretching
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    // Use ResizeObserver to detect parent size changes
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawShape = (x: number, y: number, size: number) => {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      switch (shape) {
        case 'triangle':
          const height = (size * Math.sqrt(3)) / 2;
          ctx.beginPath();
          ctx.moveTo(x + size / 2, y);
          ctx.lineTo(x + size, y + height);
          ctx.lineTo(x, y + height);
          ctx.closePath();
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
          break;
        case 'hexagon':
          const hexHeight = size * Math.cos(Math.PI / 6);
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + size / 2 + (size / 2) * Math.cos(angle);
            const hy = y + hexHeight / 2 + (hexHeight / 2) * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          break;
        default: // square
          ctx.beginPath();
          ctx.rect(x, y, size, size);
          break;
      }

      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update offset based on direction
      const moveSpeed = speed * 0.5;
      switch (direction) {
        case 'right':
          offsetRef.current.x += moveSpeed;
          break;
        case 'left':
          offsetRef.current.x -= moveSpeed;
          break;
        case 'down':
          offsetRef.current.y += moveSpeed;
          break;
        case 'up':
          offsetRef.current.y -= moveSpeed;
          break;
        case 'diagonal':
          offsetRef.current.x += moveSpeed;
          offsetRef.current.y += moveSpeed;
          break;
      }

      // Wrap offset
      if (offsetRef.current.x > squareSize) offsetRef.current.x = 0;
      if (offsetRef.current.x < 0) offsetRef.current.x = squareSize;
      if (offsetRef.current.y > squareSize) offsetRef.current.y = 0;
      if (offsetRef.current.y < 0) offsetRef.current.y = squareSize;

      const cols = Math.ceil(canvas.width / squareSize) + 2;
      const rows = Math.ceil(canvas.height / squareSize) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * squareSize - offsetRef.current.x;
          const y = row * squareSize - offsetRef.current.y;
          
          drawShape(x, y, squareSize);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [shape, direction, speed, borderColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        imageRendering: 'crisp-edges'
      }}
    />
  );
}
