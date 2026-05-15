import { useState, useRef, useEffect } from "react";

const EXAMS = [
  {id:"upsc_cse",name:"UPSC CSE",full:"IAS / IPS / IFS",icon:"🏛️",cat:"Central",color:"#c9a227",desc:"India's toughest exam",papers:[{id:"pre_gs1",name:"Prelims – GS Paper I",topics:["Indian History","Indian Geography","Indian Polity","Economics & Development","Environment & Ecology","General Science"]},{id:"pre_csat",name:"Prelims – CSAT",topics:["Comprehension","Logical Reasoning","Analytical Ability","Quantitative Aptitude","General Mental Ability"]},{id:"mains_gs1",name:"Mains – GS I",topics:["History & Culture","Modern India","Indian Society","Geography"]},{id:"mains_gs2",name:"Mains – GS II",topics:["Polity & Governance","International Relations","Welfare Schemes"]},{id:"mains_gs3",name:"Mains – GS III",topics:["Economy","Infrastructure","Science & Tech","Security Issues"]},{id:"mains_gs4",name:"Mains – GS IV (Ethics)",topics:["Ethics & Integrity","Emotional Intelligence","Public Service Values"]}]},
  {id:"ssc_cgl",name:"SSC CGL",full:"Combined Graduate Level",icon:"📊",cat:"SSC",color:"#2e86ab",desc:"Group B & C posts",papers:[{id:"tier1",name:"Tier I – Objective",topics:["General Intelligence","General Awareness","Quantitative Aptitude","English Language"]},{id:"tier2_math",name:"Tier II – Math",topics:["Arithmetic","Algebra","Geometry","Statistics"]},{id:"tier2_eng",name:"Tier II – English",topics:["Comprehension","Grammar","Vocabulary"]}]},
  {id:"ibps_po",name:"IBPS PO",full:"Probationary Officer",icon:"🏦",cat:"Banking",color:"#1d7874",desc:"Banking sector jobs",papers:[{id:"prelims",name:"Prelims",topics:["English Language","Quantitative Aptitude","Reasoning Ability"]},{id:"mains",name:"Mains",topics:["Advanced Reasoning","Data Analysis","General Awareness","Banking Knowledge"]}]},
  {id:"jee_main",name:"JEE Main",full:"Joint Entrance Exam",icon:"⚗️",cat:"Engineering",color:"#00695c",desc:"NIT & IIIT admission",papers:[{id:"physics",name:"Physics",topics:["Mechanics","Thermodynamics","Electricity","Magnetism","Optics","Modern Physics"]},{id:"chemistry",name:"Chemistry",topics:["Inorganic Chemistry","Organic Chemistry","Physical Chemistry"]},{id:"maths",name:"Mathematics",topics:["Algebra","Calculus","Geometry","Trigonometry","Probability"]}]},
  {id:"neet",name:"NEET UG",full:"Medical Entrance Test",icon:"🩺",cat:"Medical",color:"#c2185b",desc:"MBBS & BDS admission",papers:[{id:"physics",name:"Physics",topics:["Mechanics","Thermodynamics","Electricity","Waves","Optics","Modern Physics"]},{id:"chemistry",name:"Chemistry",topics:["Organic Chemistry","Inorganic Chemistry","Physical Chemistry"]},{id:"biology",name:"Biology",topics:["Cell Biology","Genetics","Physiology","Ecology","Diversity"]}]},
  {id:"upsc_capf",name:"UPSC CAPF",full:"Armed Police Forces",icon:"🪖",cat:"Central",color:"#4a7c59",desc:"BSF, CRPF, CISF, ITBP",papers:[{id:"paper1",name:"Paper I – GS",topics:["General Science","Current Events","Polity","History","Geography"]},{id:"paper2",name:"Paper II – Essay",topics:["Essay Writing","Comprehension","Communication"]}]},
  {id:"sbi_po",name:"SBI PO",full:"State Bank of India",icon:"🏢",cat:"Banking",color:"#1565c0",desc:"Premium banking role",papers:[{id:"prelims",name:"Prelims",topics:["English","Quantitative Aptitude","Reasoning"]},{id:"mains",name:"Mains",topics:["General Awareness","Data Analysis"]}]},
  {id:"rrb_ntpc",name:"RRB NTPC",full:"Railway Recruitment",icon:"🚂",cat:"Railway",color:"#e65100",desc:"Railway government jobs",papers:[{id:"cbt1",name:"CBT Stage I",topics:["Mathematics","Intelligence & Reasoning","General Awareness"]},{id:"cbt2",name:"CBT Stage II",topics:["Advanced Math","Advanced Reasoning"]}]},
  {id:"ctet",name:"CTET",full:"Teacher Eligibility Test",icon:"📖",cat:"Teaching",color:"#558b2f",desc:"Teaching qualification",papers:[{id:"paper1",name:"Paper I (Classes I-V)",topics:["Child Development","Language","Math","EVS"]},{id:"paper2",name:"Paper II (Classes VI-VIII)",topics:["Child Development","Language","Math & Science","Social Studies"]}]},
  {id:"nda",name:"NDA",full:"Defence Academy Exam",icon:"⚔️",cat:"Defence",color:"#37474f",desc:"Army/Navy/Air Force",papers:[{id:"maths",name:"Mathematics",topics:["Algebra","Calculus","Geometry","Trigonometry"]},{id:"gat",name:"General Ability",topics:["English","Physics","Chemistry","Science","History","Geography"]}]},
];

