export const CATEGORY_LABELS = {
  leaders: 'Líderes de Pesquisa',
  postdocs: 'Pós-Doutorandos',
  phd: 'Doutorandos',
  master: 'Mestrandos',
  undergrad: 'Graduandos',
  collaborators: 'Colaboradores',
  'scientific partners': 'Parceiros Científicos',
  alumini: 'Egressos',
  former: 'Ex-Membros'
};

export const ROLE_MAP = {
  leaders: 'Líder de Pesquisa',
  postdocs: 'Pós-Doutorando',
  phd: 'Doutorando',
  master: 'Mestrando',
  undergrad: 'Graduando',
  collaborators: 'Colaborador',
  'scientific partners': 'Parceiro Científico',
  alumini: 'Egresso',
  former: 'Ex-Membro'
};

export const CATEGORY_ORDER = [
  'leaders', 'postdocs', 'phd', 'master', 'undergrad', 'collaborators',
  'scientific partners', 'alumini', 'former'
];

export const KNOWN_CATEGORIES = new Set(Object.keys(CATEGORY_LABELS));

export function filterValidMembers(data) {
  return data.filter(row => row.name && row.name.trim());
}

export function groupMembersByCategory(members) {
  const grouped = {};
  members.forEach(member => {
    const category = member.category || 'collaborators';
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(member);
  });
  return grouped;
}

export function sortedCategories(groupedMembers) {
  return CATEGORY_ORDER.filter(cat => groupedMembers[cat]);
}

export function getRoleLabel(category) {
  return ROLE_MAP[category] || 'Pesquisador';
}

export function calculateTeamStats(members) {
  return {
    total: members.length,
    leaders: members.filter(m => m.category === 'leaders').length,
    postdocs: members.filter(m => m.category === 'postdocs').length,
    students: members.filter(m => ['phd', 'master', 'undergrad'].includes(m.category)).length
  };
}
