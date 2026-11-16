import { type HomePageContent } from "@/content/home/types";

type AppPreviewProps = {
  flow: HomePageContent["flow"];
};

const TASK_W = 116;
const TASK_H = 46;

function Task({ x, y, label, active = false }: { x: number; y: number; label: string; active?: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={TASK_W}
        height={TASK_H}
        rx={8}
        fill={active ? "rgba(129,131,255,0.12)" : "#141417"}
        stroke={active ? "#8183ff" : "rgba(255,255,255,0.22)"}
        strokeWidth={active ? 1.5 : 1}
      />
      <text
        x={x + TASK_W / 2}
        y={y + TASK_H / 2 + 4}
        textAnchor="middle"
        fontSize={11.5}
        fontWeight={500}
        fill="#ededf0"
      >
        {label}
      </text>
    </g>
  );
}

/**
 * A still of the app: the process panel on the left and the generated BPMN map on the
 * dotted canvas, drawn in the app's colours. Purely decorative, so it is aria-hidden and the
 * same information is in the text around it.
 */
export function AppPreview({ flow }: AppPreviewProps) {
  const d = flow.diagram;
  const laneA = 70;
  const laneB = 190;

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-line-strong bg-panel shadow-[0_24px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.03)]"
    >
      {/* app top bar */}
      <div className="flex h-10 items-center justify-between border-b border-line px-3.5">
        <div className="flex items-center gap-2.5">
          <span className="brand-mark" />
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-fg">BPMN.Gen</span>
          <span className="ml-2 hidden rounded-md bg-hover px-2 py-0.5 text-[12px] text-fg sm:inline">{flow.eyebrow}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-0.5 text-[11.5px] text-fg-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {flow.outputBadge}
        </span>
      </div>

      <div className="grid md:grid-cols-[230px_minmax(0,1fr)]">
        {/* process panel */}
        <div className="hidden flex-col gap-3 border-r border-line bg-panel p-3.5 md:flex">
          <div>
            <p className="mb-1.5 text-[11px] font-medium text-fg-3">{flow.inputLabel}</p>
            <div className="rounded-[7px] border border-line-strong bg-input px-2.5 py-2 text-[12px] leading-[1.5] text-fg-2">
              {flow.inputText}
            </div>
          </div>
          <ol className="space-y-1.5">
            {flow.steps.map((step, index) => (
              <li
                key={step.title}
                className={`flex items-start gap-2 rounded-[7px] border px-2.5 py-2 text-[12px] leading-[1.4] ${
                  index === 1 ? "border-accent/40 bg-accent/10 text-fg" : "border-line bg-card text-fg-2"
                }`}
              >
                <span
                  className={`mt-px flex h-4 w-4 flex-none items-center justify-center rounded font-mono text-[10px] ${
                    index === 1 ? "bg-accent-strong text-white" : "bg-raised text-fg-3"
                  }`}
                >
                  {index + 1}
                </span>
                {step.title}
              </li>
            ))}
          </ol>
        </div>

        {/* map canvas */}
        <div className="canvas-dots p-3 sm:p-5">
          <svg viewBox="0 0 650 262" className="block h-auto w-full" fontFamily="var(--font-sans)">
            <defs>
              <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" fill="#80808b" />
              </marker>
            </defs>

            {/* pool with two lanes */}
            <rect x={6} y={10} width={638} height={240} rx={6} fill="rgba(17,17,19,0.85)" stroke="rgba(255,255,255,0.16)" />
            <line x1={34} y1={130} x2={644} y2={130} stroke="rgba(255,255,255,0.12)" />
            <line x1={34} y1={10} x2={34} y2={250} stroke="rgba(255,255,255,0.12)" />
            <text x={20} y={laneA} transform={`rotate(-90 20 ${laneA})`} textAnchor="middle" fontSize={11} fill="#b5b5bd">
              {d.laneA}
            </text>
            <text x={20} y={laneB} transform={`rotate(-90 20 ${laneB})`} textAnchor="middle" fontSize={11} fill="#b5b5bd">
              {d.laneB}
            </text>

            {/* flows */}
            <g stroke="#80808b" strokeWidth={1.2} fill="none" markerEnd="url(#arrow)">
              <path d={`M85 ${laneA} H106`} />
              <path d={`M222 ${laneA} H244 V${laneB} H262`} />
              <path d={`M378 ${laneB} H402`} />
              <path d={`M424 ${laneB - 22} V${laneA} H452`} />
              <path d={`M568 ${laneA} H584`} />
              <path d={`M446 ${laneB} H584`} />
            </g>
            <text x={430} y={112} fontSize={10.5} fill="#80808b">
              {d.yes}
            </text>
            <text x={470} y={184} fontSize={10.5} fill="#80808b">
              {d.no}
            </text>

            {/* start event */}
            <circle cx={70} cy={laneA} r={14} fill="#141417" stroke="#3ecf8e" strokeWidth={1.6} />

            <Task x={106} y={laneA - TASK_H / 2} label={d.submit} />
            <Task x={262} y={laneB - TASK_H / 2} label={d.review} active />

            {/* exclusive gateway */}
            <g>
              <rect
                x={424 - 16}
                y={laneB - 16}
                width={32}
                height={32}
                transform={`rotate(45 424 ${laneB})`}
                fill="#141417"
                stroke="rgba(255,255,255,0.3)"
              />
              <path d={`M418 ${laneB - 6} L430 ${laneB + 6} M430 ${laneB - 6} L418 ${laneB + 6}`} stroke="#b5b5bd" strokeWidth={1.6} />
              <text x={424} y={laneB + 42} textAnchor="middle" fontSize={10.5} fill="#b5b5bd">
                {d.approved}
              </text>
            </g>

            <Task x={452} y={laneA - TASK_H / 2} label={d.notify} />

            {/* end events */}
            <circle cx={598} cy={laneA} r={14} fill="#141417" stroke="#f2555a" strokeWidth={3} />
            <circle cx={598} cy={laneB} r={14} fill="#141417" stroke="#f2555a" strokeWidth={3} />
          </svg>
        </div>
      </div>

      {/* status bar */}
      <div className="flex h-8 items-center gap-2 border-t border-line px-3.5 text-[11.5px] text-fg-3">
        <span className="font-mono">{flow.outputLabel}</span>
        <span className="text-fg-2">{flow.outputText}</span>
      </div>
    </div>
  );
}