const CATS = ["All","Central","SSC","Banking","Railway","Teaching","Defence","Engineering","Medical"];

// Demo responses for when API fails
const demoResponses = {
  default: "Bahut achha sawaal! 🙏\n\n**Key Points:**\n• Pehle basics samjho\n• Phir practice karo\n• Difficult topics par focus karo\n• Previous year questions zarur solve karo\n\nKoi specific topic samjhana hai?",
  history: "**History Tips:**\n• Timeline banao\n• Key events note karo\n• Dates yaad rakhne ke liye mnemonic use karo\n• Connections dekho — kya linked hai\n\nAur kuch poochna hai?",
  science: "**Science ka Best Approach:**\n• Concept samjh jao pehle\n• Formula yaad karo\n• Numerical solve karo\n• Real-world examples dekho\n\nKaunsa topic samjhana hai?",
};

const getDemo = (input) => {
  if(input.toLowerCase().includes("history")) return demoResponses.history;
  if(input.toLowerCase().includes("science") || input.toLowerCase().includes("physics")) return demoResponses.science;
  return demoResponses.default;
};

const buildSystem = (exam, paper) => 
  `You are Vidya — India's warmest AI tutor. Help student prepare for ${exam.full}${paper ? ` — ${paper.name}` : ""}.
Speak Hinglish like elder didi/bhaiya. Be warm, encouraging, knowledgeable.
Use Indian examples. Give memory tricks. Add encouragement: "Bilkul sahi!", "Bahut achha!".
Format: Bold key terms. Use bullets. Keep step-by-step. End with "Koi aur doubt? 🙏"`;

const fmt = (text) => text.split('\n').map((line,i) => {
  if (!line.trim()) return <div key={i} style={{height:6}}/>;
  if (line.startsWith('**') && line.endsWith('**'))
    return <div key={i} style={{fontWeight:700,color:'#f5c842',marginTop:10,marginBottom:4}}>{line.replace(/\*\*/g,'')}</div>;
  if (line.match(/^[•\-\*] /))
    return <div key={i} style={{display:'flex',gap:8,paddingLeft:8,marginBottom:4}}>
      <span style={{color:'#f5c842',flexShrink:0}}>◆</span><span>{line.slice(2)}</span></div>;
  return <div key={i} style={{marginBottom:3,lineHeight:1.65}}>{line}</div>;
});

