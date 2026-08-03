export function DashboardDeviceScene() {
  return (
    <div
      className="dashboard-device-scene"
      role="img"
      aria-label="رسم متحرك ثنائي الأبعاد لشاشة وكمبيوتر وطابعة متصلة لاسلكيًا"
    >
      <svg viewBox="0 0 620 330" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="itam-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.26" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.07" />
          </linearGradient>
          <linearGradient id="itam-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8fdff" />
            <stop offset="1" stopColor="#bcecff" />
          </linearGradient>
          <filter id="itam-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <clipPath id="itam-paper-clip">
            <rect x="464" y="209" width="102" height="84" rx="3" />
          </clipPath>
        </defs>

        <g className="device-scene__ambient">
          <circle cx="310" cy="157" r="145" />
          <circle cx="310" cy="157" r="112" />
          <circle cx="91" cy="61" r="4" />
          <circle cx="568" cy="79" r="3" />
          <circle cx="415" cy="35" r="5" />
        </g>
        <ellipse className="device-scene__shadow" cx="310" cy="289" rx="255" ry="20" />

        <g className="device-scene__connections" fill="none">
          <path className="connection-line" d="M294 160C323 139 344 139 366 158" />
          <path className="connection-line connection-line--printer" d="M402 165C438 141 467 149 483 174" />
        </g>

        <g className="device-scene__monitor">
          <rect className="device-frame" x="42" y="65" width="258" height="158" rx="18" />
          <rect className="monitor-screen" x="58" y="81" width="226" height="126" rx="10" />
          <g className="monitor-ui">
            <rect x="76" y="98" width="67" height="10" rx="5" />
            <rect className="monitor-ui__soft" x="76" y="116" width="103" height="6" rx="3" />
            <rect className="monitor-ui__card" x="76" y="139" width="56" height="44" rx="7" />
            <rect className="monitor-ui__card" x="141" y="139" width="56" height="44" rx="7" />
            <rect className="monitor-ui__card" x="206" y="139" width="60" height="44" rx="7" />
            <path className="monitor-ui__chart" d="M85 171l12-13 10 6 15-18" />
            <path className="monitor-ui__chart monitor-ui__chart--two" d="M150 171l11-8 9 3 17-18" />
            <path className="monitor-ui__chart monitor-ui__chart--three" d="M215 171l12-15 10 7 18-17" />
          </g>
          <circle className="device-led" cx="171" cy="215" r="3" />
          <path className="monitor-neck" d="M155 223v31h32v-31" />
          <rect className="monitor-base" x="119" y="251" width="104" height="12" rx="6" />
        </g>

        <g className="device-scene__tower">
          <rect className="device-frame" x="325" y="104" width="83" height="159" rx="17" />
          <rect className="tower-vent" x="342" y="125" width="49" height="7" rx="3.5" />
          <rect className="tower-vent tower-vent--short" x="342" y="141" width="31" height="7" rx="3.5" />
          <circle className="tower-button" cx="367" cy="231" r="12" />
          <circle className="device-led" cx="367" cy="231" r="4" />
        </g>

        <g className="device-scene__wifi" fill="none" strokeLinecap="round">
          <path className="wifi-wave wifi-wave--outer" d="M331 79c20-19 52-19 72 0" />
          <path className="wifi-wave wifi-wave--middle" d="M341 90c14-13 38-13 52 0" />
          <path className="wifi-wave wifi-wave--inner" d="M352 101c8-7 22-7 30 0" />
          <circle className="wifi-core" cx="367" cy="111" r="4" />
        </g>

        <g className="device-scene__printer">
          <g className="printer-input-paper">
            <path d="M468 131h91l-7 53h-77z" />
            <path d="M481 147h63M480 158h50" />
          </g>
          <rect className="printer-lid" x="446" y="164" width="137" height="31" rx="10" />
          <rect className="device-frame printer-frame" x="426" y="184" width="177" height="79" rx="17" />
          <rect className="printer-control" x="551" y="198" width="30" height="14" rx="5" />
          <circle className="device-led printer-led" cx="573" cy="205" r="3" />
          <rect className="printer-slot" x="450" y="215" width="128" height="10" rx="5" />
          <g clipPath="url(#itam-paper-clip)">
            <g className="printer-output-paper">
              <rect x="464" y="207" width="102" height="70" rx="4" />
              <path d="M478 225h74M478 237h60M478 249h68" />
            </g>
          </g>
          <path className="printer-tray" d="M451 254h128l-9 26H460z" />
        </g>

        <g className="device-scene__packets" fill="currentColor">
          <circle className="data-packet data-packet--monitor" r="4">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M366 158C342 139 319 139 294 160" />
          </circle>
          <circle className="data-packet data-packet--printer" r="4">
            <animateMotion dur="3.2s" begin=".7s" repeatCount="indefinite" path="M402 165C438 141 467 149 483 174" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
