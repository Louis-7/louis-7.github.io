import { useNavigate } from 'react-router-dom';
import './Avatar.css';

interface AvatarProps {
  imageSrc: string;
  alt?: string;
  targetPath?: string;
}

export function Avatar({ imageSrc, alt = 'avatar', targetPath = '/farm' }: AvatarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(targetPath);
  };

  return (
    <div className="flip-avatar" onClick={handleClick}>
      <div className="flip-avatar-inner">
        <div className="flip-avatar-front">
          <img src={imageSrc} alt={alt} />
        </div>
        <div className="flip-avatar-back">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{imageRendering: 'pixelated'}}>
            <defs>
              {/* Sunset sky gradient */}
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="30%" stopColor="#16213e" />
                <stop offset="60%" stopColor="#533483" />
                <stop offset="100%" stopColor="#e94560" />
              </linearGradient>
              
              {/* Golden glow for door */}
              <radialGradient id="doorGlow">
                <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff8c00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ff6347" stopOpacity="0" />
              </radialGradient>
              
              {/* Magical sparkle */}
              <radialGradient id="sparkle">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffffaa" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Sky background */}
            <rect width="200" height="200" fill="url(#skyGradient)" />
            
            {/* Pixel stars */}
            <rect x="20" y="15" width="3" height="3" fill="#ffffff"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" /></rect>
            <rect x="50" y="25" width="2" height="2" fill="#ffffcc"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" /></rect>
            <rect x="160" y="20" width="3" height="3" fill="#ffffff"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" /></rect>
            <rect x="175" y="45" width="2" height="2" fill="#ffffcc"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" /></rect>
            <rect x="35" y="50" width="2" height="2" fill="#ffffff"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" /></rect>
            
            {/* Pixel moon */}
            <rect x="150" y="30" width="6" height="6" fill="#fffde7" />
            <rect x="156" y="30" width="6" height="6" fill="#fff9c4" />
            <rect x="150" y="36" width="6" height="6" fill="#fff9c4" />
            <rect x="156" y="36" width="6" height="6" fill="#fffde7" />
            <rect x="144" y="36" width="6" height="6" fill="#fffde7" opacity="0.7" />
            <rect x="162" y="36" width="6" height="6" fill="#fff9c4" opacity="0.5" />
            
            {/* Ground/grass layer */}
            <rect x="0" y="150" width="200" height="50" fill="#2d5016" />
            <rect x="0" y="150" width="200" height="8" fill="#3d6b1e" />
            
            {/* Pixel grass tufts */}
            <rect x="10" y="146" width="3" height="6" fill="#4a7c23" />
            <rect x="15" y="148" width="3" height="4" fill="#3d6b1e" />
            <rect x="45" y="147" width="3" height="5" fill="#4a7c23" />
            <rect x="170" y="146" width="3" height="6" fill="#4a7c23" />
            <rect x="180" y="148" width="3" height="4" fill="#3d6b1e" />
            
            {/* Wooden barn door frame */}
            <rect x="60" y="70" width="80" height="85" fill="#5d4037" />
            <rect x="63" y="73" width="74" height="79" fill="#4e342e" />
            
            {/* Door planks */}
            <rect x="65" y="75" width="17" height="75" fill="#6d4c41" />
            <rect x="83" y="75" width="17" height="75" fill="#795548" />
            <rect x="101" y="75" width="17" height="75" fill="#6d4c41" />
            <rect x="119" y="75" width="14" height="75" fill="#795548" />
            
            {/* Door cross beams */}
            <rect x="65" y="95" width="68" height="6" fill="#4e342e" />
            <rect x="65" y="125" width="68" height="6" fill="#4e342e" />
            
            {/* Door handle */}
            <rect x="120" y="110" width="8" height="12" fill="#ffd54f" />
            <rect x="122" y="112" width="4" height="8" fill="#ffb300" />
            
            {/* Warm light from bottom of door */}
            <rect x="65" y="145" width="68" height="5" fill="#ffd700" opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="2s" repeatCount="indefinite" />
            </rect>
            <rect x="70" y="147" width="58" height="3" fill="#ffeb3b" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
            </rect>
            
            {/* Magical glow on ground from door */}
            <ellipse cx="100" cy="155" rx="40" ry="10" fill="url(#doorGlow)">
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
            </ellipse>
            
            {/* Floating pixel particles - magical dust */}
            <rect x="75" y="100" width="3" height="3" fill="#ffd700">
              <animate attributeName="y" values="100;60;100" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
            </rect>
            <rect x="95" y="110" width="2" height="2" fill="#ffeb3b">
              <animate attributeName="y" values="110;55;110" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" begin="0.5s" />
            </rect>
            <rect x="115" y="105" width="3" height="3" fill="#fff176">
              <animate attributeName="y" values="105;50;105" dur="2.8s" repeatCount="indefinite" begin="1s" />
              <animate attributeName="opacity" values="0;1;0" dur="2.8s" repeatCount="indefinite" begin="1s" />
            </rect>
            <rect x="85" y="95" width="2" height="2" fill="#ffc107">
              <animate attributeName="y" values="95;45;95" dur="3.2s" repeatCount="indefinite" begin="1.5s" />
              <animate attributeName="opacity" values="0;1;0" dur="3.2s" repeatCount="indefinite" begin="1.5s" />
            </rect>
            
            {/* Pixel crops - wheat on left */}
            <rect x="20" y="135" width="3" height="15" fill="#daa520" />
            <rect x="18" y="132" width="7" height="4" fill="#f4d03f" />
            <rect x="28" y="138" width="3" height="12" fill="#daa520" />
            <rect x="26" y="135" width="7" height="4" fill="#f4d03f" />
            <rect x="36" y="136" width="3" height="14" fill="#daa520" />
            <rect x="34" y="133" width="7" height="4" fill="#f4d03f" />
            
            {/* Pixel crops - carrots on right */}
            <rect x="155" y="140" width="4" height="10" fill="#ff7043" />
            <rect x="153" y="136" width="8" height="5" fill="#66bb6a" />
            <rect x="165" y="142" width="4" height="8" fill="#ff7043" />
            <rect x="163" y="138" width="8" height="5" fill="#66bb6a" />
            <rect x="175" y="141" width="4" height="9" fill="#ff7043" />
            <rect x="173" y="137" width="8" height="5" fill="#66bb6a" />
            
            {/* Pixel chicken - cute style */}
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0;-1,0;0,0" dur="1.5s" repeatCount="indefinite" />
              {/* Body */}
              <rect x="42" y="162" width="10" height="8" fill="#ffffff" />
              <rect x="40" y="164" width="3" height="4" fill="#ffffff" />
              {/* Head */}
              <rect x="44" y="158" width="6" height="5" fill="#ffffff" />
              {/* Comb */}
              <rect x="46" y="156" width="2" height="3" fill="#e53935" />
              <rect x="48" y="157" width="2" height="2" fill="#e53935" />
              {/* Beak */}
              <rect x="50" y="160" width="3" height="2" fill="#ff9800" />
              {/* Eye */}
              <rect x="48" y="159" width="2" height="2" fill="#212121" />
              {/* Tail feathers */}
              <rect x="38" y="160" width="3" height="2" fill="#e0e0e0" />
              <rect x="37" y="162" width="3" height="2" fill="#bdbdbd" />
              {/* Legs */}
              <rect x="44" y="170" width="2" height="3" fill="#ff9800" />
              <rect x="48" y="170" width="2" height="3" fill="#ff9800" />
            </g>
            
            {/* Pixel pig - cute pink */}
            <g>
              <animateTransform attributeName="transform" type="translate" values="0,0;-1,0;0,0;1,0;0,0" dur="1.8s" repeatCount="indefinite" />
              {/* Body */}
              <rect x="138" y="164" width="12" height="8" fill="#ffb6c1" />
              {/* Head */}
              <rect x="148" y="160" width="8" height="8" fill="#ffb6c1" />
              {/* Ears */}
              <rect x="150" y="158" width="3" height="3" fill="#ff99aa" />
              <rect x="154" y="158" width="3" height="3" fill="#ff99aa" />
              {/* Snout */}
              <rect x="155" y="164" width="4" height="3" fill="#ff8a9b" />
              <rect x="156" y="165" width="1" height="1" fill="#c2185b" />
              <rect x="158" y="165" width="1" height="1" fill="#c2185b" />
              {/* Eye */}
              <rect x="152" y="162" width="2" height="2" fill="#212121" />
              {/* Tail - curly */}
              <rect x="136" y="166" width="2" height="2" fill="#ff99aa" />
              <rect x="134" y="164" width="2" height="2" fill="#ff99aa" />
              <rect x="135" y="162" width="2" height="2" fill="#ff99aa" />
              {/* Legs */}
              <rect x="140" y="172" width="3" height="2" fill="#ffb6c1" />
              <rect x="145" y="172" width="3" height="2" fill="#ffb6c1" />
            </g>
            
            {/* Fireflies */}
            <circle cx="45" cy="100" r="2" fill="#ffff00">
              <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="cx" values="45;50;45" dur="3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="100;95;100" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="155" cy="90" r="2" fill="#aaff00">
              <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" begin="0.5s" />
              <animate attributeName="cx" values="155;160;155" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="cy" values="90;85;90" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="130" r="1.5" fill="#ffff00">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" begin="1s" />
            </circle>
            
            {/* "ENTER" text - pixel style */}
            <g fill="#ffd700">
              <animate attributeName="opacity" values="0.7;1;0.7" dur="1.2s" repeatCount="indefinite" />
              {/* E */}
              <rect x="72" y="52" width="8" height="2" />
              <rect x="72" y="54" width="2" height="6" />
              <rect x="72" y="56" width="6" height="2" />
              <rect x="72" y="60" width="8" height="2" />
              {/* N */}
              <rect x="82" y="52" width="2" height="10" />
              <rect x="84" y="54" width="2" height="2" />
              <rect x="86" y="56" width="2" height="2" />
              <rect x="88" y="52" width="2" height="10" />
              {/* T */}
              <rect x="92" y="52" width="8" height="2" />
              <rect x="95" y="54" width="2" height="8" />
              {/* E */}
              <rect x="102" y="52" width="8" height="2" />
              <rect x="102" y="54" width="2" height="6" />
              <rect x="102" y="56" width="6" height="2" />
              <rect x="102" y="60" width="8" height="2" />
              {/* R */}
              <rect x="112" y="52" width="6" height="2" />
              <rect x="112" y="52" width="2" height="10" />
              <rect x="118" y="52" width="2" height="4" />
              <rect x="114" y="56" width="4" height="2" />
              <rect x="116" y="58" width="2" height="2" />
              <rect x="118" y="60" width="2" height="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
