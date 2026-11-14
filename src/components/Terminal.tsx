import { useEffect, useState } from 'react';

const commands = [
  { command: 'whoami', output: 'Computer Science Student · Sherry' },
  { command: 'cat interests.json', output: '{ "focus": "AI Infrastructure", "interests": ["Autonomous Driving", "Robotics"] }' },
  { command: 'echo $DESKTOP_SESSION', output: 'plasmax11 · KDE Plasma' },
];

function ArchLogo() {
  return <svg className="arch-mark" viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="M100 5C85 42 76 65 59 100c10-8 22-15 41-19-7 8-18 16-25 20l-14 6C45 140 30 172 15 196c29-16 57-26 85-29l.5-42c11 17 28 32 45 41-3-18-16-43-31-63 24 7 47 19 69 37C155 94 122 47 100 5Z"/></svg>;
}

export default function Terminal() {
  const [position, setPosition] = useState(0);
  const [line, setLine] = useState(0);
  useEffect(() => {
    const length = commands[line].command.length;
    const t = setTimeout(() => {
      if (position <= length) setPosition(v => v + 1);
      else { setLine(v => (v + 1) % commands.length); setPosition(0); }
    }, position > length ? 1900 : 98);
    return () => clearTimeout(t);
  }, [line, position]);
  return (
    <div className="terminal-shell" aria-label="Arch Linux 스타일의 애니메이션 터미널">
      <div className="terminal-titlebar"><div className="traffic"><i/><i/><i/></div><span>sherry — zsh — Arch Linux</span><span className="terminal-bars">▂ ▄ ▆</span></div>
      <div className="terminal-body">
        <ArchLogo />
        <div className="term-line"><strong>sherry@arch</strong> <span>~ % neofetch</span></div>
        <div className="terminal-system"><span className="term-cyan">OS</span> Arch Linux<br/><span className="term-cyan">DE</span> KDE Plasma<br/><span className="term-cyan">Editor</span> Zed<br/><span className="term-cyan">Shell</span> zsh</div>
        <div className="term-line spaced"><strong>sherry@arch</strong> <span>~ % {commands[line].command.slice(0, position)}<b className="cursor">▌</b></span></div>
        <div className="term-output">{position > commands[line].command.length ? commands[line].output : '\u00a0'}</div>
      </div>
    </div>
  );
}
