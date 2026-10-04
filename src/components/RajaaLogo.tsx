import React from 'react';

export interface RajaaLogoProps {
  className?: string;
  size?: number;
  showGlow?: boolean;
}

export const RajaaLogo: React.FC<RajaaLogoProps> = ({ 
  className = '', 
  size = 120,
  showGlow = true
}) => {
  // Unique IDs for SVG gradients and clip paths to prevent collisions
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="شعار نادي الرجاء العراقي الرسمي"
    >
      <svg
        viewBox="0 0 500 500"
        className={`w-full h-full ${showGlow ? 'drop-shadow-[0_8px_25px_rgba(212,160,52,0.35)]' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradients */}
          <linearGradient id={`${idPrefix}-goldOuter`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7dc79" />
            <stop offset="25%" stopColor="#d8a83d" />
            <stop offset="50%" stopColor="#fae79d" />
            <stop offset="75%" stopColor="#b3811f" />
            <stop offset="100%" stopColor="#e8bf56" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-goldInner`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fae79d" />
            <stop offset="50%" stopColor="#d19c30" />
            <stop offset="100%" stopColor="#966a15" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-goldText`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fae48e" />
            <stop offset="50%" stopColor="#dfa732" />
            <stop offset="100%" stopColor="#fae48e" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-shieldGold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd868" />
            <stop offset="35%" stopColor="#d4a132" />
            <stop offset="70%" stopColor="#aa791b" />
            <stop offset="100%" stopColor="#e8bb47" />
          </linearGradient>

          {/* Crimson Red Stripes Gradient */}
          <linearGradient id={`${idPrefix}-redStripe`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b51a28" />
            <stop offset="50%" stopColor="#8d0f1b" />
            <stop offset="100%" stopColor="#67050f" />
          </linearGradient>

          {/* Green Leaves Gradient */}
          <linearGradient id={`${idPrefix}-leafGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e7d32" />
            <stop offset="50%" stopColor="#1b5e20" />
            <stop offset="100%" stopColor="#0d3c12" />
          </linearGradient>

          {/* Ball 3D Shading */}
          <radialGradient id={`${idPrefix}-ballShading`} cx="38%" cy="35%" r="62%">
            <stop offset="0%" stopColor="#fff2a8" />
            <stop offset="40%" stopColor="#e0aa35" />
            <stop offset="85%" stopColor="#9a6e15" />
            <stop offset="100%" stopColor="#5c3f09" />
          </radialGradient>

          {/* Curved Paths for Typography */}
          {/* Top Arc: clockwise from left to right along top (R=178) */}
          <path id={`${idPrefix}-topArc`} d="M 72 250 A 178 178 0 1 1 428 250" fill="none" />
          
          {/* Bottom Arc: clockwise from right to left along bottom so text stands upright (R=175) */}
          <path id={`${idPrefix}-bottomArc`} d="M 425 250 A 175 175 0 0 1 75 250" fill="none" />

          {/* Shield Interior Clipping Path */}
          <clipPath id={`${idPrefix}-shieldClip`}>
            <path d="M 166 138 
                     C 208 144 240 138 250 138 
                     C 260 138 292 144 334 138 
                     C 338 152 331 190 323 222 
                     C 310 274 284 328 250 374 
                     C 216 328 190 274 177 222 
                     C 169 190 162 152 166 138 Z" />
          </clipPath>
        </defs>

        {/* 1. Main Black Circular Body - completely transparent outside r=244 */}
        <circle cx="250" cy="250" r="242" fill="#08080a" />

        {/* 2. Outer Gold Ring */}
        <circle cx="250" cy="250" r="241" fill="none" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="6" />
        <circle cx="250" cy="250" r="233" fill="none" stroke={`url(#${idPrefix}-goldInner)`} strokeWidth="1.5" opacity="0.85" />

        {/* 3. Inner Gold Ring Divider */}
        <circle cx="250" cy="250" r="148" fill="none" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="4.5" />
        <circle cx="250" cy="250" r="142" fill="none" stroke={`url(#${idPrefix}-goldInner)`} strokeWidth="1.5" opacity="0.75" />

        {/* 4. Inner Circular Field */}
        <circle cx="250" cy="250" r="140" fill="#0c0d10" />

        {/* 5. Top Curved Typography: AL-RAJAA */}
        <text 
          fill={`url(#${idPrefix}-goldText)`} 
          fontSize="44" 
          fontFamily="'Times New Roman', 'Cinzel', 'Georgia', serif" 
          fontWeight="900" 
          letterSpacing="7"
        >
          <textPath href={`#${idPrefix}-topArc`} startOffset="50%" textAnchor="middle">
            AL-RAJAA
          </textPath>
        </text>

        {/* 6. Bottom Curved Typography: FOOTBALL CLUB */}
        <text 
          fill={`url(#${idPrefix}-goldText)`} 
          fontSize="31" 
          fontFamily="'Times New Roman', 'Cinzel', 'Georgia', serif" 
          fontWeight="900" 
          letterSpacing="4"
        >
          <textPath href={`#${idPrefix}-bottomArc`} startOffset="50%" textAnchor="middle">
            FOOTBALL CLUB
          </textPath>
        </text>

        {/* 7. Flanking Golden Stars (at 9 and 3 o'clock) */}
        {/* Left Star */}
        <polygon 
          points="80,250 86,244 88,235 93,243 102,243 95,249 98,258 90,253 84,258 85,249" 
          fill={`url(#${idPrefix}-goldText)`} 
          stroke="#966a15" 
          strokeWidth="0.8"
          transform="rotate(-90 91 247) translate(-10 0)" 
        />
        {/* Right Star */}
        <polygon 
          points="420,250 426,244 428,235 433,243 442,243 435,249 438,258 430,253 424,258 425,249" 
          fill={`url(#${idPrefix}-goldText)`} 
          stroke="#966a15" 
          strokeWidth="0.8"
          transform="rotate(90 431 247) translate(10 0)" 
        />

        {/* =================================================== */}
        {/* 8. CENTRAL HERALDIC SHIELD                         */}
        {/* =================================================== */}

        {/* Outer Gold Shield Border */}
        <path 
          d="M 156 128 
             C 175 135 210 128 250 128 
             C 290 128 325 135 344 128 
             C 348 144 341 184 333 218 
             C 319 272 292 330 250 384 
             C 208 330 181 272 167 218 
             C 159 184 152 144 156 128 Z" 
          fill={`url(#${idPrefix}-shieldGold)`} 
          stroke="#ffe688" 
          strokeWidth="2.5" 
        />

        {/* Inner Shield Relief Channel */}
        <path 
          d="M 163 135 
             C 183 140 213 135 250 135 
             C 287 135 317 140 337 135 
             C 340 148 334 184 326 215 
             C 313 268 288 322 250 372 
             C 212 322 187 268 174 215 
             C 166 184 160 148 163 135 Z" 
          fill="#0c0d10" 
          stroke={`url(#${idPrefix}-goldOuter)`} 
          strokeWidth="1.5" 
        />

        {/* Shield Interior Vertical Stripes (Red & Gold) */}
        <g clipPath={`url(#${idPrefix}-shieldClip)`}>
          {/* Base Gold Layer */}
          <rect x="150" y="120" width="200" height="270" fill={`url(#${idPrefix}-shieldGold)`} />

          {/* Left Red Stripe */}
          <rect x="187" y="120" width="38" height="270" fill={`url(#${idPrefix}-redStripe)`} stroke="#4a040b" strokeWidth="1" />

          {/* Right Red Stripe */}
          <rect x="275" y="120" width="38" height="270" fill={`url(#${idPrefix}-redStripe)`} stroke="#4a040b" strokeWidth="1" />
        </g>

        {/* Inner Shield Gold Rim Accent */}
        <path 
          d="M 166 138 
             C 208 144 240 138 250 138 
             C 260 138 292 144 334 138 
             C 338 152 331 190 323 222 
             C 310 274 284 328 250 374 
             C 216 328 190 274 177 222 
             C 169 190 162 152 166 138 Z" 
          fill="none" 
          stroke={`url(#${idPrefix}-goldInner)`} 
          strokeWidth="3" 
        />

        {/* =================================================== */}
        {/* 9. LAUREL WREATH (غار النصر الأخضر الملكي)            */}
        {/* =================================================== */}
        {/* Left Laurel Branch */}
        <g id={`${idPrefix}-leftBranch`}>
          <path 
            d="M 250 322 C 200 318 170 272 170 214 C 170 172 195 138 208 126" 
            fill="none" 
            stroke={`url(#${idPrefix}-goldOuter)`} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          {/* Leaves */}
          <path d="M 238 316 C 220 320 208 314 204 305 C 212 300 229 305 238 316 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 225 306 C 208 307 195 297 193 288 C 203 286 216 292 225 306 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 206 292 C 189 292 176 279 174 269 C 184 269 198 277 206 292 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 195 276 C 178 272 167 259 165 246 C 176 248 189 259 195 276 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 186 254 C 169 246 161 230 161 218 C 172 222 182 235 186 254 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 181 228 C 166 218 161 201 163 189 C 173 194 181 210 181 228 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 181 204 C 169 190 167 174 171 162 C 180 168 185 185 181 204 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 186 178 C 178 163 179 148 186 138 C 193 146 193 162 186 178 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 195 152 C 191 137 197 124 206 117 C 210 127 206 142 195 152 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
        </g>

        {/* Right Laurel Branch (Mirrored) */}
        <g id={`${idPrefix}-rightBranch`} transform="translate(500, 0) scale(-1, 1)">
          <path 
            d="M 250 322 C 200 318 170 272 170 214 C 170 172 195 138 208 126" 
            fill="none" 
            stroke={`url(#${idPrefix}-goldOuter)`} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          {/* Leaves */}
          <path d="M 238 316 C 220 320 208 314 204 305 C 212 300 229 305 238 316 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 225 306 C 208 307 195 297 193 288 C 203 286 216 292 225 306 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 206 292 C 189 292 176 279 174 269 C 184 269 198 277 206 292 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 195 276 C 178 272 167 259 165 246 C 176 248 189 259 195 276 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 186 254 C 169 246 161 230 161 218 C 172 222 182 235 186 254 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 181 228 C 166 218 161 201 163 189 C 173 194 181 210 181 228 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 181 204 C 169 190 167 174 171 162 C 180 168 185 185 181 204 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 186 178 C 178 163 179 148 186 138 C 193 146 193 162 186 178 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
          <path d="M 195 152 C 191 137 197 124 206 117 C 210 127 206 142 195 152 Z" fill={`url(#${idPrefix}-leafGrad)`} stroke="#e5b542" strokeWidth="1.2" />
        </g>

        {/* Laurel Ribbon Tie at Bottom */}
        <path 
          d="M 244 318 C 247 314 253 314 256 318 C 261 324 254 330 250 334 C 246 330 239 324 244 318 Z" 
          fill={`url(#${idPrefix}-goldOuter)`} 
          stroke="#966a15" 
          strokeWidth="1.2" 
        />

        {/* =================================================== */}
        {/* 10. SOCCER BALL (كرة القدم الذهبية مع بقع خضراء)     */}
        {/* =================================================== */}
        <g id={`${idPrefix}-soccerBall`}>
          {/* Outer Ball Body */}
          <circle 
            cx="250" 
            cy="192" 
            r="47" 
            fill={`url(#${idPrefix}-ballShading)`} 
            stroke={`url(#${idPrefix}-goldOuter)`} 
            strokeWidth="3" 
          />

          {/* Central Pentagon (Dark Green) */}
          <polygon 
            points="250,176 265,187 259,205 241,205 235,187" 
            fill="#0b3812" 
            stroke={`url(#${idPrefix}-goldOuter)`} 
            strokeWidth="2" 
          />

          {/* Seam Radiating Lines */}
          <line x1="250" y1="176" x2="250" y2="148" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="2" />
          <line x1="265" y1="187" x2="290" y2="175" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="2" />
          <line x1="259" y1="205" x2="282" y2="226" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="2" />
          <line x1="241" y1="205" x2="218" y2="226" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="2" />
          <line x1="235" y1="187" x2="210" y2="175" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="2" />

          {/* Peripheral Dark Green Patches */}
          <polygon points="250,148 270,154 282,147 250,145 218,147 230,154" fill="#0b3812" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.8" />
          <polygon points="290,175 295,193 297,180 287,163 278,157 283,167" fill="#0b3812" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.8" />
          <polygon points="282,226 270,236 287,233 294,216 288,208" fill="#0b3812" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.8" />
          <polygon points="218,226 230,236 213,233 206,216 212,208" fill="#0b3812" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.8" />
          <polygon points="210,175 205,193 203,180 213,163 222,157 217,167" fill="#0b3812" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.8" />

          {/* Facet Hexagonal Connector Seams */}
          <line x1="250" y1="148" x2="270" y2="154" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="270" y1="154" x2="290" y2="175" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="290" y1="175" x2="295" y2="206" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="295" y1="206" x2="282" y2="226" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="282" y1="226" x2="250" y2="239" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="250" y1="239" x2="218" y2="226" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="218" y1="226" x2="205" y2="206" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="205" y1="206" x2="210" y2="175" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="210" y1="175" x2="230" y2="154" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
          <line x1="230" y1="154" x2="250" y2="148" stroke={`url(#${idPrefix}-goldOuter)`} strokeWidth="1.6" />
        </g>
      </svg>
    </div>
  );
};
