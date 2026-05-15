import { useState, useRef, useEffect } from "react";

const EXAMS = [
  {
    id:"upsc_cse",name:"UPSC CSE",full:"IAS / IPS / IFS",icon:"🏛️",cat:"Central",color:"#c9a227",desc:"India's toughest civil services exam",
    papers:[
      {id:"pre_gs1",name:"Prelims – GS Paper I",topics:["Indian History – Ancient, Medieval, Modern","Indian National Movement","Indian & World Geography – Physical, Social, Economic","Indian Polity & Governance – Constitution, Political System","Economic & Social Development – SD, Poverty, Demographics","Environmental Ecology, Biodiversity & Climate Change","General Science","Current Events – National & International"]},
      {id:"pre_csat",name:"Prelims – CSAT Paper II",topics:["Comprehension","Interpersonal Skills & Communication","Logical Reasoning & Analytical Ability","Decision Making & Problem Solving","General Mental Ability","Basic Numeracy (Class X)","Data Interpretation – Charts, Graphs, Tables"]},
      {id:"mains_essay",name:"Mains – Essay",topics:["Essay on Social Issues","Essay on Technology & Innovation","Essay on Economy & Development","Essay on Ethics & Values","Essay on Environment & Ecology","Essay on India & the World","Essay on Governance & Administration"]},
      {id:"mains_gs1",name:"Mains – GS I (History, Geography, Society)",topics:["Indian Heritage & Culture","Modern Indian History (1857 onwards)","Freedom Struggle – Various Stages","Post-Independence Consolidation","World History – 18th to 20th Century","Indian Society – Salient Features","Globalization & Social Change","Role of Women & Women's Organizations","Population & Associated Issues","Poverty & Developmental Issues","Urbanization – Problems & Remedies","Indian Geography – Physical, Economic, Social","World Geography – Resources Distribution","Geophysical Phenomena – Earthquakes, Tsunamis, Cyclones"]},
      {id:"mains_gs2",name:"Mains – GS II (Polity, Governance, IR)",topics:["Indian Constitution – Historical Underpinnings, Evolution","Functions of Union & States","Parliament & State Legislatures","Executive & Judiciary Structure & Functioning","Federalism & Separation of Powers","Dispute Redressal Mechanisms","Comparison with Other Country Constitutions","Government Policies & Interventions","Statutory, Regulatory & Quasi-Judicial Bodies","Development Processes & NGOs","Welfare Schemes for Vulnerable Sections","Health, Education & Human Resources","Governance, Transparency & Accountability","Citizens Charter & RTI","E-Governance Applications","Role of Civil Services in Democracy","India & Neighborhood Relations","Bilateral/Global Groupings","Effect of Developed Countries Policies on India","Indian Diaspora","Important International Institutions – UN, WTO, IMF, World Bank"]},
      {id:"mains_gs3",name:"Mains – GS III (Economy, Environment, Security)",topics:["Indian Economy – Planning & Mobilization","Inclusive Growth & Issues","Government Budgeting","Major Crops & Cropping Patterns in India","Irrigation Systems & Issues","Agricultural Technology – E-technology","Food Processing & Related Industries","Land Reforms in India","Farm Subsidies & MSP Issues","PDS, Buffer Stock & Food Security","Technology Missions","Effects of Liberalization on Economy","Industrial Policy & Changes","Infrastructure – Energy, Ports, Roads, Airports, Railways","Investment Models","Science & Technology Developments & Applications","Biotechnology & Nanotechnology","IPR Issues & Space Technology","Security Challenges – Internal & External","Security Forces & Mandate","Cyber Security Issues","Money Laundering & Prevention","Disaster Management","Environment – Conservation & Pollution","Environmental Impact Assessment"]},
      {id:"mains_gs4",name:"Mains – GS IV (Ethics & Integrity)",topics:["Ethics & Human Interface – Essence, Determinants","Attitude – Content, Structure, Function","Aptitude & Foundational Values for Civil Services","Emotional Intelligence – Applications","Contributions of Moral Thinkers & Philosophers","Public / Civil Service Values & Ethics","Probity in Governance","Information Sharing & Transparency in Govt","Code of Conduct for Civil Servants","Corporate Governance","Ethical Issues in International Relations","Case Studies on Above Topics"]},
    ]
  },
  {
    id:"upsc_capf",name:"UPSC CAPF",full:"Central Armed Police Forces",icon:"🪖",cat:"Central",color:"#4a7c59",desc:"BSF, CRPF, CISF, ITBP, SSB Assistant Commandant",
    papers:[
      {id:"paper1",name:"Paper I – GS & Mental Ability",topics:["General Mental Ability – Reasoning, Quantitative","General Science – Physics, Chemistry, Biology","Current Events – National & International Importance","Indian Polity & Governance","Indian History & Freedom Struggle","Indian & World Geography","Socio-Economic Development of India","Computer & Information Technology Basics"]},
      {id:"paper2",name:"Paper II – Essay & Comprehension",topics:["Essay Writing (600–700 words)","Precise Writing","Comprehension Passages","Counter Argument Presentation","Communication Skills in English"]},
    ]
  },
  {
    id:"ssc_cgl",name:"SSC CGL",full:"Combined Graduate Level",icon:"📊",cat:"SSC",color:"#2e86ab",desc:"Group B & C posts in Central Government",
    papers:[
      {id:"tier1",name:"Tier I – Objective CBT",topics:["General Intelligence & Reasoning – Analogy, Classification, Series, Coding, Direction, Blood Relations, Syllogism","General Awareness – History, Geography, Economy, Polity, Science, Current Affairs","Quantitative Aptitude – Ratio, Percentage, Profit/Loss, Time & Work, Algebra, Geometry, Trigonometry, Statistics","English Language – Reading Comprehension, Cloze Test, Para Jumbles, Spotting Errors, Vocabulary"]},
      {id:"tier2_math",name:"Tier II – Mathematical Abilities",topics:["Number Systems & Computation","LCM, HCF, Decimals & Fractions","Percentage, Ratio & Proportion","Simple & Compound Interest","Profit & Loss, Discount","Mixture & Alligation","Time & Work, Time & Distance","Basic Algebraic Identities","Linear Equations","Geometry – Triangles, Circles, Polygons","Mensuration – 2D & 3D","Trigonometry & Heights/Distances","Data Interpretation – Bar Graph, Pie Chart, Table","Statistics – Mean, Median, Mode, Variance"]},
      {id:"tier2_eng",name:"Tier II – English Language & Comprehension",topics:["Vocabulary – Synonyms, Antonyms, One Word Substitution","Grammar – Tenses, Voice, Narration, Prepositions","Sentence Improvement & Error Detection","Cloze Test","Reading Comprehension Passages","Para Jumbles & Sentence Arrangement","Idioms & Phrases"]},
      {id:"tier2_stats",name:"Tier II – Statistics (JSO Post)",topics:["Collection & Presentation of Data","Measures of Central Tendency","Measures of Dispersion","Moments, Skewness & Kurtosis","Correlation & Regression","Probability Theory","Random Variables & Probability Distributions","Sampling Theory","Statistical Inference","Analysis of Variance","Time Series Analysis","Index Numbers"]},
    ]
  },
  {
    id:"ssc_chsl",name:"SSC CHSL",full:"Combined Higher Secondary Level",icon:"📋",cat:"SSC",color:"#e84855",desc:"LDC, DEO, Postal & Sorting Assistant Posts",
    papers:[
      {id:"tier1",name:"Tier I – CBT",topics:["General Intelligence – Verbal & Non-Verbal Reasoning, Analogy, Series, Coding","English Language – Grammar, Vocabulary, Comprehension, Error Spotting","Quantitative Aptitude – Class 10 level Math","General Awareness – Current Affairs, Static GK, Science"]},
      {id:"tier2",name:"Tier II – Descriptive Paper",topics:["Essay Writing (200–250 words) on Social, Economic, Environmental topics","Letter/Application Writing (150–200 words) – Formal & Informal"]},
    ]
  },
  {
    id:"ssc_mts",name:"SSC MTS",full:"Multi Tasking Staff",icon:"🗂️",cat:"SSC",color:"#7b2d8b",desc:"Group C Non-Gazetted Central Government Posts",
    papers:[
      {id:"paper1",name:"Session I – Numerical & Reasoning",topics:["Numerical & Mathematical Ability – Class 8 level – Number Systems, Decimals, Fractions, Percentage, Simple Interest, Average, Ratio","Reasoning & Problem Solving – Analogy, Similarities, Differences, Space Visualization, Spatial Orientation, Classification, Coding-Decoding, Series"]},
      {id:"paper2",name:"Session II – English & GK",topics:["General English – Vocabulary, Grammar, Comprehension, Basic Writing Skills","General Awareness – India & its Neighboring Countries, History, Culture, Geography, Economy, Polity, Science, Current Events, Sports"]},
    ]
  },
  {
    id:"ibps_po",name:"IBPS PO",full:"Probationary Officer",icon:"🏦",cat:"Banking",color:"#1d7874",desc:"PO posts in all Public Sector Banks",
    papers:[
      {id:"prelims",name:"Prelims – 3 Sections",topics:["English Language – Reading Comprehension, Fill Blanks, Error Detection, Para Jumbles","Quantitative Aptitude – Simplification, Number Series, Quadratic Equations, DI (Table/Chart/Graph), Arithmetic Problems","Reasoning Ability – Puzzles & Seating Arrangement, Syllogism, Coding-Decoding, Inequalities, Blood Relations, Direction Sense"]},
      {id:"mains_ra",name:"Mains – Reasoning & Computer",topics:["Advanced Puzzles – Linear, Circular, Floor, Box, Day/Month based","Input-Output","Logical Reasoning – Statement & Conclusions","Coded Blood Relations","Data Sufficiency","Computer Fundamentals – Hardware, Software","Internet & Networking","MS Office – Word, Excel, PowerPoint","Computer Shortcuts & Basics"]},
      {id:"mains_da",name:"Mains – Data Analysis & Interpretation",topics:["DI – Tables, Bar Graph, Line Chart, Pie Chart, Mixed Graphs","Caselet DI","Data Sufficiency","Probability","Permutation & Combination","Mensuration – 2D & 3D","Mixture & Alligation","Boats & Streams, Pipes & Cisterns","Partnership","Number Series – Missing & Wrong"]},
      {id:"mains_eng",name:"Mains – English Language",topics:["Reading Comprehension – Passage based questions","Error Detection & Sentence Correction","Sentence Improvement","Para Jumbles & Sentence Rearrangement","Fill in the Blanks – Vocabulary Based","Cloze Test","Column-Based Fill Ups","Word Usage / Odd one Out"]},
      {id:"mains_ga",name:"Mains – General/Economy/Banking Awareness",topics:["Banking & Financial Awareness – RBI, SEBI, NABARD, NHB","Monetary Policy – Repo Rate, CRR, SLR, Reverse Repo","Government Schemes – Financial Inclusion, Jan Dhan, Mudra","Current Affairs – Last 6 months National & International","Static GK – Countries, Capitals, Currencies, Awards, Books & Authors","Economic Concepts – GDP, Inflation, Fiscal Deficit","Important Acts – Banking Regulation Act, FEMA, IBC"]},
    ]
  },
  {
    id:"sbi_po",name:"SBI PO",full:"State Bank of India PO",icon:"🏢",cat:"Banking",color:"#1565c0",desc:"SBI Probationary Officer – Most Prestigious Bank PO",
    papers:[
      {id:"prelims",name:"Prelims",topics:["English Language – 30 Questions","Quantitative Aptitude – 35 Questions","Reasoning Ability – 35 Questions","Total 100 Questions, 60 Minutes","Negative Marking – 0.25 per wrong"]},
      {id:"mains_obj",name:"Mains – Objective",topics:["Reasoning & Computer Aptitude – Puzzles, Machine Input, Coding, Computer Basics","Data Analysis & Interpretation – DI, Statistics, Probability","General/Economy/Banking Awareness – Current Affairs, Banking, Economy","English Language – RC, Error, Para Jumbles, Vocabulary"]},
      {id:"mains_desc",name:"Mains – Descriptive",topics:["Letter Writing – Formal/Informal – 250 words","Essay Writing – Economy/Finance/Business/Social themes – 200 words","30 Minutes, Typed on Computer"]},
    ]
  },
  {
    id:"rbi_b",name:"RBI Grade B",full:"Reserve Bank of India Officer",icon:"💹",cat:"Banking",color:"#b71c1c",desc:"RBI Officer Grade B – Dream Banking Job",
    papers:[
      {id:"phase1",name:"Phase I – CBT",topics:["General Awareness – Economy, Banking, Finance (60% weightage)","English Language – Comprehension, Grammar","Quantitative Aptitude – DI, Arithmetic","Reasoning – Puzzles, Syllogism, Coding"]},
      {id:"phase2_eco",name:"Phase II – Economic & Social Issues",topics:["Growth & Development – Concepts, Measurement, Sustainability","Poverty, Inequality & Social Issues in India","Monetary & Fiscal Policy","Inflation – Types, Causes, Measurement, Control","Union Budget – Revenue, Capital, Deficit Types","Indian Financial System – Markets & Institutions","WTO, International Trade & BOP","Demography & Human Development in India","Agriculture – Issues, Reforms, Food Security","Industry – Industrial Policy, Ease of Doing Business","Infrastructure Development in India","Social Sector – Education, Health, Gender"]},
      {id:"phase2_fin",name:"Phase II – Finance & Management",topics:["Financial System – Money Market, Capital Market, Forex Market","Financial Instruments – Bonds, Equities, Derivatives","Risk Management in Banks","Basics of Derivatives – Futures, Options, Swaps","Financial Inclusion in India","Management – Principles, Theories, Functions","Leadership Styles & Theories","Motivation & Communication","Corporate Governance & Ethics","HR Concepts"]},
    ]
  },
  {
    id:"rrb_ntpc",name:"RRB NTPC",full:"Non-Technical Popular Categories",icon:"🚂",cat:"Railway",color:"#e65100",desc:"Railway – Clerk, Goods Guard, ASM, Junior Time Keeper",
    papers:[
      {id:"cbt1",name:"CBT Stage I",topics:["Mathematics – Number System, BODMAS, Decimals, Fractions, LCM/HCF, Ratio, Percentage, Mensuration, Time & Work, Time & Distance, Simple & Compound Interest, Profit & Loss, Algebra, Geometry, Trigonometry, Statistics, Probability","General Intelligence & Reasoning – Analogy, Completion, Coding & Decoding, Mathematical Operations, Relationships, Syllogism, Jumbling, Venn Diagram, Data Interpretation","General Awareness – Current Events, Indian Geography, Culture, History of India, Freedom Struggle, Indian Polity, Economy, Science & Technology, Sports, Famous Personalities, Abbreviations, Important Dates, Books & Authors"]},
      {id:"cbt2",name:"CBT Stage II",topics:["Advanced Mathematics – Higher level than Stage I","Advanced Reasoning – Higher complexity puzzles and logic","General Awareness – More detailed & advanced coverage including Railway-specific GK","Current Affairs – More recent events emphasis"]},
    ]
  },
  {
    id:"ctet",name:"CTET",full:"Central Teacher Eligibility Test",icon:"📖",cat:"Teaching",color:"#558b2f",desc:"Teaching eligibility for Classes I–VIII in Central Schools",
    papers:[
      {id:"paper1",name:"Paper I – Classes I to V (Primary)",topics:["Child Development & Pedagogy – Child Development Theories (Piaget, Vygotsky), Inclusive Education, Special Needs, Learning & Pedagogy, Assessment","Language I (Hindi) – Grammar, Pedagogy of Language Teaching, Comprehension","Language II (English) – Comprehension, Grammar, Pedagogy","Mathematics – Shapes & Spatial Understanding, Data Handling, Addition/Subtraction/Multiplication/Division, Measurement, Time, Patterns, Money, Pedagogy of Mathematics","Environmental Studies – Family & Friends, Food, Shelter, Water, Travel, Things We Make, Pedagogy of EVS"]},
      {id:"paper2",name:"Paper II – Classes VI to VIII (Upper Primary)",topics:["Child Development & Pedagogy – Adolescence, Motivation, Learning in Social Context","Language I (Hindi) – Advanced Grammar & Pedagogy","Language II (English) – Advanced Comprehension & Pedagogy","Mathematics & Science (for Maths/Science teachers) – Algebra, Geometry, Mensuration, Statistics, Food, Materials, Living World, Moving Things, How Things Work, Natural Phenomena","Social Studies/Social Science (for SST teachers) – History, Geography, Political Science, Economics & Pedagogy"]},
    ]
  },
  {
    id:"nda",name:"NDA",full:"National Defence Academy",icon:"⚔️",cat:"Defence",color:"#37474f",desc:"Entry to Army, Navy & Air Force Academy",
    papers:[
      {id:"maths",name:"Paper I – Mathematics",topics:["Algebra – Concept of Set, Venn Diagrams, De Morgan Laws, Complex Numbers, Quadratic Equations, Permutation & Combination, Binomial Theorem, Logarithms","Matrices & Determinants – Types, Operations, Properties, Adjoint, Inverse","Trigonometry – Angles, Identities, Inverse Trigonometric Functions, Properties of Triangle","Analytical Geometry (2D) – Rectangular Cartesian Coordinate System, Lines, Conic Sections","Analytical Geometry (3D) – Rectangular Coordinate System, Direction Cosines, Equations of Plane","Differential Calculus – Concept of Real Valued Functions, Continuity, Derivatives","Integral Calculus & Differential Equations","Vector Algebra – Vectors, Operations, Scalar & Cross Product","Statistics – Frequency Distribution, Mean, Median, Mode, Standard Deviation","Probability – Random Experiment, Conditional Probability, Bayes Theorem"]},
      {id:"gat",name:"Paper II – General Ability Test",topics:["English – Grammar & Usage, Vocabulary, Comprehension, Cohesion","Physics – Physical Properties, States of Matter, Motion, Laws of Motion, Work/Energy/Power, Heat, Sound, Light, Electricity & Magnetism, Atomic Structure","Chemistry – Physical & Chemical Changes, Elements/Compounds/Mixtures, Acids/Bases/Salts, Oxidation/Reduction, Carbon & its Forms, Fertilizers","General Science – Difference between Living & Non-living, Basis of Life, Food & Nutrition, Human Body, Disease & Prevention, Solar System","History of India – Early Civilizations, Medieval Period, Mughal Period, British Period, Freedom Struggle","Geography – Earth, Latitudes & Longitudes, Climate & Atmosphere, Rivers, Industries, India's Geography","Current Events – National & International recent developments"]},
    ]
  },
  {
    id:"cds",name:"CDS",full:"Combined Defence Services",icon:"🎖️",cat:"Defence",color:"#546e7a",desc:"Commission in IMA, INA, AFA and OTA",
    papers:[
      {id:"eng",name:"English",topics:["Spotting Errors – Grammar based","Sentence Arrangement","Reading Comprehension Passages","Fill in the Blanks – Vocabulary based","Synonyms & Antonyms","Ordering of Sentences & Words in Passages","Idioms & Phrases"]},
      {id:"gk",name:"General Knowledge",topics:["Current Events – National & International","History of India – Ancient, Medieval, Modern","Indian Polity & Constitution","Indian Economy – Basics & Current","Geography – India & World","Science – Physics, Chemistry, Biology basics","Defence & Security Issues","Sports, Awards & Honours","Books & Authors","Important Dates & Days"]},
      {id:"math",name:"Elementary Mathematics",topics:["Number System – Natural, Integers, Rational, Real Numbers","Fundamental Operations – BODMAS","LCM & HCF","Decimals & Fractions","Square Roots & Surds","Ratio & Proportion","Percentage","Simple & Compound Interest","Profit & Loss & Discount","Time, Distance & Speed","Time & Work, Pipes & Cisterns","Basic Algebra – Polynomials, Linear Equations","Geometry – Triangles, Quadrilaterals, Circles","Mensuration – Areas & Volumes","Statistics – Mean, Median, Mode"]},
    ]
  },
  {
    id:"uppsc",name:"UPPSC PCS",full:"UP State Combined Civil Services",icon:"🗺️",cat:"State PSC",color:"#6a1b9a",desc:"SDM, DSP, BDO – UP Government Class I & II",
    papers:[
      {id:"pre_gs",name:"Prelims – General Studies",topics:["History of India & Indian National Movement","Indian & World Geography – Physical, Social, Economic","Indian Polity & Governance – Constitution, Political System, Panchayati Raj","Economic & Social Development – Sustainable Development, Poverty","Environmental Ecology, Biodiversity, Climate Change","General Science","UP Specific – Culture, History, Fauna & Flora, Agriculture, Industry, Trade, Infrastructure"]},
      {id:"pre_csat",name:"Prelims – General Studies Paper II (CSAT)",topics:["Comprehension Passages","Interpersonal Skills & Communication","Logical Reasoning & Analytical Ability","Decision Making & Problem Solving","General Mental Ability","Basic Numeracy – Arithmetic Operations, Percentage, Ratio","Data Interpretation – Charts, Graphs, Tables"]},
      {id:"mains_hindi",name:"Mains – General Hindi",topics:["Swaran Vichar – Sandhi, Samas","Vachan, Ling, Karak, Sarvnaam, Visheshan","Tatsam-Tadbhav, Paryayvachi, Vilom, Anekarshi Shabd","Muhavre & Lokoktiyan","Vaky Sudhi","Nibandh (Essay in Hindi)","Patra Lekhan","Apalit Gadyansh"]},
      {id:"mains_gs1",name:"Mains – GS Paper I",topics:["Indian Culture – Ancient to Modern – Heritage, Art, Literature","History of Modern India & Freedom Struggle – 1757 to 1947","Post-Independence India","World History – Colonialism, World Wars, Revolutions","Indian Society – Characteristics, Diversity","Role of Women & Women Organizations","Population & Urbanization Issues","Poverty, Development & Social Issues","Indian Geography – Physical & Human","World Geography – Physical & Resources","Natural Disasters & Disaster Management in India"]},
      {id:"mains_gs2",name:"Mains – GS Paper II",topics:["Indian Constitution – Features, Amendments, Basic Structure","Functions of Executive, Legislature, Judiciary","Federalism & Centre-State Relations","Representative Institutions – Parliament, State Legislature","Governance – Transparency, Accountability","Social Justice & Weaker Sections","International Relations – India's Foreign Policy","Bilateral & Multilateral Organizations","UP Administration – Districts, Tehsils, Panchayats","Urban Local Bodies & Smart City Mission"]},
      {id:"mains_gs3",name:"Mains – GS Paper III",topics:["Indian Economy – Structure & Features","Economic Planning – NITI Aayog, Five Year Plans","Inclusive Growth & Poverty Alleviation","Agriculture in India & UP – Crop Patterns, Irrigation","Land Reforms & Agricultural Marketing","Food Processing Industry in UP","Science & Technology in Daily Life","Biotechnology – Applications & Concerns","Environment & Ecology","Renewable Energy – Solar, Wind","Security – Terrorism, Cyber Security, Border Issues","UP Industrial Policy & Economic Development"]},
      {id:"mains_gs4",name:"Mains – GS Paper IV (Ethics)",topics:["Ethics – Essence & Determinants of Ethics","Attitude & Influence on Behavior","Aptitude – Civil Service Values, Integrity, Dedication","Emotional Intelligence – Application in Administration","Moral Thinkers & Philosophers – Indian & Western","Public Service Ethics","Corruption – Causes, Effects, Prevention","Case Studies in Administrative Ethics","Integrity in Public Service"]},
    ]
  },
  {
    id:"jee_main",name:"JEE Main",full:"Joint Entrance Examination Main",icon:"⚗️",cat:"Engineering",color:"#00695c",desc:"Admission to NITs, IIITs, CFTIs & GFTIs",
    papers:[
      {id:"physics",name:"Physics",topics:["Units & Measurements, Dimensional Analysis","Kinematics – Motion in 1D, 2D, Projectile","Laws of Motion – Newton's Laws, Friction, Circular Motion","Work, Energy & Power – Conservative Forces, Collisions","System of Particles & Rotational Motion – Moment of Inertia, Torque","Gravitation – Kepler's Laws, Orbital Velocity, Escape Velocity","Properties of Solids & Fluids – Elasticity, Viscosity, Surface Tension","Thermodynamics – Laws, Carnot Engine, Entropy","Kinetic Theory of Gases – KTG Assumptions, RMS Speed","Oscillations – SHM, Damped Oscillations","Waves – Sound Waves, Doppler Effect","Electrostatics – Coulomb's Law, Gauss Law, Capacitors","Current Electricity – Ohm's Law, Kirchhoff's Laws, Wheatstone Bridge","Moving Charges & Magnetism – Biot Savart, Ampere's Law, Force on Current","Electromagnetic Induction – Faraday's Laws, Lenz's Law, Eddy Currents","Alternating Current – AC Circuits, Resonance, Transformers","Electromagnetic Waves – Maxwell's Equations, EM Spectrum","Ray Optics – Reflection, Refraction, Lens & Mirror Formulas","Wave Optics – Huygens Principle, Young's Experiment, Diffraction","Dual Nature of Radiation – Photoelectric Effect, de Broglie Wavelength","Atoms & Nuclei – Bohr Model, Radioactivity, Nuclear Reactions","Semiconductor Devices – PN Junction, Diodes, Transistors, Logic Gates"]},
      {id:"chemistry",name:"Chemistry",topics:["Basic Concepts – Mole Concept, Stoichiometry, Equivalent Concept","Structure of Atom – Quantum Numbers, Electronic Configuration","Classification of Elements – Periodic Table, Periodicity in Properties","Chemical Bonding – Ionic, Covalent, VSEPR, Hybridization, MOT","States of Matter – Ideal Gas Laws, Real Gases, Liquids","Thermodynamics – Enthalpy, Entropy, Gibbs Free Energy","Equilibrium – Le Chatelier's Principle, Kp, Kc, Ionic Equilibrium","Redox Reactions – Oxidation State, Balancing Reactions","s-Block – Alkali & Alkaline Earth Metals","p-Block Elements – Groups 13 to 18 – Important Reactions","Organic Chemistry Basics – IUPAC Nomenclature, Isomerism","Hydrocarbons – Alkanes, Alkenes, Alkynes, Benzene","Solid State – Crystal Systems, Defects, Electrical & Magnetic Properties","Solutions – Colligative Properties, Van't Hoff Factor","Electrochemistry – Galvanic Cells, EMF, Faraday's Laws, Corrosion","Chemical Kinetics – Rate Laws, Activation Energy, Arrhenius Equation","Surface Chemistry – Adsorption, Colloids, Emulsions","d & f Block Elements – Transition Metals, Lanthanides, Actinides","Coordination Compounds – Werner's Theory, IUPAC Naming, Isomerism","Haloalkanes & Haloarenes – SN1, SN2, Elimination Reactions","Alcohols, Phenols & Ethers – Properties, Reactions","Aldehydes, Ketones & Carboxylic Acids – Named Reactions","Organic Nitrogen Compounds – Amines, Diazonium Salts","Biomolecules – Carbohydrates, Proteins, Nucleic Acids, Vitamins","Polymers – Addition, Condensation, Natural & Synthetic","Chemistry in Everyday Life – Drugs, Chemicals in Food"]},
      {id:"maths",name:"Mathematics",topics:["Sets, Relations & Functions – Types, Composition, Graphs","Complex Numbers – Algebra, Polar Form, Cube Roots of Unity","Permutation & Combination – Fundamental Theorem, Circular Permutation","Mathematical Induction","Binomial Theorem – General Term, Middle Term, Properties","Sequences & Series – AP, GP, HP, Special Series","Straight Lines – Equations, Distance, Angles Between Lines","Conic Sections – Parabola, Ellipse, Hyperbola – Standard Forms","Limits, Continuity & Differentiability – Standard Limits, L'Hopital","Differentiation – Chain Rule, Implicit, Parametric, Higher Order","Applications of Derivatives – Tangent, Normal, Maxima & Minima, Rolles Theorem","Integral Calculus – Definite & Indefinite, Integration Techniques","Application of Integrals – Area Between Curves","Differential Equations – Variable Separable, Homogeneous, Linear","Vector Algebra – Dot Product, Cross Product, Scalar Triple Product","3D Geometry – Direction Cosines, Plane, Line, Angles","Matrices & Determinants – Operations, Properties, Inverse, Cramer's Rule","Statistics – Mean, Variance, Standard Deviation, Correlation","Probability – Conditional Probability, Bayes Theorem, Distribution","Trigonometry – Identities, Equations, Inverse Trigonometric Functions","Mathematical Reasoning – Statements, Quantifiers, Implications"]},
    ]
  },
  {
    id:"neet",name:"NEET UG",full:"National Eligibility Entrance Test",icon:"🩺",cat:"Medical",color:"#c2185b",desc:"Admission to MBBS, BDS, AYUSH Courses",
    papers:[
      {id:"physics",name:"Physics (Class 11 & 12)",topics:["Physical World & Measurement","Kinematics – Motion in Straight Line & Plane","Laws of Motion – Newton, Friction, Circular Motion","Work, Energy & Power","System of Particles, Centre of Mass & Rotational Motion","Gravitation – Acceleration due to Gravity, Satellites","Properties of Bulk Matter – Elasticity, Viscosity, Surface Tension","Thermodynamics – Laws, Efficiency of Engines","Kinetic Theory & Behaviour of Perfect Gas","Oscillations – SHM, Energy in SHM","Waves – Transverse, Longitudinal, Standing Waves, Beats","Electrostatics – Coulomb's Law, Electric Field, Potential, Capacitance","Current Electricity – Drift Velocity, Resistance, EMF, Kirchhoff's Laws","Magnetic Effects of Current & Magnetism","Electromagnetic Induction & Alternating Currents","Electromagnetic Waves – Maxwell's Equations, Types","Optics – Ray & Wave Optics, Optical Instruments","Dual Nature of Radiation & Matter – Photoelectric Effect","Atoms & Nuclei – Bohr Model, Radioactivity","Electronic Devices – Semiconductors, Diodes, Transistors"]},
      {id:"chemistry",name:"Chemistry (Class 11 & 12)",topics:["Some Basic Concepts of Chemistry – Mole Concept","Atomic Structure – Quantum Numbers","Classification of Elements – Periodicity","Chemical Bonding – Ionic, Covalent, Hybridization","States of Matter","Thermodynamics – Chemical Thermodynamics","Equilibrium – Chemical & Ionic","Redox Reactions","Hydrogen & s-Block Elements","p-Block Elements (Groups 13–18)","Organic Chemistry – Basics & IUPAC Nomenclature","Hydrocarbons – Alkanes, Alkenes, Alkynes","Environmental Chemistry","Solid State","Solutions & Colligative Properties","Electrochemistry – Nernst Equation, Electrolysis","Chemical Kinetics","Surface Chemistry","d & f Block Elements","Coordination Compounds","Haloalkanes & Haloarenes","Alcohols, Phenols & Ethers","Aldehydes, Ketones & Carboxylic Acids","Organic Compounds with Nitrogen","Biomolecules – Carbohydrates, Proteins, Vitamins","Polymers","Chemistry in Everyday Life"]},
      {id:"biology",name:"Biology – Botany & Zoology",topics:["Diversity of Living Organisms – Kingdom Classification, Plant & Animal Kingdom","Structural Organisation – Morphology, Anatomy of Plants & Animals","Cell – Structure, Function, Cell Cycle, Cell Division","Plant Physiology – Mineral Nutrition, Photosynthesis, Respiration, Plant Growth","Human Physiology – Digestion, Breathing, Body Fluids, Circulation, Excretion, Locomotion, Neural & Chemical Coordination","Sexual Reproduction – Plants, Human Reproductive System, Reproductive Health","Genetics – Mendel's Laws, Chromosomal Theory, Sex Determination, Mutations","Evolution – Origin of Life, Biological Evolution, Hardy Weinberg","Biology & Human Welfare – Human Health & Disease, Microbes in Human Welfare, Improvement in Food Production","Biotechnology – Principles, Processes & Applications, BT Cotton, Insulin","Ecology – Organisms & Environment, Population, Ecosystem, Biodiversity, Environmental Issues"]},
    ]
  },
];

