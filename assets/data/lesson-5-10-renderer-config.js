(() => {
  const lesson = window.BEHISTORICAL_LESSON;
  if (!lesson) return;

  lesson.collegeBoardKeyConcepts = [
    {
      code: 'KC-5.10.I',
      theme: 'Economic and Political Change',
      text: "The period c. 1750–1900 produced transformative changes in economic and political organization. Industrialization spread from Britain through Western Europe, North America, and Japan, shifting production from agriculture to mechanized factory manufacturing and integrating formerly regional economies into global commodity chains. Atlantic revolutions challenged absolute monarchy and established republican and constitutional forms of government. Nationalist ideology produced new nation-states (German unification 1871, Italian unification 1861). Steam railroads and telegraphs compressed time and distance. Abolition of slavery occurred in the British Empire (1833) and the United States (1865).",
      illustrativeExamples: ['Industrial Revolution spreading from Britain to Germany, US, Japan', 'Atlantic revolutions and constitutional government', 'German and Italian unification', 'Steam railroad and transatlantic telegraph', 'Abolition of slavery — British Empire (1833), United States (1865)', 'Reform Acts expanding suffrage in Britain', 'Meiji Restoration and Japanese industrialization (1868)']
    },
    {
      code: 'KC-5.10.II',
      theme: 'Social Continuity and Global Inequality',
      text: "Fundamental continuities persisted through c. 1750–1900. Patriarchy: women lacked voting rights in virtually every country; coverture persisted; women's wages remained lower across all economies. Imperial systems expanded: European powers controlled approximately 84% of the world's land surface by 1900, up from roughly 35% in 1800 — the scramble for Africa (1880s–1890s) partitioned the continent in less than two decades. Rural life: most of the world's population remained in rural agriculture in 1900; industrialization was geographically concentrated. New forms of coercive labor (contract labor, debt peonage, convict labor) replaced chattel slavery after abolition. Social hierarchy remained rigid despite class replacing aristocratic birth as its primary basis.",
      illustrativeExamples: ['Persistence of patriarchy — women without suffrage in major powers until after 1900', 'The scramble for Africa (1880s–1890s)', 'European empires controlling ~84% of world land by 1900', 'Rural majority in most world regions in 1900', 'Indentured labor systems replacing chattel slavery', 'Debt peonage in post-Civil War American South', 'Caste and social hierarchy in Asia and Latin America']
    }
  ];

  lesson.first10 = {
    ...lesson.first10,
    title: 'First & 10: The Arc',
    embedUrl: 'first-and-10-topic-5-10-continuity-and-change-capture.html',
    note: 'Read the First & 10 narrative, answer the three questions, build your AI Coach prompt, then return to the 5.10 lesson path.'
  };

  lesson.map = {
    ...lesson.map,
    key: [
      { label: 'Industrial regions vs. colonized regions in 1900', detail: 'The geographic pattern of industrialization in 1900 is strikingly concentrated: Britain, Belgium, France, Germany, northern Italy, the northeastern United States, and Japan had industrial economies. Most of the rest of the world remained agricultural — and much of it was under European colonial control. This geographic concentration was not coincidental: the industrializing regions had access to coal and iron, capital accumulated through earlier trade and colonial extraction, and institutional frameworks (property rights, banking systems, patent law) that enabled industrial investment. The colonized regions often had their economic development distorted by colonial extraction — raw materials exported at low prices, manufactured goods imported at high prices, and local industries suppressed or undeveloped.' },
      { label: 'The scramble for Africa and the new imperial map', detail: 'Before 1880, European powers controlled only coastal areas and a few interior regions of Africa; most of the continent was governed by African states. By 1900, after the Berlin Conference (1884–85) and two decades of competitive colonial expansion, only Ethiopia (which defeated Italy at Adwa in 1896) and Liberia remained independent. The speed of colonial partition — virtually the entire continent in roughly fifteen years — was made possible by industrial military technology: breech-loading rifles, machine guns, and steam-powered gunboats gave European forces overwhelming advantage over even large and well-organized African armies. The Maxim gun (1883), the first automatic machine gun, was used by British and other European forces against African armies throughout the 1890s — one British officer remarked, "Whatever happens, we have got / The Maxim gun, and they have not."' },
      { label: 'CCOT by region: divergent experiences of 1750–1900', detail: 'The CCOT framework reveals radically different trajectories across world regions: In Britain, the period meant industrialization, rising living standards (eventually), and expanding formal political rights. In West Africa, it meant the end of the external slave trade followed by the imposition of colonial rule and the transformation of economies toward export of raw materials (palm oil, rubber, groundnuts). In India, it meant the consolidation of British colonial rule, the construction of railroads for imperial extraction, the de-industrialization of the Indian textile industry (undersold by Manchester mills), and the recurrent famines of the late 19th century. In Japan, it meant successful state-directed industrialization and the avoidance of colonization — followed by Japan\'s own imperial expansion in Korea and China. In the Ottoman Empire, it meant gradual territorial loss to European powers and to nationalist movements within the empire. These divergent trajectories are the key to understanding what the period actually meant globally.' },
      { label: 'Atlantic revolutions and the geography of democratic change', detail: 'The Atlantic revolutions of 1776–1825 established republican and constitutional forms of government across the Western hemisphere — but their democratic promise was unevenly distributed. The United States declared all men equal but maintained slavery until 1865 and excluded women from the franchise until 1920. The French Revolution produced the Declaration of the Rights of Man but also the Terror and Napoleonic imperialism. The Haitian Revolution was the only successful slave revolt in history and produced the first Black republic — but Haiti was isolated, invaded, and forced to pay reparations to France until 1947 for the loss of its enslaved population as French property. Latin American independence movements liberated criollo (Spanish-descent) elites from Spanish colonial rule without substantively changing the position of indigenous or Afro-Latin American populations. The geography of revolutionary promise and revolutionary reality reveals that democratic ideology in this era was consistently applied selectively.' }
    ]
  };

  lesson.stableImages = {
    map:             'https://commons.wikimedia.org/wiki/Special:FilePath/World_1700_CE.png',
    first10:         'https://commons.wikimedia.org/wiki/Special:FilePath/Pillar_of_Vasco_da_Gama.jpg',
    contentDelivery: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ferdinand_Magellan.jpg',
    beSurreal:       'https://commons.wikimedia.org/wiki/Special:FilePath/Casta_painting_all.jpg',
    skill:           'https://commons.wikimedia.org/wiki/Special:FilePath/FlorentineCodex_BK12_F54_smallpox.jpg',
    checkpoint1:     'https://commons.wikimedia.org/wiki/Special:FilePath/Waldseemuller_map_2.jpg',
    evidence:        'https://commons.wikimedia.org/wiki/Special:FilePath/Voc.jpg',
    source:          'https://commons.wikimedia.org/wiki/Special:FilePath/Loren_Mozley_Pueblo_Revolt_1680_installed_1936_ABQ_NM.jpg',
    beInTheRoom:     'https://commons.wikimedia.org/wiki/Special:FilePath/Columbus_Taking_Possession.jpg',
    checkpoint2:     'https://commons.wikimedia.org/wiki/Special:FilePath/Astrolabe-Persian-18C.jpg'
  };

  lesson.beInTheRoom = {
    url: '',
    desc: "Debate W.E.B. Du Bois and Booker T. Washington on whether economic self-improvement or political rights is the right strategy for racial equality in industrial America; advise the Berlin Conference (1884–85) on the ethics of colonial partition of Africa; or present the case for or against industrialization as 'progress' to the World's Columbian Exposition in Chicago (1893)."
  };

  lesson.skillBuilder = {
    label: 'CCOT practice',
    title: 'Building a CCOT Argument for the Period c. 1750–1900',
    intro: 'CCOT for the period c. 1750–1900 requires more than listing changes and continuities — it requires constructing an argument that evaluates their significance and explains their relationship. The most common AP errors are: (1) describing changes without explaining their causes; (2) treating changes and continuities as unrelated rather than showing how they interacted; (3) focusing only on the industrializing regions without comparing the experience of the colonized world.',
    steps: [
      { label: 'Draft a CCOT thesis', text: 'A CCOT thesis for 1750–1900 must evaluate both change and continuity and make a claim about their relationship — not just list them. Weak: "From 1750 to 1900, industrialization and Atlantic revolutions changed economic and political systems, while patriarchy and imperialism continued." This is descriptive. Strong: "While industrialization and Atlantic revolutions fundamentally transformed the economic and political organization of Europe, North America, and Japan — creating new classes, new nation-states, and new ideologies of individual rights and democratic governance — these transformations intensified global inequality: European imperial expansion, the persistence of patriarchy in law and practice across all industrializing societies, and the replacement of chattel slavery with indentured labor and debt peonage demonstrate that liberation for some was structurally connected to continued subordination for others." This thesis makes a specific evaluative claim about the relationship between change and continuity — it argues that they were not parallel but causally related.' },
      { label: 'Add causation — explain why', text: 'The difference between description and historical analysis is causation. For every change you identify, ask: why did this happen in this time and this place? For every continuity you identify, ask: why did this persist despite pressure for change? Causation examples: (1) Why did industrialization spread to Japan but not to India? Japan had an independent state that could direct industrialization; India was a British colony whose economy was structured to serve British interests. (2) Why did patriarchy persist despite a century of feminist organizing? Because the legal and political systems that would have changed gender inequality were controlled by men who benefited from existing arrangements — legal change required political power, political power required the vote, and the vote required the prior legal change. (3) Why did European imperial expansion accelerate after 1880? Industrial technology (railroads, telegraphs, machine guns) gave European powers overwhelming military advantage; and competition among European powers created pressure to seize territory before rivals did.' },
      { label: 'Write the synthesis statement', text: 'Synthesis: A strong CCOT synthesis for 1750–1900 would note the complexity of the period\'s legacy. The industrial era created the material conditions for rising living standards, mass literacy, democratic participation, and the abolition of chattel slavery — genuine historical achievements. But it also created the conditions for unprecedented imperial domination of Africa and Asia; the persistence of coercive labor in new forms; and rigidly gendered social structures that new feminist movements were only beginning to challenge at the period\'s end. A complete synthesis would note: the same industrial technology that produced European prosperity enabled European imperialism; the same democratic ideology that justified popular sovereignty also justified racial hierarchy ("some peoples are not yet ready for self-government"); and the same organizational capacity that built labor unions and abolitionist movements built imperial administrations and racial categorization systems. The period\'s changes and continuities were not simply parallel — they were often produced by the same forces and served the same interests.' }
    ],
    prompt: 'In 3–4 sentences, construct a CCOT argument for the period c. 1750–1900. Your argument should: (1) identify and explain one major change, with its cause; (2) identify and explain one major continuity, explaining why it persisted; and (3) explain the relationship between the change and the continuity — were they independent, or were they causally connected? Use at least two specific pieces of evidence.'
  };

  lesson.checkpoints = [
    {
      title: 'Checkpoint 1: The Major Changes of 1750–1900',
      subtitle: 'Checks Learning Target 1 — identifying and explaining the significant changes of the period with causation.',
      cardDesc: 'Industrialization, Atlantic revolutions, nationalism, technology, abolition, new social classes.',
      learningTargets: [lesson.learningTargets[0].target],
      successCriteria: [lesson.successCriteria[0].criteria],
      prompt: 'Identify and explain three major categories of change in the period c. 1750–1900: (1) economic change — explain what transformed and what caused the transformation; (2) political change — explain what changed and what drove it; (3) technological or social change — explain one transformation in technology or social organization and connect it causally to economic or political change. For each category, use at least one specific piece of evidence. Then write a synthesis: are these three categories of change connected to each other, or are they independent? What does the relationship between economic, political, and social change in this period reveal about how historical transformation works?',
      responseType: 'Checkpoint 1',
      terms: ['Industrial Revolution', 'Atlantic revolutions', 'nationalism', 'nation-state', 'steam railroad', 'telegraph', 'abolitionism', 'bourgeoisie', 'working class', 'Meiji Restoration', 'constitutional monarchy', 'German unification'],
      focus: ['Identify and explain three categories of change with specific evidence.', 'Explain causation for each change — not just what changed but why.', 'Synthesize: are the changes connected, and what does the connection reveal?']
    },
    {
      title: 'Checkpoint 2: Continuities and CCOT Argument',
      subtitle: 'Checks Learning Target 2 — identifying continuities and constructing a CCOT argument.',
      cardDesc: 'Patriarchy, imperial expansion, rural life, coercive labor, CCOT thesis and argumentation.',
      learningTargets: [lesson.learningTargets[1].target],
      successCriteria: [lesson.successCriteria[1].criteria],
      prompt: 'Identify and explain two major continuities in the period c. 1750–1900 — using specific evidence for each. For each continuity, explain why it persisted despite the era\'s dramatic changes: what forces maintained it, who benefited from it, and what would have been required to change it? Then construct a CCOT argument of 3–4 sentences: state a defensible thesis that evaluates the relationship between the period\'s changes and continuities; use specific evidence from at least two world regions or two categories of change/continuity; and explain whether the changes and continuities of 1750–1900 were independent phenomena or causally connected.',
      responseType: 'Checkpoint 2',
      terms: ['CCOT', 'continuity', 'patriarchy', 'imperialism', 'scramble for Africa', 'indentured labor', 'debt peonage', 'rural majority', 'Social Darwinism', 'covature', 'global inequality', 'Berlin Conference'],
      focus: ['Identify and explain two major continuities with evidence and causation.', 'Explain why each continuity persisted — what maintained it?', 'Construct a CCOT argument with thesis, evidence from two regions/categories, and synthesis.']
    }
  ];
})();
