const HIGH_IMPACT_KEYWORDS = ['Nature', 'Science', 'PNAS', 'Nature Climate', 'Scientific Reports'];

export function filterValidPublications(data) {
  return data.filter(row => row.REF && row.REF.trim());
}

export function groupPublicationsByYear(publications) {
  const grouped = {};
  publications.forEach(pub => {
    const year = pub.ANO || 'Sem ano';
    if (!grouped[year]) grouped[year] = [];
    grouped[year].push(pub);
  });
  return grouped;
}

export function sortYearsDescending(years) {
  return [...years].sort((a, b) => {
    if (a === 'Sem ano') return 1;
    if (b === 'Sem ano') return -1;
    return parseInt(b) - parseInt(a);
  });
}

export function calculatePublicationStats(publications) {
  const total = publications.length;

  const recentPubs = publications.filter(pub => {
    const year = parseInt(pub.ANO);
    return year >= 2023 && year <= 2024;
  }).length;

  const highImpact = publications.filter(pub =>
    HIGH_IMPACT_KEYWORDS.some(keyword =>
      pub.REF.toLowerCase().includes(keyword.toLowerCase())
    )
  ).length;

  const years = publications
    .map(pub => parseInt(pub.ANO))
    .filter(year => !isNaN(year));

  const yearsActive = years.length > 0
    ? Math.max(...years) - Math.min(...years) + 1
    : 0;

  return { total, recentPubs, highImpact, yearsActive };
}