const CATS = ["All","Central","SSC","Banking","Railway","Teaching","Defence","State PSC","Engineering","Medical"];

const buildSystem = (exam, paper) =>
  `You are Vidya — India's warmest, sharpest AI tutor. You are helping a student prepare for ${exam.full} (${exam.name}).
${paper ? `Current focus: "${paper.name}"` : ""}
Personality: Speak in natural Hinglish. Be warm like an elder didi/bhaiya. Deeply knowledgeable about Indian competitive exams.
Style: Use Indian examples & analogies. Give memory tricks/mnemonics. Add encouragement naturally — "Bilkul sahi!", "Bahut achha sawaal!". End explanations with "Koi aur doubt ho toh batao! 🙏"
Know: Exact syllabus, previous year trends, exam pattern, marking scheme, important topics, shortcut tricks for ${exam.name}.
Format: Use bullet points for lists. Bold key terms. Give step-by-step for concepts. Keep it crisp and exam-focused.`;

const fmt = (text) => text.split('\n').map((line,i) => {
  if (!line.trim()) return <div key={i} style={{height:6}}/>;
  if (line.startsWith('**') && line.endsWith('**'))
    return <div key={i} style={{fontWeight:700,color:'#f5c842',marginTop:10,marginBottom:4}}>{line.replace(/\*\*/g,'')}</div>;
  if (line.match(/^[•\-\*] /))
    return <div key={i} style={{display:'flex',gap:8,paddingLeft:8,marginBottom:4}}>
      <span style={{color:'#f5c842',flexShrink:0}}>◆</span><span>{line.slice(2)}</span></div>;
  if (line.match(/^\d+\. /))
    return <div key={i} style={{display:'flex',gap:8,paddingLeft:8,marginBottom:4}}>
      <span style={{color:'#f5c842',flexShrink:0,minWidth:18}}>{line.match(/^\d+/)[0]}.</span>
      <span>{line.replace(/^\d+\. /,'')}</span></div>;
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
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const filtered = EXAMS.filter(e =>
    (cat==="All"||e.cat===cat) &&
    (search===""||e.name.toLowerCase().includes(search.toLowerCase())||e.full.toLowerCase().includes(search.toLowerCase())||e.cat.toLowerCase().includes(search.toLowerCase()))
  );

  const goChat = (exam,paper) => {
    setSelExam(exam); setSelPaper(paper);
    setMsgs([{role:"assistant",content:`Namaste! 🙏 Main hoon **Vidya** — aapki apni AI guru.\n\nAaj ka focus: **${exam.full}${paper?` — ${paper.name}`:''}**\n\n${paper?`Is paper ke topics:\n${paper.topics.slice(0,4).map(t=>`• ${t}`).join('\n')}\n\n...aur bahut kuch!\n\n`:''}Koi bhi topic pucho, concept samjho, ya practice questions lo. Main hoon na! Kahan se shuru karein? 🌟`}]);
    setScreen("chat");
    setTimeout(()=>inputRef.current?.focus(),200);
  };

  const send = async () => {
    if(!input.trim()||loading) return;
    const txt=input.trim(); setInput("");
    if(textareaRef.current) textareaRef.current.style.height="auto";
    const nm=[...msgs,{role:"user",content:txt}];
    setMsgs(nm); setLoading(true);
    try {
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:buildSystem(selExam,selPaper),messages:nm.map(m=>({role:m.role,content:m.content}))})});
      const d=await r.json();
      setMsgs([...nm,{role:"assistant",content:d.content?.[0]?.text||"Thoda technical issue. Dobara try karo! 🙏"}]);
    } catch { setMsgs([...nm,{role:"assistant",content:"Network issue. Internet check karo! 🙏"}]); }
    setLoading(false);
  };

  const S = {
    app:{minHeight:"100vh",background:"#07080f",color:"#e8dcc8",fontFamily:"'Georgia','Times New Roman',serif",display:"flex",flexDirection:"column"},
    hdr:{padding:"12px 18px",borderBottom:"1px solid rgba(245,200,66,0.1)",background:"rgba(7,8,15,0.97)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:50},
    lc:{width:36,height:36,background:"linear-gradient(135deg,#f5c842,#e8831a)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,boxShadow:"0 0 14px rgba(245,200,66,0.3)"},
    ln:{fontSize:19,fontWeight:700,background:"linear-gradient(90deg,#f5c842,#ffd980)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:3},
    ls:{fontSize:9,color:"rgba(232,220,200,0.35)",letterSpacing:3,textTransform:"uppercase"},
    scroll:{flex:1,overflowY:"auto",padding:"20px 14px"},
  };

  // ── HOME
  if(screen==="home") return (
    <div style={S.app}>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bl{0%,60%,100%{opacity:.3;transform:scale(.8)}30%{opacity:1;transform:scale(1)}}
        .ec:hover{border-color:rgba(245,200,66,.45)!important;transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5)!important}
        .cb:hover{background:rgba(245,200,66,.1)!important;color:#f5c842!important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(245,200,66,.15);border-radius:4px}
        input:focus{border-color:rgba(245,200,66,.4)!important;outline:none}
      `}</style>
      <div style={S.hdr}>
        <div style={S.lc}>🪔</div>
        <div><div style={S.ln}>VIDYA</div><div style={S.ls}>Tera Apna Guru</div></div>
        <div style={{flex:1}}/>
        <div style={{fontSize:11,color:"rgba(232,220,200,.25)",letterSpacing:1}}>{EXAMS.length} Exams · AI Powered</div>
      </div>
      <div style={S.scroll}>
        {/* Hero */}
        <div style={{textAlign:"center",padding:"28px 0 36px",animation:"fu .5s ease-out"}}>
          <div style={{fontSize:48,marginBottom:10,filter:"drop-shadow(0 0 18px rgba(245,200,66,.4))"}}>🕉️</div>
          <div style={{fontSize:"clamp(26px,6vw,46px)",fontWeight:700,background:"linear-gradient(135deg,#f5c842,#ffd980)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:4,marginBottom:4}}>VIDYA</div>
          <div style={{fontSize:13,color:"rgba(232,220,200,.45)",letterSpacing:2,marginBottom:2}}>विद्या ददाति विनयम्</div>
          <div style={{fontSize:11,color:"rgba(232,220,200,.25)",letterSpacing:1}}>Knowledge gives humility · Hinglish AI Guru · All India Exams</div>
        </div>

        {/* Search */}
        <div style={{maxWidth:540,margin:"0 auto 20px",position:"relative"}}>
          <input placeholder="Search — UPSC, SSC CGL, IBPS PO, JEE, NEET..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{width:"100%",padding:"12px 18px 12px 42px",borderRadius:50,background:"rgba(255,255,255,.05)",border:"1px solid rgba(245,200,66,.18)",color:"#e8dcc8",fontSize:13,fontFamily:"inherit",boxSizing:"border-box"}}/>
          <span style={{position:"absolute",left:15,top:"50%",transform:"translateY(-50%)",opacity:.35,fontSize:15}}>🔍</span>
          {search&&<button onClick={()=>setSearch("")} style={{position:"absolute",right:15,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(232,220,200,.4)",cursor:"pointer",fontSize:14}}>✕</button>}
        </div>

        {/* Category Tabs */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:28,maxWidth:680,margin:"0 auto 28px"}}>
          {CATS.map(c=>(
            <button key={c} className="cb" onClick={()=>setCat(c)}
              style={{padding:"5px 14px",borderRadius:20,border:cat===c?"1px solid #f5c842":"1px solid rgba(245,200,66,.18)",background:cat===c?"rgba(245,200,66,.14)":"transparent",color:cat===c?"#f5c842":"rgba(232,220,200,.4)",fontSize:11,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",letterSpacing:.5}}>
              {c}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:28,flexWrap:"wrap"}}>
          {[["🏛️","UPSC & State PSC","Most Prestigious"],["🏦","Banking Exams","Highest Vacancies"],["🚂","SSC & Railway","Lakhs of Jobs"],["⚗️","JEE & NEET","Top Engineering & Medical"]].map(([ic,t,s],i)=>(
            <div key={i} style={{textAlign:"center",animation:`fu .4s ${i*.08}s ease-out both`}}>
              <div style={{fontSize:22,marginBottom:4}}>{ic}</div>
              <div style={{fontSize:11,fontWeight:700,color:"rgba(245,200,66,.7)",letterSpacing:.5}}>{t}</div>
              <div style={{fontSize:10,color:"rgba(232,220,200,.3)"}}>{s}</div>
            </div>
          ))}
        </div>

        {/* Exam Grid */}
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
                <div style={{fontSize:11,color:exam.color,opacity:.65}}>Padhna shuru karo →</div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:"50px 0",color:"rgba(232,220,200,.3)"}}>
            <div style={{fontSize:32,marginBottom:10}}>🔍</div>
            <div style={{fontSize:14}}>"{search}" — koi match nahi mila</div>
            <div style={{fontSize:12,marginTop:6,opacity:.6}}>Dusra search try karo</div>
          </div>
        )}

        <div style={{textAlign:"center",padding:"44px 0 20px",fontSize:10,color:"rgba(232,220,200,.15)",letterSpacing:2}}>
          VIDYA · विद्या ददाति विनयम् · MADE WITH ❤️ FOR INDIA 🇮🇳
        </div>
      </div>
    </div>
  );

  // ── DETAIL
  if(screen==="detail"&&selExam) return (
    <div style={S.app}>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .pc:hover{border-color:rgba(245,200,66,.38)!important;background:rgba(255,255,255,.045)!important;}
        .back:hover{border-color:rgba(245,200,66,.4)!important;color:rgba(232,220,200,.8)!important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(245,200,66,.15);border-radius:4px}
      `}</style>
      <div style={S.hdr}>
        <button className="back" onClick={()=>setScreen("home")} style={{background:"none",border:"1px solid rgba(245,200,66,.18)",borderRadius:8,padding:"6px 12px",color:"rgba(232,220,200,.5)",cursor:"pointer",fontSize:11,fontFamily:"inherit",transition:"all .2s",flexShrink:0}}>← Wapas</button>
        <div style={S.lc}>🪔</div>
        <div><div style={S.ln}>VIDYA</div><div style={S.ls}>Tera Apna Guru</div></div>
      </div>
      <div style={S.scroll}>
        <div style={{maxWidth:680,margin:"0 auto",animation:"fu .4s ease-out"}}>
          {/* Exam Hero */}
          <div style={{textAlign:"center",padding:"28px 0 32px"}}>
            <div style={{fontSize:50,marginBottom:12}}>{selExam.icon}</div>
            <div style={{fontSize:26,fontWeight:700,color:selExam.color,letterSpacing:2,marginBottom:4}}>{selExam.name}</div>
            <div style={{fontSize:13,color:"rgba(232,220,200,.45)",marginBottom:3}}>{selExam.full}</div>
            <div style={{fontSize:11,color:"rgba(232,220,200,.3)",fontStyle:"italic"}}>{selExam.desc}</div>
          </div>

          {/* General Chat CTA */}
          <div onClick={()=>goChat(selExam,null)}
            style={{padding:"16px 20px",borderRadius:14,border:`1px solid ${selExam.color}35`,background:`${selExam.color}0e`,cursor:"pointer",marginBottom:22,display:"flex",alignItems:"center",gap:12,transition:"all .2s"}}>
            <div style={{fontSize:26}}>💬</div>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:selExam.color,marginBottom:2}}>Free Chat — {selExam.name}</div>
              <div style={{fontSize:11,color:"rgba(232,220,200,.35)"}}>Koi bhi topic pucho — open discussion, no limits</div>
            </div>
            <div style={{color:selExam.color,opacity:.55,fontSize:16}}>→</div>
          </div>

          <div style={{fontSize:10,color:"rgba(232,220,200,.25)",letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Papers & Syllabus — Click to Study</div>

          {/* Paper Cards */}
          {selExam.papers.map((p,i)=>(
            <div key={p.id} className="pc" onClick={()=>goChat(selExam,p)}
              style={{padding:"16px 18px",borderRadius:12,border:"1px solid rgba(245,200,66,.12)",background:"rgba(255,255,255,.022)",cursor:"pointer",transition:"all .22s",marginBottom:10,animation:`fu .4s ${i*.06}s ease-out both`}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <div style={{width:30,height:30,borderRadius:8,background:`${selExam.color}18`,border:`1px solid ${selExam.color}28`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:selExam.color,flexShrink:0,fontWeight:700}}>{i+1}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#e8dcc8",marginBottom:8}}>{p.name}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                    {p.topics.map((t,ti)=>(
                      <span key={ti} style={{fontSize:9,padding:"3px 7px",borderRadius:5,background:"rgba(245,200,66,.06)",border:"1px solid rgba(245,200,66,.1)",color:"rgba(232,220,200,.45)",letterSpacing:.3}}>
                        {t.length>38?t.slice(0,36)+"…":t}
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

  // ── CHAT
  if(screen==="chat") return (
    <div style={{...S.app,height:"100vh",overflow:"hidden"}}>
      <style>{`
        @keyframes fu{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bl{0%,60%,100%{opacity:.3;transform:scale(.8)}30%{opacity:1;transform:scale(1)}}
        .msg{animation:fu .3s ease-out}
        textarea:focus{border-color:rgba(245,200,66,.38)!important;outline:none}
        .st:hover{background:rgba(245,200,66,.07)!important;color:rgba(232,220,200,.75)!important}
        .back:hover{border-color:rgba(245,200,66,.4)!important;color:rgba(232,220,200,.8)!important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(245,200,66,.15);border-radius:4px}
      `}</style>

      {/* Chat Header */}
      <div style={S.hdr}>
        <button className="back" onClick={()=>setScreen("detail")} style={{background:"none",border:"1px solid rgba(245,200,66,.18)",borderRadius:8,padding:"5px 10px",color:"rgba(232,220,200,.5)",cursor:"pointer",fontSize:11,fontFamily:"inherit",transition:"all .2s",flexShrink:0}}>←</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:700,color:selExam?.color,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selExam?.name}{selPaper?` · ${selPaper.name}`:""}</div>
          <div style={{fontSize:9,color:"rgba(232,220,200,.3)",letterSpacing:1}}>VIDYA AI GURU · HINGLISH MODE</div>
        </div>
        {selPaper&&(
          <button onClick={()=>setShowSyl(!showSyl)} style={{background:showSyl?"rgba(245,200,66,.13)":"none",border:"1px solid rgba(245,200,66,.2)",borderRadius:8,padding:"5px 10px",color:showSyl?"#f5c842":"rgba(232,220,200,.4)",cursor:"pointer",fontSize:11,fontFamily:"inherit",flexShrink:0,transition:"all .2s"}}>
            📚 Syllabus
          </button>
        )}
      </div>

      {/* Body */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>
        {/* Messages */}
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
              <div style={{padding:"12px 16px",borderRadius:"18px 18px 18px 4px",background:"rgba(255,255,255,.052)",border:"1px solid rgba(245,200,66,.11)",display:"flex",gap:4,alignItems:"center"}}>
                {[0,.2,.4].map((d,i)=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:"#f5c842",display:"inline-block",animation:`bl 1.4s ${d}s ease-in-out infinite`}}/>)}
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Syllabus Sidebar */}
        {showSyl&&selPaper&&(
          <div style={{width:200,borderLeft:"1px solid rgba(245,200,66,.09)",background:"rgba(0,0,0,.25)",overflowY:"auto",padding:"14px 10px",flexShrink:0}}>
            <div style={{fontSize:9,color:"rgba(232,220,200,.3)",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>📚 Topics</div>
            <div style={{fontSize:11,fontWeight:700,color:"#f5c842",marginBottom:8,lineHeight:1.4}}>{selPaper.name}</div>
            {selPaper.topics.map((t,i)=>(
              <div key={i} className="st" onClick={()=>{setInput(`Explain in detail: ${t}`);setShowSyl(false);inputRef.current?.focus();}}
                style={{padding:"6px 7px",borderRadius:5,fontSize:10,color:"rgba(232,220,200,.45)",cursor:"pointer",marginBottom:3,lineHeight:1.45,transition:"all .15s"}}>
                ◆ {t.length>45?t.slice(0,43)+"…":t}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {msgs.length===1&&selPaper&&(
        <div style={{padding:"8px 14px",borderTop:"1px solid rgba(245,200,66,.07)",display:"flex",gap:8,overflowX:"auto",background:"rgba(7,8,15,.8)"}}>
          {[`${selPaper.topics[0]} explain karo`,`${selPaper.name} ke important topics kya hain?`,"Previous year questions do","Memory tricks bataao"].map((q,i)=>(
            <button key={i} onClick={()=>{setInput(q);inputRef.current?.focus();}}
              style={{padding:"5px 12px",borderRadius:14,border:"1px solid rgba(245,200,66,.18)",background:"rgba(245,200,66,.06)",color:"rgba(232,220,200,.5)",fontSize:10,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0,transition:"all .2s"}}>
              {q.length>36?q.slice(0,34)+"…":q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{padding:"11px 14px",borderTop:"1px solid rgba(245,200,66,.09)",background:"rgba(7,8,15,.95)",backdropFilter:"blur(10px)",display:"flex",gap:9,alignItems:"flex-end"}}>
        <textarea ref={el=>{textareaRef.current=el;inputRef.current=el;}} rows={1} value={input}
          onChange={e=>{setInput(e.target.value);e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,110)+"px";}}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
          placeholder={selPaper?`${selPaper.name} ke baare mein pucho...`:"Koi bhi sawaal pucho... 🙏"}
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
