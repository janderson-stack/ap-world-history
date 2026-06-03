(() => {
  const lesson = window.BEHISTORICAL_LESSON;
  if (!lesson) return;

  lesson.collegeBoardKeyConcepts = [
    {
      code: 'KC-4.5.I.A',
      theme: 'Economic Systems',
      text: 'European colonial empires relied on forced and coerced labor systems — including encomienda, mita, and chattel slavery — to extract resources and generate wealth from their colonies.',
      illustrativeExamples: ['Encomienda', 'Mita', 'Potosí silver mines', 'Chattel slavery in Brazil and the Caribbean', 'Bartolomé de las Casas and the New Laws of 1542']
    },
    {
      code: 'KC-4.5.I.B',
      theme: 'Governance',
      text: 'Colonial administration was organized through viceroyalties, audiencias, and the Catholic Church — each serving administrative, judicial, and cultural conversion roles across vast colonial territories.',
      illustrativeExamples: ['Viceroyalty of New Spain', 'Viceroyalty of Peru', 'Audiencias', 'Jesuit and Franciscan missions', 'Casa de Contratación']
    },
    {
      code: 'KC-4.5.I.C',
      theme: 'Economic Systems',
      text: 'American silver — especially from Potosí — connected the Americas, Europe, and Asia into a single global trade network through the Manila Galleon trade and the Seville trading monopoly, causing a global price revolution.',
      illustrativeExamples: ['Potosí', 'Manila Galleon trade (1565–1815)', 'Casa de Contratación (Seville)', 'Global price revolution', 'Chinese demand for silver']
    }
  ];

  lesson.first10 = {
    ...lesson.first10,
    title: 'First & 10: The Labor of Empire',
    embedUrl: 'first-and-10-topic-4-5-maritime-empires-maintained-capture.html',
    note: 'Read the First & 10 narrative, answer the three questions, build your AI Coach prompt, then return to the 4.5 lesson path.'
  };

  lesson.map = {
    ...lesson.map,
    key: [
      { label: 'Potosí and the mita zone', detail: 'Potosí (modern Bolivia) produced roughly 60% of the world\'s silver in the 16th–17th centuries. The mita system conscripted indigenous workers from a radius of hundreds of miles. By 1600, Potosí was the largest city in the Western Hemisphere, sustained entirely by silver extraction.' },
      { label: 'Manila Galleon route (Acapulco → Manila)', detail: 'The Manila Galleon trade (1565–1815) was the world\'s first regularly scheduled transoceanic route. Mexican silver crossed the Pacific to Manila, where it was exchanged for Chinese silk, porcelain, and spices. Chinese demand for silver — driven by the Single Whip Tax Reform (1581) — pulled the entire circuit.' },
      { label: 'Atlantic silver route (Potosí → Seville)', detail: 'Silver traveled from Potosí overland to the Pacific coast, by ship to Portobelo or Veracruz, and then across the Atlantic to Seville\'s Casa de Contratación. The Casa held a monopoly on all colonial trade and channeled silver into European money markets, funding Spanish military campaigns and triggering the global price revolution.' },
      { label: 'Geographic takeaway', detail: 'By c. 1580, a single commodity — silver — connected three continents into a global economy. The direction of flow reflects where demand was highest: China needed silver for its tax system, creating an enormous pull across the Pacific that drove the entire network. Understanding this geography is essential for AP arguments about global trade in c. 1450–1750.' }
    ]
  };

  lesson.stableImages = {
    map:             'https://commons.wikimedia.org/wiki/Special:FilePath/Casta_painting_all.jpg',
    first10:         'https://commons.wikimedia.org/wiki/Special:FilePath/FlorentineCodex_BK12_F54_smallpox.jpg',
    contentDelivery: 'https://commons.wikimedia.org/wiki/Special:FilePath/Voc.jpg',
    beSurreal:       'https://commons.wikimedia.org/wiki/Special:FilePath/Waldseemuller_map_2.jpg',
    skill:           'https://commons.wikimedia.org/wiki/Special:FilePath/Columbus_Taking_Possession.jpg',
    checkpoint1:     'https://commons.wikimedia.org/wiki/Special:FilePath/Loren_Mozley_Pueblo_Revolt_1680_installed_1936_ABQ_NM.jpg',
    evidence:        'https://commons.wikimedia.org/wiki/Special:FilePath/Astrolabe-Persian-18C.jpg',
    source:          'https://commons.wikimedia.org/wiki/Special:FilePath/Pillar_of_Vasco_da_Gama.jpg',
    beInTheRoom:     'https://commons.wikimedia.org/wiki/Special:FilePath/Ferdinand_Magellan.jpg',
    checkpoint2:     'https://commons.wikimedia.org/wiki/Special:FilePath/World_1700_CE.png'
  };

  lesson.beInTheRoom = {
    url: '../beintheroom/unit-4/maritime-empires-maintained.html',
    desc: "Debate the mita system with Viceroy Toledo at the court of Philip II, manage silver production as a Potosí mine foreman, or trace a single silver shipment from Potosí to Manila as a Dutch merchant."
  };

  lesson.skillBuilder = {
    label: 'Causation practice',
    title: 'Tracing the Silver Economy: From Mine to Market',
    intro: 'Causation practice for Topic 4.5 requires tracing how one factor — silver extraction at Potosí — caused changes across multiple systems: labor, administration, and global trade. A strong causation argument identifies specific causes and effects, uses specific evidence, and explains the mechanism by which cause produced effect. Avoid vague claims like "silver caused change" — explain HOW the silver flowed, WHO it affected, and WHAT specifically changed.',
    steps: [
      { label: 'Identify the cause', text: 'The mita system at Potosí forced indigenous labor to extract silver at industrial scale. The cause is specific: the combination of Spanish colonial demand for revenue, Chinese fiscal demand for silver (Single Whip Tax Reform, 1581), and the forced labor of mita workers who had no alternative because tribute obligations required silver payment.' },
      { label: 'Trace the effects', text: 'Silver flowing from Potosí through Acapulco to Manila (Manila Galleon) and through Veracruz to Seville (Atlantic route) created the first genuinely global trade circuit. Chinese merchants in Manila received silver in exchange for silk and porcelain; European merchants received silver that funded expansion; and the enormous silver influx caused the global price revolution — inflation across Europe and Asia.' },
      { label: 'Explain the mechanism', text: 'The mechanism connecting cause and effect was demand. Chinese demand for silver created the pull that made the Manila Galleon profitable; Spanish crown demand for revenue created the push that forced the mita; indigenous workers had no choice because their tribute obligations required silver they could only earn by mining it. Understanding the mechanism — not just the fact of silver flow — is what makes a causation argument strong.' }
    ],
    prompt: 'In 3–4 sentences, write a causation argument: explain how the extraction of silver at Potosí — using the mita labor system — caused changes in global trade networks. Use specific evidence (Potosí, Manila Galleon, Seville, Chinese demand for silver) and explain the mechanism by which silver extraction transformed global commerce.'
  };

  lesson.checkpoints = [
    {
      title: 'Checkpoint 1: Labor Systems and Colonial Administration',
      subtitle: 'Checks Learning Targets 1 and 2 — labor systems and colonial administration.',
      cardDesc: 'Encomienda, mita, chattel slavery, viceroyalties, audiencias, and the Catholic Church.',
      learningTargets: [lesson.learningTargets[0].target, lesson.learningTargets[1].target],
      successCriteria: [lesson.successCriteria[0].criteria, lesson.successCriteria[1].criteria],
      prompt: 'Explain how the mita system worked at Potosí and describe the conditions it created for indigenous workers. Then explain how the viceregal system and Catholic Church maintained colonial administration across vast distances. Use specific evidence for each and explain ONE key similarity between the encomienda and mita systems.',
      responseType: 'Checkpoint 1',
      terms: ['encomienda', 'mita', 'Potosí', 'chattel slavery', 'viceroyalty', 'audiencia', 'Jesuit missions', 'las Casas', 'New Spain', 'Peru'],
      focus: ['Explain the mita system: origins, conscription zone, conditions at Potosí, and why death rates were so high.', 'Describe how the viceregal system and Church maintained colonial order — use specific institutional names.', 'Identify one key similarity between the encomienda and mita (e.g., both used coercion; both served colonial extraction goals).']
    },
    {
      title: 'Checkpoint 2: Silver and Global Trade',
      subtitle: 'Checks Learning Target 3 — the silver economy and global price revolution.',
      cardDesc: 'Potosí, Manila Galleon, Seville, Chinese demand for silver, and the global price revolution.',
      learningTargets: [lesson.learningTargets[2].target],
      successCriteria: [lesson.successCriteria[2].criteria],
      prompt: 'Explain how silver from Potosí connected the Americas, Europe, and Asia into a global trade network. Describe at least two trade routes (Manila Galleon and Atlantic crossing) and explain how Chinese demand for silver drove the entire system. Then identify one continuity: what pre-existing trade networks did the silver economy build upon or incorporate?',
      responseType: 'Checkpoint 2',
      terms: ['Potosí', 'Manila Galleon', 'Casa de Contratación', 'global price revolution', 'Chinese demand', 'silver economy', 'Seville', 'Single Whip Tax Reform'],
      focus: ['Explain the Manila Galleon trade: route, commodities exchanged, why Chinese demand drove it.', 'Describe the Atlantic silver route through Seville and explain the global price revolution.', 'Identify one continuity: what existing trade network did the silver economy build upon?']
    }
  ];
})();