export default function VidyaApp() {
  const [screen,setScreen] = useState("home");
  const [selExam,setSelExam] = useState(null);
  const [selPaper,setSelPaper] = useState(null);
  const [cat,setCat] = useState("All");
  const [search,setSearch] = useState("");
  const [msgs,setMsgs] = useState([]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [showSyl,setShowSyl] = useState(false);
  const [apiKey,setApiKey] = useState(localStorage.getItem("vidya_api_key") || "");
  const [showApiSetup,setShowApiSetup] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const filtered = EXAMS.filter(e =>
    (cat==="All"||e.cat===cat) &&
    (search===""||e.name.toLowerCase().includes(search.toLowerCase())||e.full.toLowerCase().includes(search.toLowerCase()))
  );

  const goChat = (exam,paper) => {
    setSelExam(exam);
    setSelPaper(paper);
    setMsgs([{role:"assistant",content:`Namaste! 🙏 Main hoon **Vidya** — aapki apni AI guru.\n\nAaj ka focus: **${exam.full}${paper?` — ${paper.name}`:''}`}]);
    setScreen("chat");
    setTimeout(()=>inputRef.current?.focus(),200);
  };

  const send = async () => {
    if(!input.trim()||loading) return;
    const txt = input.trim();
    setInput("");
    const newMsgs = [...msgs, {role:"user",content:txt}];
    setMsgs(newMsgs);
    setLoading(true);

    try {
      // Check if API key exists
      const key = apiKey || localStorage.getItem("vidya_api_key");
      
      if(!key) {
        // Use demo response
        const demoReply = getDemo(txt);
        setMsgs([...newMsgs, {role:"assistant",content:demoReply}]);
        setLoading(false);
        return;
      }

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01"
        },
        body:JSON.stringify({
          model:"claude-opus-4-1-20250805",
          max_tokens:1000,
          system:buildSystem(selExam,selPaper),
          messages:newMsgs.map(m=>({role:m.role,content:m.content}))
        })
      });

      if(!res.ok) {
        const err = await res.json();
        console.error("API Error:", err);
        throw new Error(err.error?.message || "API Error");
      }

      const data = await res.json();
      const reply = data.content?.[0]?.text || getDemo(txt);
      setMsgs([...newMsgs, {role:"assistant",content:reply}]);
    } catch(e) {
      console.error("Error:", e);
      const fallback = getDemo(txt);
      setMsgs([...newMsgs, {role:"assistant",content:fallback}]);
    }
    setLoading(false);
  };

  const S = {
    app:{minHeight:"100vh",background:"#07080f",color:"#e8dcc8",fontFamily:"'Georgia','Times New Roman',serif",display:"flex",flexDirection:"column"},
    hdr:{padding:"12px 18px",borderBottom:"1px solid rgba(245,200,66,0.1)",background:"rgba(7,8,15,0.97)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:50},
    lc:{width:36,height:36,background:"linear-gradient(135deg,#f5c842,#e8831a)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,boxShadow:"0 0 14px rgba(245,200,66,0.3)"},
    scroll:{flex:1,overflowY:"auto",padding:"20px 14px"},
  };

  // HOME
  if(screen==="home") return (
    <div style={S.app}>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .ec:hover{border-color:rgba(245,200,66,.45)!important;transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5)!important}
        .cb:hover{background:rgba(245,200,66,.1)!important;color:#f5c842!important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(245,200,66,.15);border-radius:4px}
        input:focus{border-color:rgba(245,200,66,.4)!important;outline:none}
      `}</style>

      <div style={S.hdr}>
        <div style={S.lc}>🪔</div>
        <div><div style={{fontSize:19,fontWeight:700,background:"linear-gradient(90deg,#f5c842,#ffd980)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:3}}>VIDYA</div><div style={{fontSize:9,color:"rgba(232,220,200,0.35)",letterSpacing:3,textTransform:"uppercase"}}>Tera Apna Guru</div></div>
        <div style={{flex:1}}/>
        <button onClick={()=>setShowApiSetup(true)} style={{fontSize:11,padding:"6px 12px",borderRadius:8,background:"rgba(245,200,66,0.1)",border:"1px solid rgba(245,200,66,0.2)",color:"rgba(232,220,200,0.6)",cursor:"pointer",fontFamily:"inherit"}}>⚙️ Setup</button>
      </div>

      <div style={S.scroll}>
        <div style={{textAlign:"center",padding:"28px 0 36px",animation:"fu .5s ease-out"}}>
          <div style={{fontSize:48,marginBottom:10,filter:"drop-shadow(0 0 18px rgba(245,200,66,.4))"}}>🕉️</div>
          <div style={{fontSize:"clamp(26px,6vw,46px)",fontWeight:700,background:"linear-gradient(135deg,#f5c842,#ffd980)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:4,marginBottom:4}}>VIDYA</div>
          <div style={{fontSize:13,color:"rgba(232,220,200,.45)",letterSpacing:2,marginBottom:2}}>विद्या ददाति विनयम्</div>
          <div style={{fontSize:11,color:"rgba(232,220,200,.25)",letterSpacing:1}}>Complete India's Government Exam Prep Platform</div>
        </div>

        <div style={{maxWidth:540,margin:"0 auto 20px",position:"relative"}}>
          <input placeholder="Search — UPSC, SSC, IBPS, JEE, NEET..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",padding:"12px 18px 12px 42px",borderRadius:50,background:"rgba(255,255,255,.05)",border:"1px solid rgba(245,200,66,.18)",color:"#e8dcc8",fontSize:13,fontFamily:"inherit",boxSizing:"border-box"}}/>
          <span style={{position:"absolute",left:15,top:"50%",transform:"translateY(-50%)",opacity:.35,fontSize:15}}>🔍</span>
        </div>

        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:28,maxWidth:680,margin:"0 auto 28px"}}>
          {CATS.map(c=>(
            <button key={c} className="cb" onClick={()=>setCat(c)}
              style={{padding:"5px 14px",borderRadius:20,border:cat===c?"1px solid #f5c842":"1px solid rgba(245,200,66,.18)",background:cat===c?"rgba(245,200,66,.14)":"transparent",color:cat===c?"#f5c842":"rgba(232,220,200,.4)",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",letterSpacing:.5}}>
              {c}
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(248px,1fr))",gap:12,maxWidth:880,margin:"0 auto"}}>
          {filtered.map((exam,i)=>(
            <div key={exam.id} className="ec" onClick={()=>{setSelExam(exam);setScreen("detail");}}
              style={{padding:"18px",borderRadius:14,border:"1px solid rgba(245,200,66,.1)",background:"rgba(255,255,255,.025)",cursor:"pointer",transition:"all .25s",animation:`fu .4s ${i*.035}s ease-out both`}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
                <div style={{fontSize:26,lineHeight:1,flexShrink:0}}>{exam.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:700,color:exam.color,letterSpacing:.8,marginBottom:2}}>{exam.name}</div>
                  <div style={{fontSize:10,color:"rgba(232,220,200,.4)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{exam.full}</div>
                </div>
                <div style={{fontSize:9,padding:"3px 7px",borderRadius:8,background:"rgba(245,200,66,.07)",color:"rgba(245,200,66,.45)",letterSpacing:.3,flexShrink:0}}>{exam.cat}</div>
              </div>
              <div style={{fontSize:11,color:"rgba(232,220,200,.3)",marginBottom:12,fontStyle:"italic"}}>{exam.desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontSize:10,color:"rgba(232,220,200,.3)"}}>{exam.papers.length} Paper{exam.papers.length>1?"s":""}</div>
                <div style={{fontSize:11,color:exam.color,opacity:.65}}>Shuru karo →</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",padding:"44px 0 20px",fontSize:10,color:"rgba(232,220,200,.15)",letterSpacing:2}}>
          VIDYA · MADE FOR INDIA 🇮🇳
        </div>
      </div>

      {/* API Setup Modal */}
      {showApiSetup&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:"20px"}}>
          <div style={{background:"#0a0b12",borderRadius:16,border:"1px solid rgba(245,200,66,0.15)",padding:"28px",maxWidth:500,color:"#e8dcc8"}}>
            <div style={{fontSize:18,fontWeight:700,marginBottom:16,color:"#f5c842"}}>🔑 API Setup</div>
            
            <div style={{fontSize:12,lineHeight:1.7,marginBottom:16,color:"rgba(232,220,200,0.7)"}}>
              <p><strong>Option 1 — Free Demo Mode (works now):</strong></p>
              <p>Click "Use Demo" below — works with smart responses (no API needed)</p>
              
              <p style={{marginTop:12}}><strong>Option 2 — Your Own API Key (for real Claude):</strong></p>
              <p>1. Get free API key: <strong>console.anthropic.com</strong></p>
              <p>2. Paste it below</p>
              <p>3. App uses your own Claude API calls</p>
            </div>

            <input 
              type="password"
              placeholder="sk-ant-xxxxx..."
              value={apiKey}
              onChange={e=>setApiKey(e.target.value)}
              style={{width:"100%",padding:"12px 14px",borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(245,200,66,0.2)",color:"#e8dcc8",fontSize:12,fontFamily:"monospace",marginBottom:16,boxSizing:"border-box"}}
            />

            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>{localStorage.setItem("vidya_api_key",apiKey);setShowApiSetup(false);}}
                style={{flex:1,padding:"11px",borderRadius:8,background:"linear-gradient(135deg,#f5c842,#e8831a)",border:"none",color:"#07080f",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                Save API Key
              </button>
              <button onClick={()=>{setApiKey("");localStorage.removeItem("vidya_api_key");setShowApiSetup(false);}}
                style={{flex:1,padding:"11px",borderRadius:8,background:"rgba(245,200,66,0.1)",border:"1px solid rgba(245,200,66,0.2)",color:"#f5c842",fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                Use Demo
              </button>
            </div>
            <button onClick={()=>setShowApiSetup(false)}
              style={{width:"100%",padding:"10px",marginTop:12,borderRadius:8,background:"transparent",border:"1px solid rgba(245,200,66,0.15)",color:"rgba(232,220,200,0.5)",cursor:"pointer",fontFamily:"inherit"}}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // DETAIL
  if(screen==="detail"&&selExam) return (
    <div style={S.app}>
      <style>{`
        .pc:hover{border-color:rgba(245,200,66,.38)!important;background:rgba(255,255,255,.045)!important;}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(245,200,66,.15);border-radius:4px}
      `}</style>
      <div style={S.hdr}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"1px solid rgba(245,200,66,.18)",borderRadius:8,padding:"6px 12px",color:"rgba(232,220,200,.5)",cursor:"pointer",fontSize:11,fontFamily:"inherit",flexShrink:0}}>← Back</button>
        <div style={{flex:1}}/>
      </div>
      <div style={S.scroll}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <div style={{textAlign:"center",padding:"28px 0 32px"}}>
            <div style={{fontSize:50,marginBottom:12}}>{selExam.icon}</div>
            <div style={{fontSize:26,fontWeight:700,color:selExam.color,letterSpacing:2,marginBottom:4}}>{selExam.name}</div>
            <div style={{fontSize:13,color:"rgba(232,220,200,.45)",marginBottom:3}}>{selExam.full}</div>
            <div style={{fontSize:11,color:"rgba(232,220,200,.3)",fontStyle:"italic"}}>{selExam.desc}</div>
          </div>

          <div onClick={()=>goChat(selExam,null)}
            style={{padding:"16px 20px",borderRadius:14,border:`1px solid ${selExam.color}35`,background:`${selExam.color}0e`,cursor:"pointer",marginBottom:22,display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:26}}>💬</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:selExam.color,marginBottom:2}}>Free Chat — {selExam.name}</div>
              <div style={{fontSize:11,color:"rgba(232,220,200,.35)"}}>Koi bhi topic pucho</div>
            </div>
            <div style={{color:selExam.color,opacity:.55,fontSize:16}}>→</div>
          </div>

          <div style={{fontSize:10,color:"rgba(232,220,200,.25)",letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Papers</div>

          {selExam.papers.map((p,i)=>(
            <div key={p.id} className="pc" onClick={()=>goChat(selExam,p)}
              style={{padding:"16px 18px",borderRadius:12,border:"1px solid rgba(245,200,66,.12)",background:"rgba(255,255,255,.022)",cursor:"pointer",transition:"all .22s",marginBottom:10}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{width:30,height:30,borderRadius:8,background:`${selExam.color}18`,border:`1px solid ${selExam.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:selExam.color,flexShrink:0,fontWeight:700}}>{i+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#e8dcc8",marginBottom:8}}>{p.name}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {p.topics.map((t,ti)=>(
                      <span key={ti} style={{fontSize:9,padding:"3px 7px",borderRadius:5,background:"rgba(245,200,66,.06)",border:"1px solid rgba(245,200,66,.1)",color:"rgba(232,220,200,.45)",letterSpacing:.3}}>
                        {t.length>30?t.slice(0,28)+"…":t}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{color:selExam.color,opacity:.45,fontSize:15,flexShrink:0}}>→</div>
              </div>
            </div>
          ))}

          <div style={{height:32}}/>
        </div>
      </div>
    </div>
  );

  // CHAT
  if(screen==="chat") return (
    <div style={{...S.app,height:"100vh",overflow:"hidden"}}>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bl{0%,60%,100%{opacity:.3;transform:scale(.8)}30%{opacity:1;transform:scale(1)}}
        .msg{animation:fu .3s ease-out}
        textarea:focus{border-color:rgba(245,200,66,.38)!important;outline:none}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(245,200,66,.15);border-radius:4px}
      `}</style>

      <div style={S.hdr}>
        <button onClick={()=>setScreen("detail")} style={{background:"none",border:"1px solid rgba(245,200,66,.18)",borderRadius:8,padding:"5px 10px",color:"rgba(232,220,200,.5)",cursor:"pointer",fontSize:11,fontFamily:"inherit",flexShrink:0}}>←</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:selExam?.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selExam?.name}{selPaper?` · ${selPaper.name}`:""}</div>
          <div style={{fontSize:9,color:"rgba(232,220,200,.3)",letterSpacing:1}}>VIDYA AI GURU</div>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"18px 14px",display:"flex",flexDirection:"column",gap:12}}>
        {msgs.map((m,i)=>(
          <div key={i} className="msg" style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",alignItems:"flex-end",gap:8}}>
            {m.role==="assistant"&&<div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#f5c842,#e8831a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0,boxShadow:"0 0 10px rgba(245,200,66,.25)"}}>🪔</div>}
            <div style={{maxWidth:"79%",padding:"12px 15px",borderRadius:m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="user"?"linear-gradient(135deg,#f5c842,#e8831a)":"rgba(255,255,255,.052)",border:m.role==="user"?"none":"1px solid rgba(245,200,66,.11)",color:m.role==="user"?"#07080f":"#e8dcc8",fontSize:13.5,lineHeight:1.62,fontFamily:"inherit"}}>
              {m.role==="assistant"?fmt(m.content):m.content}
            </div>
          </div>
        ))}
        {loading&&(
          <div className="msg" style={{display:"flex",alignItems:"flex-end",gap:8}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#f5c842,#e8831a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,boxShadow:"0 0 10px rgba(245,200,66,.25)"}}>🪔</div>
            <div style={{padding:"12px 16px",borderRadius:"18px 18px 18px 4px",background:"rgba(255,255,255,.052)",border:"1px solid rgba(245,200,66,.11)",display:"flex",gap:4}}>
              {[0,.2,.4].map((d,i)=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#f5c842",animation:`bl 1.4s ${d}s ease-in-out infinite`}}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      <div style={{padding:"11px 14px",borderTop:"1px solid rgba(245,200,66,.09)",background:"rgba(7,8,15,.95)",display:"flex",gap:9,alignItems:"flex-end"}}>
        <textarea ref={inputRef} rows={1} value={input}
          onChange={e=>{setInput(e.target.value);e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,110)+"px";}}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
          placeholder="Koi bhi sawaal pucho... 🙏"
          style={{flex:1,padding:"11px 15px",borderRadius:22,background:"rgba(255,255,255,.055)",border:"1px solid rgba(245,200,66,.16)",color:"#e8dcc8",fontSize:13.5,fontFamily:"inherit",resize:"none",lineHeight:1.5,maxHeight:110}}/>
        <button onClick={send}
          style={{width:42,height:42,borderRadius:"50%",background:input.trim()&&!loading?"linear-gradient(135deg,#f5c842,#e8831a)":"rgba(245,200,66,.09)",border:"none",cursor:input.trim()&&!loading?"pointer":"default",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s",boxShadow:input.trim()&&!loading?"0 0 13px rgba(245,200,66,.28)":"none"}}>
          {loading?"⏳":"🚀"}
        </button>
      </div>
    </div>
  );

  return null;
}
