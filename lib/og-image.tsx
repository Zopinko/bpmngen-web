import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Share image (PNG) in the app's look: graphite card, brand mark, headline, mini process. */
export function renderOgImage({ title, tagline, steps }: { title: string; tagline: string; steps: string[] }) {
  const node = (label: string, active = false) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 214,
        height: 64,
        borderRadius: 12,
        border: active ? "2px solid #8183ff" : "2px solid rgba(255,255,255,0.18)",
        background: active ? "rgba(129,131,255,0.14)" : "#141417",
        color: "#ededf0",
        fontSize: 22,
      }}
    >
      {label}
    </div>
  );
  const arrow = <div style={{ display: "flex", width: 44, height: 2, background: "#80808b" }} />;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#0b0b0d",
          backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(129,131,255,0.22), rgba(11,11,13,0) 70%)",
          color: "#ededf0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 11,
              background: "#8183ff",
            }}
          >
            <div style={{ display: "flex", width: 20, height: 20, borderRadius: 3, background: "#0b0b0d" }} />
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>BPMN.Gen</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#b5b5bd" }}>{tagline}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{ display: "flex", width: 34, height: 34, borderRadius: 17, border: "3px solid #3ecf8e" }} />
          {arrow}
          {node(steps[0])}
          {arrow}
          {node(steps[1], true)}
          {arrow}
          {node(steps[2])}
          {arrow}
          <div style={{ display: "flex", width: 34, height: 34, borderRadius: 17, border: "5px solid #f2555a" }} />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
