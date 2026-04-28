import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";
import Nav from "./Nav";
import Footer from "./Footer";
import "../../cinematic.css";

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (ref.current)
        ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor" />;
}

interface CinematicLayoutProps {
  children: ReactNode;
}

export default function CinematicLayout({ children }: CinematicLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cinematic-page" data-theme={theme}>
      <Cursor />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      {children}
      <Footer />
    </div>
  );
}
