/* ---------- Procedural Cartoon Bible-Character Avatars (No Jesus depictions) ---------- */
export function Buddy({ who, size = 64 }) {
  const defaultCfg = { skin: "#e8b98a", hair: "curly", hairColor: "#7a5230", beard: null, robe: "#8a6bbf", brow: "#5c3d21" };
  
  const cfg = {
    // Apostles & NT figures
    paul:      { skin: "#e8b98a", hair: null,    hairColor: "#7a5230", beard: "#7a5230", robe: "#8a6bbf", brow: "#5c3d21" },
    john:      { skin: "#e3ac7e", hair: "side",  hairColor: "#cfcac0", beard: "#e8e4dc", robe: "#3e7cb1", brow: "#8f887b" },
    peter:     { skin: "#dc9f6e", hair: "curly", hairColor: "#c2bcaf", beard: "#d6d0c4", robe: "#1d3557", brow: "#787267" },
    luke:      { skin: "#e4b489", hair: "side",  hairColor: "#593d2b", beard: null,      robe: "#2a9d8f", brow: "#42281a" },
    matthew:   { skin: "#e1af83", hair: "curly", hairColor: "#432f21", beard: "#432f21", robe: "#457b9d", brow: "#2e1e14" },
    mark:      { skin: "#e6ba94", hair: "side",  hairColor: "#6b4226", beard: null,      robe: "#e76f51", brow: "#472813" },
    james:     { skin: "#e7b78c", hair: "side",  hairColor: "#533e2d", beard: "#533e2d", robe: "#606c38", brow: "#38271a" },
    timothy:   { skin: "#ebd0b5", hair: "curly", hairColor: "#6b4a2d", beard: null,      robe: "#588157", brow: "#4a321d" },
    barnabas:  { skin: "#dfb28c", hair: "side",  hairColor: "#8c6547", beard: "#8c6547", robe: "#d4a373", brow: "#5c3e29" },
    stephen:   { skin: "#ecd5be", hair: "side",  hairColor: "#4a3b32", beard: null,      robe: "#4361ee", brow: "#33261e" },
    philip:    { skin: "#e3b38c", hair: "curly", hairColor: "#543d2b", beard: null,      robe: "#3a86ff", brow: "#382619" },
    lydia:     { skin: "#eac09a", hair: "wrap",  hairColor: "#3d2b1f", beard: null,      robe: "#7209b7", brow: "#261910", wrap: "#9d4edd" },

    // OT Patriarchs, Kings & Prophets
    david:     { skin: "#eec39a", hair: "curly", hairColor: "#a1552e", beard: null,      robe: "#c14953", brow: "#7c3f21" },
    solomon:   { skin: "#deb887", hair: "crown", hairColor: "#3a2e2b", beard: "#3a2e2b", robe: "#7b2cbf", brow: "#241e1c" },
    moses:     { skin: "#dfa878", hair: "side",  hairColor: "#efece4", beard: "#f4f1ea", robe: "#946b3d", brow: "#b8b2a5" },
    joshua:    { skin: "#d89d6a", hair: "curly", hairColor: "#4b382a", beard: "#4b382a", robe: "#b08d57", brow: "#33241a" },
    samuel:    { skin: "#eed2b8", hair: "headband", hairColor: "#4d3319", beard: null,   robe: "#52b788", brow: "#33200d", band: "#2d6a4f" },
    abraham:   { skin: "#dc9c68", hair: "side",  hairColor: "#f5f3ef", beard: "#faf8f5", robe: "#9b2226", brow: "#bbb5ab" },
    noah:      { skin: "#d99e6e", hair: "side",  hairColor: "#e5e3dc", beard: "#eceae3", robe: "#0077b6", brow: "#a6a297" },
    joseph:    { skin: "#e8be96", hair: "curly", hairColor: "#59371f", beard: null,      robe: "#ffb703", brow: "#382111" },
    elijah:    { skin: "#d69864", hair: "curly", hairColor: "#3a2618", beard: "#3a2618", robe: "#6f4e37", brow: "#24160c" },
    isaiah:    { skin: "#dfb088", hair: "side",  hairColor: "#e0ded9", beard: "#edeae3", robe: "#2b593f", brow: "#8a857b" },
    jeremiah:  { skin: "#e3ad81", hair: "side",  hairColor: "#d3cec4", beard: "#ded9cf", robe: "#588157", brow: "#706a5f" },
    daniel:    { skin: "#e8bd95", hair: "curly", hairColor: "#3b2b20", beard: null,      robe: "#3f37c9", brow: "#261912" },
    nehemiah:  { skin: "#daa06d", hair: "curly", hairColor: "#3d2b1f", beard: "#3d2b1f", robe: "#bc6c25", brow: "#291a11" },
    micah:     { skin: "#dfa777", hair: "curly", hairColor: "#4e3524", beard: "#4e3524", robe: "#9c6644", brow: "#362114" },
    job:       { skin: "#ddaa7d", hair: "side",  hairColor: "#f0ede6", beard: "#f8f5ee", robe: "#6c757d", brow: "#999285" },
    psalmist:  { skin: "#e6b285", hair: "curly", hairColor: "#4a3524", beard: "#4a3524", robe: "#5c8a3a", brow: "#33241a" },
    gideon:    { skin: "#d9a16f", hair: "side",  hairColor: "#473322", beard: "#473322", robe: "#c77dff", brow: "#2b1c11" },
    caleb:     { skin: "#d79966", hair: "curly", hairColor: "#8f8b82", beard: "#a39f96", robe: "#b56576", brow: "#66635c" },

    // Story Sequencer figures
    jacob:     { skin: "#e6b98d", hair: "curly", hairColor: "#5b3d26", beard: "#5b3d26", robe: "#457b9d", brow: "#3a2617" },
    elisha:    { skin: "#dca878", hair: "side",  hairColor: "#cfc9bd", beard: "#e0dbd0", robe: "#6f4e37", brow: "#8f887b" },
    jonah:     { skin: "#e2b083", hair: "curly", hairColor: "#4a3524", beard: "#4a3524", robe: "#0096c7", brow: "#33241a" },
    abednego:  { skin: "#d99a63", hair: "curly", hairColor: "#2f2218", beard: null,      robe: "#e9a13b", brow: "#1f150e" },
    john_baptist: { skin: "#d89f6c", hair: "curly", hairColor: "#3a2618", beard: "#3a2618", robe: "#946b3d", brow: "#24160c" },

    // Writers scripture does not name — drawn as what they are
    chronicler: { skin: "#e0ab7f", hair: "side", hairColor: "#cfc9bd", beard: "#ded9cf", robe: "#7f5539", brow: "#8f887b" },
    sons_of_korah: { skin: "#e4b087", hair: "headband", hairColor: "#382315", beard: null, robe: "#2a9d8f", brow: "#21130a", band: "#ffd166" },
    hebrews_writer: { skin: "#dfb088", hair: "wrap", hairColor: "#3b281c", beard: null, robe: "#6c757d", brow: "#26180e", wrap: "#adb5bd" },

    // Women of Faith
    esther:    { skin: "#ebd0b9", hair: "crown", hairColor: "#2b1e17", beard: null,      robe: "#0096c7", brow: "#1a100a", crown: "#ffd166" },
    ruth:      { skin: "#e2b188", hair: "wrap",  hairColor: "#3b281c", beard: null,      robe: "#d4a373", brow: "#24170e", wrap: "#e09f3e" },
    miriam:    { skin: "#e4b087", hair: "headband", hairColor: "#382315", beard: null,   robe: "#06d6a0", brow: "#21130a", band: "#f72585" },
    deborah:   { skin: "#e0ac81", hair: "headband", hairColor: "#523620", beard: null,   robe: "#118ab2", brow: "#331f11", band: "#ffd166" },
    hannah:    { skin: "#e6ba94", hair: "wrap",  hairColor: "#422e1f", beard: null,      robe: "#e07a5f", brow: "#26180e", wrap: "#f4a261" },
    martha:    { skin: "#e3af85", hair: "side",  hairColor: "#38281d", beard: null,      robe: "#8338ec", brow: "#21150c" },
    mary_b:    { skin: "#eed0b6", hair: "wrap",  hairColor: "#332216", beard: null,      robe: "#48cae4", brow: "#1f120a", wrap: "#90e0ef" },
  }[who] || defaultCfg;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {/* Robe / Shoulders */}
      <path d="M18 100 Q18 70 50 70 Q82 70 82 100 Z" fill={cfg.robe} />
      <path d="M42 72 L50 84 L58 72 Z" fill="#fdfaf1" opacity="0.85" />
      
      {/* Head */}
      <circle cx="50" cy="44" r="24" fill={cfg.skin} />
      
      {/* Hair Styles */}
      {cfg.hair === "side" && (
        <path d="M26 44 Q24 20 50 20 Q76 20 74 44 Q74 32 66 28 Q60 36 34 34 Q28 36 26 44 Z" fill={cfg.hairColor} />
      )}
      
      {cfg.hair === "curly" && (
        <g fill={cfg.hairColor}>
          <circle cx="32" cy="32" r="8" /><circle cx="42" cy="26" r="8" />
          <circle cx="52" cy="24" r="8" /><circle cx="62" cy="27" r="8" />
          <circle cx="70" cy="34" r="7" />
        </g>
      )}
      
      {cfg.hair === "crown" && (
        <g>
          <path d="M28 36 Q26 22 50 22 Q74 22 72 36 Z" fill={cfg.hairColor} />
          {/* Golden Crown */}
          <polygon points="30,28 35,16 43,24 50,14 57,24 65,16 70,28" fill={cfg.crown || "#ffd166"} stroke="#d49b10" strokeWidth="1.5" />
          <circle cx="50" cy="18" r="2.2" fill="#e63946" />
        </g>
      )}

      {cfg.hair === "headband" && (
        <g>
          <path d="M26 42 Q24 20 50 20 Q76 20 74 42 Q70 30 30 30 Z" fill={cfg.hairColor} />
          {/* Colorful Headband */}
          <path d="M26 34 Q50 26 74 34" stroke={cfg.band} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}

      {cfg.hair === "wrap" && (
        <g>
          {/* Soft Drape / Veil */}
          <path d="M24 44 Q22 18 50 18 Q78 18 76 44 Q78 68 72 74 Q50 68 28 74 Q22 68 24 44 Z" fill={cfg.wrap} opacity="0.95" />
          <path d="M30 36 Q50 28 70 36" stroke="#fdfaf1" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M32 30 Q50 24 68 30 Q50 20 32 30 Z" fill={cfg.hairColor} />
        </g>
      )}

      {/* Beard */}
      {cfg.beard && (
        <path d="M30 48 Q30 74 50 76 Q70 74 70 48 Q66 58 50 58 Q34 58 30 48 Z" fill={cfg.beard} />
      )}

      {/* Eyes & Eyebrows */}
      <circle cx="41" cy="43" r="2.8" fill="#33241a" />
      <circle cx="59" cy="43" r="2.8" fill="#33241a" />
      <path d="M35 36 q6 -4 10 -1" stroke={cfg.brow} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M55 35 q6 -3 10 1" stroke={cfg.brow} strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* Cheerful Smile */}
      <path d={cfg.beard ? "M43 54 q7 5 14 0" : "M42 54 q8 7 16 0"} stroke="#8a4b2f" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* Rosy Cheeks */}
      <circle cx="35" cy="50" r="3.4" fill="#e88b6a" opacity="0.45" />
      <circle cx="65" cy="50" r="3.4" fill="#e88b6a" opacity="0.45" />
    </svg>
  );
}
