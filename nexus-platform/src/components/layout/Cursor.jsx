import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    };

    const onDown = () => {
      cursor.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onUp = () => {
      cursor.classList.remove('clicking');
      ring.classList.remove('clicking');
    };

    const animRing = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(animRing);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup',   onUp);
    animRing();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
    </>
  );
}