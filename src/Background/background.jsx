import { useEffect, useRef } from 'react';
import './background.css';

const background = () => {
  const interBubbleRef = useRef(null);
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  useEffect(() => {
    const interBubble = interBubbleRef.current;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      if (interBubble) {
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      requestAnimationFrame(() => {
        move();
      });
    }

    window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    return () => {
      window.removeEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
      });
    };
  }, []);

  return (
    <div ref={interBubbleRef} className="interactive">
      {/* Your interactive bubble content goes here */}
    </div>
  );
};

export default background;