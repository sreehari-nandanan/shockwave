import React from 'react';
import { ArrowLeft, Cpu, Radio, Award, Target, Zap } from 'lucide-react';

interface HowItWorksPageProps {
  navigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ navigate }) => {
  const S = {
    fontDisplay: 'font-black uppercase tracking-tight',
    fontMono: 'font-mono text-xs uppercase tracking-wider',
  };

  const steps = [
    {
      num: '01',
      title: 'HARDWARE BUILD',
      desc: 'Develop a functional hardware prototype integrating MCU, sensors, and wireless connectivity. Documentation must include complete schematic diagrams and power budget analysis.',
      icon: <Cpu className="w-6 h-6 text-[#19D8FF]" />
    },
    {
      num: '02',
      title: 'THE PITCH',
      desc: 'Each team is allotted exactly 5 minutes on the main stage to present their architecture, market viability, and technical innovations. The Master Timer is strictly enforced.',
      icon: <Zap className="w-6 h-6 text-[#19D8FF]" />
    },
    {
      num: '03',
      title: 'JUDGE DEFENSE',
      desc: 'Following the pitch, a panel of industry experts will cross-examine the technical decisions. Teams must defend their component selection and signal processing methodologies.',
      icon: <Target className="w-6 h-6 text-[#19D8FF]" />
    },
    {
      num: '04',
      title: 'CROSSFIRE ARENA',
      desc: 'The unique SHOCKWAVE challenge mode. Rival teams submit technical questions via their participant terminals. High-quality questions and answers both earn points.',
      icon: <Radio className="w-6 h-6 text-[#19D8FF]" />
    },
    {
      num: '05',
      title: 'FINAL EVALUATION',
      desc: 'Scores from Pitch (100), Defense (20), and Crossfire (40) are aggregated live on the venue leaderboard. Top teams proceed to the final hardware inspection.',
      icon: <Award className="w-6 h-6 text-[#19D8FF]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#05080C] text-slate-100 flex flex-col p-6 lg:p-12" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <button 
        onClick={() => navigate('/')}
        className={`fixed top-8 left-8 ${S.fontMono} text-slate-500 hover:text-[#00AEEF] flex items-center gap-2 transition-colors z-10 cursor-pointer bg-[#05080C] p-2`}
      >
        <ArrowLeft className="w-3 h-3" /> BACK
      </button>

      <div className="max-w-4xl mx-auto w-full z-10 mt-12">
        
        <div className="mb-16 border-b border-[#162232] pb-6">
          <div className={`${S.fontMono} text-[#00AEEF] mb-2`}>DOCUMENTATION // SHOCKWAVE.MANUAL</div>
          <h1 className={`${S.fontDisplay} text-5xl md:text-7xl text-white tracking-tighter leading-none`}>
            OPERATING <span className="text-[#00AEEF]">PARAMETERS</span>
          </h1>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.num} className="bg-[#0C1218] border border-[#162232] flex flex-col md:flex-row relative">
              
              <div className="p-6 md:w-32 md:border-r border-b md:border-b-0 border-[#162232] bg-[#101820] flex md:flex-col justify-between items-center md:items-start gap-4">
                <div className={`${S.fontDisplay} text-4xl text-[#00AEEF] leading-none`}>{step.num}</div>
                <div className="p-2 border border-[#162232] bg-[#05080C] hidden md:block">
                  {step.icon}
                </div>
              </div>

              <div className="p-6 flex-1">
                <h3 className={`${S.fontDisplay} text-2xl text-white mb-3`}>{step.title}</h3>
                <p className="font-sans text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-[#F4D62E]/30 bg-[#F4D62E]/5">
          <div className={`${S.fontMono} text-[#F4D62E] mb-2`}>WARNING // CRITICAL INFORMATION</div>
          <p className="font-sans text-sm text-slate-300 leading-relaxed">
            All participants must remain authenticated in their Team Portal during the entire event duration. Failure to respond to Crossfire challenges within the allotted time will result in an immediate score deduction.
          </p>
        </div>

      </div>
    </div>
  );
};
