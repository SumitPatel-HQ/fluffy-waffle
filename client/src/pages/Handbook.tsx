import React, { useEffect } from 'react';
import { Download, AlertTriangle, Zap, Sword, Shield, Trophy } from 'lucide-react';
import { 
  MangaPage, 
  MangaPanel, 
  MangaHeader, 
  SpeechBubble,
  ActionText
} from '@/components/MangaComponents';

import heroImage from '@assets/WhatsApp_Image_2026-03-10_at_12.45.48_1773127116343.jpeg';

export default function Handbook() {
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-8 print:py-0 print:bg-white overflow-x-hidden font-body text-black">
      
      {/* Floating Action Button - Hidden in Print */}
      <button 
        onClick={handlePrint}
        className="print-hide fixed bottom-6 right-6 z-50 bg-red-600 text-white font-display text-2xl px-6 py-4 rounded-full manga-border manga-shadow-lg hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_#000] active:translate-y-2 active:shadow-none transition-all flex items-center gap-3"
      >
        <Download size={24} strokeWidth={3} />
        DOWNLOAD / PRINT PDF
      </button>

      {/* PAGE 1: COVER */}
      <MangaPage>
        <div className="absolute inset-0 speed-lines-burst opacity-10 pointer-events-none"></div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div className="pt-8 pb-4 z-10">
            <MangaHeader 
              text="HACKATHON" 
              subtitle="GLOBAL PARTICIPANT RULES"
            />
            <div className="text-center mt-2">
              <span className="font-display text-8xl text-red-600 text-shadow-solid text-stroke-black block transform rotate-2">
                2025
              </span>
            </div>
          </div>

          <MangaPanel className="flex-1 my-4 p-2 bg-black" angled>
            {/* Asset Image Placeholder */}
            <div className="w-full h-full relative border-4 border-white bg-zinc-900 overflow-hidden group">
              <img 
                src={heroImage} 
                alt="Hackathon Hero" 
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Screentone overlay for that manga feel over the image */}
              <div className="absolute inset-0 screentone-dots-light mix-blend-overlay"></div>
            </div>
            <SpeechBubble text="READ CAREFULLY!" position="bottom-right" className="-mr-8 -mb-8" />
          </MangaPanel>

          <div className="text-center z-10 pb-4">
            <p className="font-manga text-xl bg-yellow-400 inline-block px-4 py-2 border-2 border-black transform -rotate-1">
              VOL. 1: THE AWAKENING
            </p>
          </div>
        </div>
      </MangaPage>

      {/* PAGE 2: TABLE OF CONTENTS */}
      <MangaPage>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="mb-6">
          <MangaHeader text="CONTENTS" align="left" className="ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <MangaPanel screentone="light" className="p-6 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-600" size={32} />
              <h2 className="font-display text-4xl">MISSION LOG</h2>
            </div>
            <ul className="space-y-3 font-bold text-lg sm:text-xl">
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>01. Registration & Eligibility</span>
                <span className="font-display text-red-600 text-2xl">PG.3</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>02. Devices & Setup</span>
                <span className="font-display text-red-600 text-2xl">PG.3</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>03. Project Development</span>
                <span className="font-display text-red-600 text-2xl">PG.3</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>04. Submission Requirements</span>
                <span className="font-display text-red-600 text-2xl">PG.3</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>05. AI Tools & Prompts</span>
                <span className="font-display text-red-600 text-2xl">PG.4</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>06. Event Rounds</span>
                <span className="font-display text-red-600 text-2xl">PG.4</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>07. Attendance & Conduct</span>
                <span className="font-display text-red-600 text-2xl">PG.4</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>08. Fair Play & Integrity</span>
                <span className="font-display text-red-600 text-2xl">PG.4</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>09. Judging & Authority</span>
                <span className="font-display text-red-600 text-2xl">PG.5</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>10. Safety & Responsibility</span>
                <span className="font-display text-red-600 text-2xl">PG.5</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>11. Disqualification Conditions</span>
                <span className="font-display text-red-600 text-2xl">PG.5</span>
              </li>
            </ul>
          </MangaPanel>

          <MangaPanel className="bg-red-600 text-white flex items-center justify-center p-6 min-h-[150px]">
            <ActionText text="NO EXCUSES!" className="text-white text-stroke-black" />
          </MangaPanel>
          
          <MangaPanel screentone="dense" className="flex items-center justify-center p-6 min-h-[150px]">
            <h3 className="font-display text-5xl bg-white px-4 py-2 border-4 border-black transform rotate-3">
              KNOWLEDGE IS POWER!
            </h3>
          </MangaPanel>
        </div>
      </MangaPage>

      {/* PAGE 3: RULES 1-4 */}
      <MangaPage>
        <div className="grid grid-cols-2 grid-rows-[auto_1fr_1fr] gap-3 h-full">
          
          {/* Header row */}
          <div className="col-span-2 pb-2 border-b-8 border-black">
            <h2 className="font-display text-5xl tracking-widest">CHAPTER 1: THE FOUNDATION</h2>
          </div>

          {/* Rule 1 - Wide */}
          <MangaPanel className="col-span-2 p-5" angled>
            <div className="flex items-start gap-4">
              <span className="font-display text-6xl text-stroke-black text-shadow-solid text-white -mt-2">01</span>
              <div>
                <h3 className="font-display text-3xl text-red-600 mb-2">Registration & Eligibility</h3>
                <p className="font-bold text-lg leading-snug">
                  All hackers must be officially registered. You can enter as a lone wolf or assemble a squad of up to 4 members! No mercenaries allowed mid-hack. Form your alliances before the clock starts ticking.
                </p>
              </div>
            </div>
            <SpeechBubble text="SQUAD UP!" position="top-right" className="-mt-6" />
          </MangaPanel>

          {/* Rule 2 - Half */}
          <MangaPanel className="col-span-1 p-4 bg-black text-white">
            <h3 className="font-display text-3xl mb-2 text-yellow-400">02. Devices & Setup</h3>
            <p className="font-bold leading-snug text-gray-200">
              Bring your own rig! Laptops, mechanical keyboards, VR headsets—weaponize your desk. Organizers provide power and Wi-Fi, but your hardware is your responsibility. Protect it!
            </p>
            <div className="absolute bottom-2 right-2 text-yellow-400 opacity-50">
              <Zap size={48} />
            </div>
          </MangaPanel>

          {/* Rule 3 - Half */}
          <MangaPanel screentone="light" className="col-span-1 p-4 relative">
            <h3 className="font-display text-3xl mb-2 text-stroke-white text-shadow-solid">03. Project Dev</h3>
            <p className="font-bold leading-snug bg-white/90 p-2 border-2 border-black">
              Code must be written <b>during</b> the hackathon! Using pre-built projects is a critical offense. Open-source libraries, frameworks, and public APIs are your allies—use them wisely!
            </p>
          </MangaPanel>

          {/* Rule 4 - Wide */}
          <MangaPanel className="col-span-2 p-5">
            <div className="flex items-start gap-4">
              <span className="font-display text-6xl text-stroke-black text-shadow-solid text-red-600 -mt-2">04</span>
              <div>
                <h3 className="font-display text-3xl mb-2">Submission Requirements</h3>
                <p className="font-bold text-lg leading-snug">
                  To conquer the event, your squad must submit: a working demo, a link to the public GitHub repo, and a killer pitch video (max 3 minutes). If it crashes during the live demo, call it an "unexpected feature" and pitch through it!
                </p>
              </div>
            </div>
          </MangaPanel>
        </div>
      </MangaPage>

      {/* PAGE 4: RULES 5-8 */}
      <MangaPage>
        <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
          
          {/* Header */}
          <div className="col-span-3 pb-2 border-b-8 border-black flex items-center justify-between">
            <h2 className="font-display text-5xl tracking-widest">CHAPTER 2: THE GRIND</h2>
            <Sword size={40} className="text-black" />
          </div>

          {/* Rule 5 - Tall Left */}
          <MangaPanel className="col-span-1 row-span-3 p-4 bg-yellow-400">
            <div className="flex flex-col h-full">
              <span className="font-display text-7xl text-stroke-black text-white text-shadow-solid mb-2">05</span>
              <h3 className="font-display text-4xl mb-4 leading-none">AI Tools & Logging</h3>
              <div className="flex-1 font-bold text-lg leading-snug border-t-4 border-black pt-4">
                <p className="mb-4">
                  AI is a sidekick, not the hero! You may use GenAI tools (ChatGPT, Copilot, Cursor).
                </p>
                <p className="bg-black text-white p-3 transform -rotate-1">
                  CRITICAL: You must log your prompts! If an AI writes it, you must be able to explain how it works. Ignorance is not an excuse.
                </p>
              </div>
            </div>
          </MangaPanel>

          {/* Rule 6 - Top Right */}
          <MangaPanel screentone="dense" className="col-span-2 row-span-1 p-4 flex items-center gap-4">
            <div className="bg-white border-4 border-black p-3 flex-1 transform rotate-1">
              <h3 className="font-display text-3xl mb-1 text-red-600">06. Event Rounds</h3>
              <p className="font-bold leading-tight">
                Round 1: Code Red (Development phase). Round 2: Final Boss (Judging phase). Survive the gauntlet, present your project, and advance to glory!
              </p>
            </div>
            <Trophy size={64} className="text-black drop-shadow-[4px_4px_0_#FFF]" />
          </MangaPanel>

          {/* Rule 7 - Mid Right */}
          <MangaPanel className="col-span-2 row-span-1 p-4" angled>
            <h3 className="font-display text-3xl mb-2">07. Attendance & Venue</h3>
            <p className="font-bold text-lg leading-snug">
              Be physically present (or verified online for remote tracks). Keep your station clean! Respect the venue—do not sleep on tables with food, and drink plenty of water. Stay hydrated to maintain your hacking aura!
            </p>
          </MangaPanel>

          {/* Rule 8 - Bottom Right */}
          <MangaPanel className="col-span-2 row-span-1 p-4 bg-red-600 text-white">
            <h3 className="font-display text-3xl mb-2 text-stroke-black text-shadow-solid">08. Fair Play & Integrity</h3>
            <p className="font-bold text-lg leading-snug">
              Academic integrity is absolute. Sabotaging other teams' hardware, networks, or repositories will result in an instant, unappealable banish to the shadow realm.
            </p>
            <SpeechBubble text="NO CHEATING!" position="bottom-right" className="-mb-10 -mr-6" />
          </MangaPanel>
        </div>
      </MangaPage>

      {/* PAGE 5: RULES 9-11 */}
      <MangaPage>
        <div className="grid grid-cols-2 grid-rows-[auto_1fr_1fr_1fr] gap-4 h-full">
          
          {/* Header */}
          <div className="col-span-2 pb-2 border-b-8 border-black">
            <h2 className="font-display text-5xl tracking-widest text-right">CHAPTER 3: FINAL JUDGMENT</h2>
          </div>

          {/* Rule 9 */}
          <MangaPanel className="col-span-2 p-5">
            <div className="flex gap-6 items-center">
              <div className="text-center">
                <span className="font-display text-7xl text-stroke-black text-shadow-solid text-white block">09</span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-3xl mb-2 text-red-600">Judging & Organizer Authority</h3>
                <p className="font-bold text-lg leading-snug">
                  The Judges' word is absolute law. Projects will be evaluated on Impact, Technical Depth, Innovation, and Presentation. Impress them with your sheer hacker protagonist willpower. Organizers reserve the right to alter rules if the timeline shatters.
                </p>
              </div>
            </div>
          </MangaPanel>

          {/* Rule 10 & 11 Side by Side */}
          <MangaPanel screentone="light" className="col-span-1 p-4 flex flex-col justify-center relative" angled>
            <Shield size={48} className="absolute top-2 right-2 text-black opacity-20" />
            <h3 className="font-display text-3xl mb-3 text-stroke-white text-shadow-solid">10. Safety & Responsibility</h3>
            <p className="font-bold text-lg bg-white p-3 border-2 border-black">
              Do not break the venue! Follow all emergency protocols. If you smell smoke, it's not a compiling feature, it's a fire. Evacuate immediately!
            </p>
          </MangaPanel>

          <MangaPanel className="col-span-1 p-4 bg-black text-white flex flex-col justify-center">
            <h3 className="font-display text-3xl mb-3 text-red-500">11. Disqualification</h3>
            <p className="font-bold text-lg text-gray-200">
              Breaking core rules, harassing participants, or plagiarizing code = Insta-KO. There are no respawns. Play hard, play fair.
            </p>
          </MangaPanel>

          {/* Big Splash Action Panel */}
          <MangaPanel className="col-span-2 overflow-hidden flex items-center justify-center p-8 bg-red-600 border-8 border-black">
            <div className="absolute inset-0 speed-lines-burst opacity-30 mix-blend-overlay"></div>
            <div className="relative z-10 text-center">
              <h2 className="font-display text-6xl md:text-8xl text-white text-stroke-black text-shadow-solid transform -rotate-3 leading-none">
                PREPARE FOR<br/>BATTLE!
              </h2>
            </div>
          </MangaPanel>

        </div>
      </MangaPage>

      {/* PAGE 6: BACK COVER */}
      <MangaPage className="bg-black text-white print:bg-black">
        <div className="absolute inset-0 screentone-dots-light opacity-30"></div>
        <div className="absolute inset-0 border-[16px] border-white m-4 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
          
          <div className="mb-12">
            <ActionText text="THE CLOCK IS TICKING" className="text-yellow-400 !text-5xl" />
          </div>

          <h1 className="font-display text-7xl md:text-9xl text-white text-stroke-black text-shadow-solid mb-8 transform rotate-2">
            GOOD LUCK,<br/>HACKERS!
          </h1>

          <div className="mt-12 border-t-4 border-white pt-8 w-full max-w-sm mx-auto">
            <p className="font-manga text-2xl tracking-widest">
              END OF VOLUME 1
            </p>
            <p className="font-body font-bold text-sm mt-4 text-gray-400 uppercase tracking-widest">
              Generated securely for Hackathon 2025
            </p>
          </div>

        </div>
      </MangaPage>

    </div>
  );
}
