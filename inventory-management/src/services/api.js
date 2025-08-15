const STORAGE_KEY = 'inventory:jobSites';
const INV_KEY = 'inventory:inventories';

const defaultJobSites = [
  { id: '1', name: '1658 E 23rd St, Brooklyn, NY 11229, USA', status: 'On Road' },
  { id: '2', name: '1705 E 22nd St, Brooklyn, NY 11229, USA', status: 'Completed' },
  { id: '3', name: '47 Lake St, Brooklyn, NY 11223, USA', status: 'On Hold' },
  { id: '4', name: '256 Bay 19th St, Brooklyn, NY 11214, USA', status: 'On Hold' },
  { id: '5', name: '6908 13th Ave, Brooklyn, NY 11228, USA', status: 'Completed' },
];

const defaultInventories = {
  '1': [
    { id: 'i1', category: 'Tools', name: 'Hammer', qty: 10 },
    { id: 'i2', category: 'Tools', name: 'Screwdriver', qty: 25 },
    { id: 'i3', category: 'Materials', name: 'Nails', qty: 500 },
  ],
  '2': [
    { id: 'i4', category: 'Tools', name: 'Wrench', qty: 5 },
  ],
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse localStorage', key, e);
    return fallback;
  }
}

function persistJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to persist to localStorage', key, e);
  }
}

let jobSites = loadJSON(STORAGE_KEY, defaultJobSites);
let inventories = loadJSON(INV_KEY, defaultInventories);

export function getJobSites() {
  return Promise.resolve(jobSites.map(s => ({ ...s })));
}

export function addJobSite(site) {
  const newSite = { id: Date.now().toString(), ...site };
  jobSites = [newSite, ...jobSites];
  persistJSON(STORAGE_KEY, jobSites);
  if (!inventories[newSite.id]) inventories[newSite.id] = [];
  persistJSON(INV_KEY, inventories);
  return Promise.resolve(newSite);
}

export function getInventory(jobSiteId) {
  return Promise.resolve((inventories[jobSiteId] || []).map(i => ({ ...i })));
}

export function updateInventoryItem(jobSiteId, itemId, changes) {
  const list = inventories[jobSiteId] || [];
  const idx = list.findIndex(i => i.id === itemId);
  if (idx === -1) return Promise.reject(new Error('not found'));
  list[idx] = { ...list[idx], ...changes };
  inventories[jobSiteId] = list;
  persistJSON(INV_KEY, inventories);
  return Promise.resolve(list[idx]);
}