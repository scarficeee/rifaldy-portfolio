type Variant =
  | "hero"
  | "profile"
  | "index"
  | "journey"
  | "grid"
  | "career"
  | "case"
  | "archive"
  | "contact";
/** Decorative local vectors: no images, runtime animation loop, or layout space. */
export function SectionArt({ variant }: { variant: Variant }) {
  return (
    <div className={`section-art art-${variant}`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        {variant === "hero" && (
          <>
            <circle className="art-disc" cx="850" cy="170" r="110" />
            <path d="M1080 70C640 40 790 400 570 500S220 610 50 740M1120 120C720 75 850 430 620 545S260 660 110 770" />
            <path d="M760 0V700M0 560H1000" className="art-guide" />
            <circle cx="880" cy="315" r="250" />
          </>
        )}
        {variant === "profile" && (
          <>
            <path d="M1010 690C660 680 540 440 760 340S980 100 850-40M1060 690C710 680 590 450 810 350S1030 100 900-40" />
            <path d="M52 52H80M66 38V66M920 626H948M934 612V640" />
          </>
        )}
        {variant === "journey" && (
          <>
            <path d="M-50 540C160 100 540 790 1050 110M-50 560C180 140 550 810 1050 140" />
            <circle cx="850" cy="250" r="170" />
            <path d="M100 0V700M500 0V700M900 0V700" className="art-guide" />
          </>
        )}
        {variant === "index" && (
          <>
            <path d="M850 0V700M870 0V700" className="art-guide" />
            <path d="M935 65H965M950 50V80M35 630H65M50 615V645" />
          </>
        )}
        {variant === "grid" && (
          <>
            <path
              d="M150 0V700M350 0V700M550 0V700M750 0V700M950 0V700M0 180H1000M0 380H1000M0 580H1000"
              className="art-guide"
            />
            <circle cx="940" cy="60" r="32" />
          </>
        )}
        {variant === "career" && (
          <>
            <path d="M1000 0C650 120 990 300 780 480S760 690 700 760M1040 0C690 120 1030 300 820 480S800 690 740 760" />
            <path d="M60 0V700" className="art-guide" />
          </>
        )}
        {(variant === "case" || variant === "contact") && (
          <>
            <circle cx="930" cy="640" r="370" />
            <circle cx="930" cy="640" r="320" />
            <circle cx="930" cy="640" r="270" />
            <path d="M0 90H1000M850 0V700" className="art-guide" />
          </>
        )}
        {variant === "archive" && (
          <>
            <path d="M780 700V180a150 150 0 01300 0v520M810 700V180a120 120 0 01240 0v520" />
            <path d="M40 80H68M54 66V94" />
          </>
        )}
      </svg>
    </div>
  );
}
