(() => {
  const lesson = window.BEHISTORICAL_LESSON;
  if (!lesson) return;

  lesson.collegeBoardKeyConcepts = [
    {
      code: 'KC-5.9.I',
      theme: 'Social Structures / Gender',
      text: "Industrialization produced new social classes and transformed gender ideology. Middle-class domestic ideology — the 'cult of true womanhood' / 'angel in the house' — placed men in the public sphere and women in the private sphere of home and family. This ideology required middle-class families to maintain wives who did not work for wages, signaling economic status. Working-class women and children, by contrast, labored in factories, mines, and domestic service — their wages essential to family survival. Coverture law subsumed married women's legal identity into their husbands'; women could not own property, sign contracts, or vote.",
      illustrativeExamples: ['Cult of true womanhood / separate spheres ideology', 'Coverture law and married women\'s property rights', 'Mines Act 1842 (restricting women and children in mines)', 'Factory Acts 1844 and 1847', 'Married Women\'s Property Act (Britain, 1882)', 'Domestic service as primary female occupation']
    },
    {
      code: 'KC-5.9.II',
      theme: 'Reform Movements / Ideology',
      text: "First-wave feminism emerged in the mid-19th century, challenging women's legal, political, and economic subordination. The Seneca Falls Convention (1848) and the Declaration of Sentiments demanded equal rights including suffrage. Women's suffrage gained first victories in New Zealand (1893), Australia (1902), and Finland (1906). In Britain, the constitutional NUWSS (1897) and the militant WSPU (1903) waged parallel suffrage campaigns. Social Darwinism — Herbert Spencer's 'survival of the fittest' applied to human society — justified class, racial, and gender hierarchies as natural, providing ideological support for imperialism and opposition to feminist demands.",
      illustrativeExamples: ['Seneca Falls Convention (1848) and Declaration of Sentiments', 'Elizabeth Cady Stanton and Susan B. Anthony', 'New Zealand women\'s suffrage (1893)', 'Emmeline Pankhurst and the WSPU (1903)', 'Herbert Spencer and Social Darwinism', 'Mary Wollstonecraft, Vindication of the Rights of Woman (1792)', 'John Stuart Mill and Harriet Taylor Mill, The Subjection of Women (1869)']
    }
  ];

  lesson.first10 = {
    ...lesson.first10,
    title: 'First & 10: The Sphere',
    embedUrl: 'first-and-10-topic-5-9-society-and-industrialization-capture.html',
    note: 'Read the First & 10 narrative, answer the three questions, build your AI Coach prompt, then return to the 5.9 lesson path.'
  };

  lesson.map = {
    ...lesson.map,
    key: [
      { label: 'The geography of women\'s suffrage victories', detail: 'The first women\'s suffrage victories came not in the major industrial powers but in British settler colonies and Nordic countries: New Zealand (1893), Australia (1902), Finland (1906), Norway (1913). This geographic pattern is not accidental. British settler colonies had relatively small populations, less entrenched aristocratic traditions, and stronger traditions of local democratic self-governance that made suffrage extension politically easier. Nordic countries had strong cooperative and progressive political traditions. The major industrial powers — Britain, United States, France, Germany — had more entrenched political establishments and more organized opposition. The pattern reveals that democratic ideology does not automatically produce democratic extension: political change required specific organizational conditions, social movements, and political opportunities.' },
      { label: 'The geography of the domestic ideal', detail: 'The ideology of domesticity — the separate spheres, the cult of true womanhood — was explicitly a middle-class ideology concentrated in the industrializing regions of Britain, Western Europe, and North America. It required economic conditions that only middle-class families could maintain: a male wage sufficient to support a family without women\'s paid labor. In working-class industrial neighborhoods, women\'s paid work was economic necessity; in rural regions, women\'s agricultural and craft labor was always essential to household survival. The domestic ideal was also exported through colonialism: missionaries and colonial administrators promoted it as part of the civilizing mission in Africa, Asia, and the Pacific — which often undermined existing gender arrangements in colonized societies without providing the material conditions that would have made the domestic ideal viable.' },
      { label: 'Social Darwinism and the map of empire', detail: 'Social Darwinism\'s ideological power was connected to the specific geographic moment of European imperial expansion in the 1880s–1890s. As European powers partitioned Africa and consolidated control over Asia, Social Darwinism provided the scientific-sounding justification: European dominance was not imperialism but natural selection. The geographic correlation between Social Darwinist ideology and the scramble for Africa was not coincidental — Social Darwinism made racial and national hierarchy a scientific claim precisely when European powers were making that claim politically through colonial expansion. The ideology was most influential in Britain, the United States, and Germany — the leading industrial and imperial powers of the era.' },
      { label: 'Working-class women\'s labor in the industrial geography', detail: 'Working-class women\'s paid labor was concentrated in specific industrial regions: the textile mills of Lancashire (England), Lowell and Fall River (Massachusetts), and Lyon (France) employed large numbers of women and girls. Coal mines in South Wales, Yorkshire, and the Ruhr employed women in surface work. Domestic service employed women across all urban areas. As factory legislation restricted women\'s industrial labor in the 1840s–1870s, women were pushed toward lower-paid occupations: sweated trades (home-based piece-work), laundry, domestic service. The geographic pattern of women\'s industrial labor changed as legislation changed: the geography of women\'s work is not natural but a product of legal frameworks, economic conditions, and political decisions.' }
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
    desc: "Argue before Parliament for or against the Married Women's Property Act (1882); debate constitutional vs. militant tactics with Millicent Fawcett and Emmeline Pankhurst; or confront Herbert Spencer in a public debate on whether poverty is a product of individual unfitness or structural exploitation."
  };

  lesson.skillBuilder = {
    label: 'Comparison practice',
    title: 'Comparing Women\'s Experiences in Industrial Society: Middle Class vs. Working Class',
    intro: 'Comparison for Topic 5.9 requires identifying both what middle-class and working-class women shared and where their experiences fundamentally differed — and synthesizing what the comparison reveals about gender ideology, industrial capitalism, and the limits of feminist reform in the 19th century. The most common AP error is treating "women" as a unified category without distinguishing by class, race, region, and material circumstances.',
    steps: [
      { label: 'Identify a meaningful similarity', text: 'Similarity: Both middle-class and working-class women in the industrial era were subordinated by the same legal framework: coverture denied married women of all classes independent legal identity; women of all classes lacked the right to vote; women\'s wages (when they earned wages) were consistently lower than men\'s for comparable work. Both groups were subject to the ideology of domesticity as a normative claim — even working-class women who could not live within the domestic ideal were judged against it by middle-class reformers, employers, and courts. And women of both classes faced restrictions on higher education and professional careers: the exclusion of women from universities, law, and medicine was not class-specific but applied broadly across the industrial era.' },
      { label: 'Identify a meaningful difference (material conditions and daily reality)', text: 'Difference: Middle-class and working-class women lived the ideology of domesticity very differently. Middle-class women were idealized as "angels in the house" — their domestic role celebrated as morally superior, their exclusion from paid labor framed as elevation rather than restriction. Working-class women worked for wages out of economic necessity — in factories, mines, and domestic service — and their paid labor was not framed as virtuous domesticity but as a marker of lower status. The Mines Act 1842, restricting women\'s underground labor, was partly a humanitarian reform and partly an effort by male workers to eliminate female competition. The consequence was that middle-class feminist movements often pushed for legal reforms (education, property rights, suffrage) that would benefit primarily middle-class women, without addressing the structural economic conditions — low wages, unsafe workplaces, absence of childcare — that determined the quality of working-class women\'s lives.' },
      { label: 'Write the synthesis statement', text: 'Synthesis: Comparing middle-class and working-class women\'s experiences reveals that gender ideology in the industrial era was simultaneously a shared framework (all women were subject to coverture, disenfranchisement, and the normative claim of domesticity) and a class-differentiated experience (the domestic ideal was a material reality for some women and an impossible aspiration for others). This comparison reveals a tension within the first-wave feminist movement: demands for suffrage, education, and property rights were most relevant to middle-class women who had leisure and education to use these rights — while working-class women needed wage equality, workplace safety, and childcare. The feminist movement was not wrong to pursue legal equality; but its priorities reflected the class position of its predominantly middle-class leadership.' }
    ],
    prompt: 'In 3–4 sentences, compare the experiences of middle-class and working-class women in the industrial era (c. 1800–1900). Identify one meaningful similarity in their legal and social position and one meaningful difference in their daily material lives. End with a synthesis: what does comparing these two groups reveal about the relationship between gender ideology, class, and the limits of first-wave feminist reform?'
  };

  lesson.checkpoints = [
    {
      title: 'Checkpoint 1: Gender Ideology and Social Class in Industrial Society',
      subtitle: 'Checks Learning Target 1 — domesticity, coverture, working-class women, and industrial-era gender structures.',
      cardDesc: 'Cult of true womanhood, separate spheres, coverture, Mines Act 1842, Factory Acts, class and gender.',
      learningTargets: [lesson.learningTargets[0].target],
      successCriteria: [lesson.successCriteria[0].criteria],
      prompt: 'Explain the ideology of domesticity — what were its core claims about women\'s nature and proper role, and how did it construct gender difference as natural rather than historical? Then explain how the material conditions of working-class women\'s lives both required and contradicted this ideology: how did the economic necessity of women\'s wage labor interact with an ideology that defined paid work as outside the proper female sphere? End with a synthesis: whose interests did the domestic ideology serve — and whose did it obscure?',
      responseType: 'Checkpoint 1',
      terms: ['cult of true womanhood', 'separate spheres', 'coverture', 'angel in the house', 'Mines Act 1842', 'Factory Acts', 'domestic service', 'Married Women\'s Property Act', 'sweated trades', 'gender pay gap'],
      focus: ['Explain the domestic ideology — its claims and how it constructed gender as natural.', 'Explain how working-class women\'s material conditions contradicted the ideology.', 'Synthesize: whose interests did the ideology serve?']
    },
    {
      title: 'Checkpoint 2: Feminist Movements and Social Darwinism',
      subtitle: 'Checks Learning Target 2 — Seneca Falls, suffrage campaigns, Social Darwinism, and feminist responses.',
      cardDesc: 'Seneca Falls 1848, NUWSS, WSPU, New Zealand 1893, Herbert Spencer, Social Darwinism, Mill and Taylor Mill.',
      learningTargets: [lesson.learningTargets[1].target],
      successCriteria: [lesson.successCriteria[1].criteria],
      prompt: 'Explain how the first-wave feminist movement challenged women\'s political and legal subordination — what were the central demands of the Declaration of Sentiments (1848), and how did suffrage campaigns in Britain argue for women\'s right to vote? Then explain how Social Darwinism provided ideological justification for opposing feminist demands — what specific arguments did Social Darwinists make about gender hierarchy, and how did feminist intellectuals (Wollstonecraft, Mill and Taylor Mill) challenge those arguments? End with a synthesis: what does the debate between Social Darwinism and feminism reveal about the relationship between science, ideology, and political power in the industrial era?',
      responseType: 'Checkpoint 2',
      terms: ['Declaration of Sentiments', 'Seneca Falls Convention', 'women\'s suffrage', 'NUWSS', 'WSPU', 'Emmeline Pankhurst', 'Social Darwinism', 'Herbert Spencer', 'survival of the fittest', 'Mary Wollstonecraft', 'John Stuart Mill', 'Harriet Taylor Mill'],
      focus: ['Explain the central demands of first-wave feminism and how suffrage campaigns argued their case.', 'Explain Social Darwinist arguments about gender and feminist intellectual responses.', 'Synthesize: what does this debate reveal about science, ideology, and political power?']
    }
  ];
})();
