"use client";

import { useLang } from "@/lib/i18n";
import { STYLE } from "@/data/site";
import { VerticalText } from "@/components/modular/VerticalText";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";

export default function Fun() {
  const { t } = useLang();

  return (
    <section id="fun" className="home-bento-section">
      <TechnicalGrid className="opacity-20" />
      <div className="style-file-grid relative z-10">
        <div className="style-title win-window win-window--ink">
          <WinTitleBar label="STYLE.SYS" />
          <div className="win-body">
            <div className="flex items-center justify-between">
              <SystemLabel>STYLE FILE / BRAND BOOK 03</SystemLabel>
              <CrossMark />
            </div>
            <h2 className="display mt-8 text-[clamp(3.5rem,7.5vw,7rem)] leading-[0.8]">CHAOS MUST BE READABLE.</h2>
          </div>
        </div>

        <div className="style-blue win-window win-window--ink bg-ink text-paper">
          <WinTitleBar label="COLOR01.DAT" />
          <div className="win-body flex flex-col justify-between">
            <span className="display text-[clamp(2.3rem,4vw,4rem)]">#0647FF</span>
            <Barcode className="text-paper" />
          </div>
        </div>

        <div className="style-paper win-window win-window--ink bg-paper">
          <WinTitleBar label="COLOR02.DAT" />
          <div className="win-body flex flex-col justify-between">
            <span className="display text-[clamp(2rem,3vw,3rem)]">#F7F6EF</span>
            <CrossMark />
          </div>
        </div>

        <div className="style-type win-window win-window--ink">
          <WinTitleBar label="TYPE.FNT" />
          <div className="win-body">
            <SystemLabel>TYPE / ARCHIVO</SystemLabel>
            <p className="display mt-6 text-[clamp(2.5rem,5vw,5rem)] leading-[0.82]">Aa 01 / AB</p>
            <SystemLabel className="mt-4 block">DISPLAY / SANS / MONO</SystemLabel>
          </div>
        </div>

        <div className="style-asset win-window win-window--ink bg-ink text-paper">
          <WinTitleBar label="SPECIMEN.FNT" />
          <div className="win-body relative min-h-72 flex-1 overflow-hidden">
            <div className="flex h-[calc(100%-5rem)] flex-col justify-center">
              <span className="display block text-[clamp(6rem,13vw,12rem)] leading-[0.7]">Aa</span>
              <span className="display mt-4 block text-[clamp(2.4rem,5vw,4.5rem)] leading-none opacity-65">
                012345
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 border border-paper">
              {["48", "96", "144"].map((size) => (
                <SystemLabel key={size} className="border-r border-paper p-2 text-center last:border-r-0">
                  {size} PX
                </SystemLabel>
              ))}
            </div>
          </div>
        </div>

        <div className="style-rules win-window win-window--ink">
          <WinTitleBar label="RULES.DAT" />
          <div className="win-body">
            {STYLE.rules.map((rule, index) => (
              <div key={rule.name.en} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-ink p-4 last:border-b-0">
                <SystemLabel className="opacity-85">0{index + 1}</SystemLabel>
                <div>
                  <h3 className="display text-2xl">{t(rule.name)}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed">{t(rule.note)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="style-tokens win-window win-window--ink">
          <WinTitleBar label="TOKENS.DAT" />
          <div className="win-body flex flex-wrap content-start gap-2">
            <SystemLabel className="mb-3 w-full">TOKENS / {t(STYLE.system.ratio)}</SystemLabel>
            {["NO TEMPLATES", ...STYLE.system.tokens, "HALFTONE", "GRID", "MARKS"].map((token) => (
              <span key={token} className="u-label border border-ink px-3 py-2">{token}</span>
            ))}
          </div>
        </div>

        <div className="style-vertical flex items-center justify-center border border-ink">
          <VerticalText>BLUE / PAPER / TYPE / NOISE / SYSTEM</VerticalText>
        </div>
      </div>
    </section>
  );
}
