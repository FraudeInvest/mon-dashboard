import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
    LayoutDashboard, FolderKanban, BarChart3, Settings, Bell, UserCircle, Search, FileDown, PlusCircle,
    FileCheck, Landmark, Gavel, Globe, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- DATA GENERATION SCRIPT ---
// This section generates a large set of mock data to simulate a real application.

const a_villes = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon"];
const a_compagnies = ["AXA", "MAIF", "GMF", "Allianz", "Groupama", "MACIF", "Matmut", "Crédit Agricole Assurances"];
const a_natures = ["Vol", "Cambriolage", "Incendie", "Accident de la circulation", "Assurance de personne", "Dégât des eaux"];
const a_noms = ["Dupont", "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau"];
const a_prenoms = ["Jean", "Marie", "Pierre", "Sophie", "Luc", "Claire", "Paul", "Julie", "Michel", "Nathalie"];
const a_enseignes = ["BricoMax", "TechFutur", "ModeChic", "AutoPièces Express", "Bijouterie L'Éclat", "Meubles&Co", "SportPerform"];

const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateCasesData = (count) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const dateSaisine = randomDate(new Date(2024, 0, 1), new Date(2025, 6, 23));
        const dateSinistre = randomDate(new Date(2023, 0, 1), dateSaisine);
        const isClotured = Math.random() > 0.4;
        const dateCloture = isClotured ? randomDate(dateSaisine, new Date(2025, 7, 1)) : null;

        data.push({
            id: `2025-${String(i).padStart(3, '0')}`,
            dateSaisine: dateSaisine.toISOString().split('T')[0],
            numSinistre: `SIN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
            compagnie: getRandom(a_compagnies),
            dateSinistre: dateSinistre.toISOString().split('T')[0],
            nature: getRandom(a_natures),
            adresse: `${getRandom(a_villes)} ${String(Math.floor(Math.random() * 9) + 1)}000`,
            montant: Math.floor(Math.random() * (150000 - 500 + 1)) + 500,
            dateCloture: dateCloture ? dateCloture.toISOString().split('T')[0] : null,
            resultat: isClotured ? (Math.random() > 0.3 ? 'Positif' : 'Négatif') : null,
        });
    }
    return data;
};

const generateFacturesContacts = (count) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const enseigne = getRandom(a_enseignes);
        data.push({
            enseigne: `${enseigne} ${getRandom(a_villes)}`,
            mail1: `contact@${enseigne.split(' ')[0].toLowerCase()}.fr`,
            mail2: `verif@${enseigne.split(' ')[0].toLowerCase()}.fr`,
            contact: `Service Client`,
            observations: Math.random() > 0.5 ? 'Réponse rapide.' : 'Nécessite une preuve d\'achat.',
        });
    }
    return data;
};

// --- GENERATED DATA ---
const allCases = generateCasesData(100);
const allFactures = generateFacturesContacts(100);
// For simplicity, Mairies, Jurisprudence, and ARP data remains small.
const mairiesData = [
    { nom: 'Mairie de Paris Centre', coordonnees: '2 Rue Eugène Spuller, 75003 Paris - 01 87 02 61 00' },
    { nom: 'Mairie de Marseille', coordonnees: 'Quai du Port, 13002 Marseille - 04 91 55 11 11' },
    { nom: 'Mairie de Lyon', coordonnees: '1 Place de la Comédie, 69001 Lyon - 04 72 10 30 30' },
];
const arpFrance = [
    { agence: 'Agence Sud-Ouest', identite: 'Paul Durand', adresse: '12 Rue de la Liberté', cp: '31000', commune: 'Toulouse', region: 'Occitanie', telFixe: '05...', telPort: '06...', mail: 'p.durand@arp-so.fr' },
    { agence: 'Agence Grand-Est', identite: 'Laura Klein', adresse: '5 Avenue des Vosges', cp: '67000', commune: 'Strasbourg', region: 'Grand Est', telFixe: '03...', telPort: '07...', mail: 'l.klein@arp-ge.fr' },
];
const arpMonde = [
    { pays: 'Espagne', agence: 'Detectives Iberia', identite: 'Carlos Ruiz', adresse: 'Calle Mayor, 28', cp: '28013', commune: 'Madrid', telFixe: '+34...', telPort: '+34...', mail: 'c.ruiz@detectives-iberia.es', langue: 'Espagnol, Anglais' },
    { pays: 'Italie', agence: 'Investigazioni Roma', identite: 'Giulia Rossi', adresse: 'Via del Corso, 100', cp: '00186', commune: 'Rome', telFixe: '+39...', telPort: '+39...', mail: 'g.rossi@invest-roma.it', langue: 'Italien, Français' },
];


// --- HELPERS & PAGINATION ---
const getResultPill = (result) => {
    if (!result) return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">En attente</span>;
    switch (result) {
      case 'Positif': return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{result}</span>;
      case 'Négatif': return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">{result}</span>;
      default: return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{result}</span>;
    }
};

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-end items-center mt-4">
            <span className="text-sm text-gray-600 mr-4">
                Page {currentPage} sur {totalPages}
            </span>
            <div className="inline-flex">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50">
                    <ChevronLeft size={16} />
                </button>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50">
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

// --- VIEWS / COMPONENTS ---

const DashboardView = () => {
    const casesInProgress = allCases.filter(c => !c.result).length;
    const casesClosed = allCases.filter(c => c.result).length;
    const positiveResults = allCases.filter(c => c.result === 'Positif').length;
    const positiveRate = casesClosed > 0 ? ((positiveResults / casesClosed) * 100).toFixed(0) : 0;

    return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Vue d'ensemble</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-gray-500 text-sm font-medium">Dossiers en cours</h3><p className="text-3xl font-bold text-gray-800">{casesInProgress}</p></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-gray-500 text-sm font-medium">Dossiers clôturés</h3><p className="text-3xl font-bold text-gray-800">{casesClosed}</p></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-gray-500 text-sm font-medium">Résultat Positif (global)</h3><p className="text-3xl font-bold text-gray-800">{positiveRate}%</p></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="text-gray-500 text-sm font-medium">Délai moyen d'enquête</h3><p className="text-3xl font-bold text-gray-800">28 jours</p></div>
      </div>
       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-800 mb-4">Dossiers Récents</h3>
            <ul>
                {allCases.slice(0, 5).map(c => (
                    <li key={c.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <div><p className="font-semibold text-gray-700">{c.id} - {c.compagnie}</p><p className="text-sm text-gray-500">{c.nature} - {c.adresse}</p></div>
                        {getResultPill(c.result)}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

const CasesView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const paginatedData = allCases.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
    <div>
      <div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-gray-800">Gestion des Dossiers</h2><button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"><PlusCircle size={20}/> Nouveau Dossier</button></div>
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-200"><tr><th className="p-3 text-sm font-semibold text-gray-600">N° Dossier</th><th className="p-3 text-sm font-semibold text-gray-600">Date Saisine</th><th className="p-3 text-sm font-semibold text-gray-600">Compagnie</th><th className="p-3 text-sm font-semibold text-gray-600">Nature Sinistre</th><th className="p-3 text-sm font-semibold text-gray-600">Montant</th><th className="p-3 text-sm font-semibold text-gray-600">Date Clôture</th><th className="p-3 text-sm font-semibold text-gray-600">Résultat</th><th className="p-3 text-sm font-semibold text-gray-600">Actions</th></tr></thead>
          <tbody>
            {paginatedData.map((c) => (
              <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{c.id}</td><td className="p-3 text-gray-600">{c.dateSaisine}</td><td className="p-3 text-gray-600">{c.compagnie}</td><td className="p-3 text-gray-600">{c.nature}</td><td className="p-3 text-gray-600">{c.montant.toLocaleString('fr-FR')} €</td><td className="p-3 text-gray-600">{c.dateCloture || 'N/A'}</td><td className="p-3">{getResultPill(c.result)}</td><td className="p-3"><button className="text-blue-600 hover:underline">Voir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} totalItems={allCases.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
      </div>
    </div>
    );
};

const ReportsView = () => {
    const COLORS_NATURE = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];
    const COLORS_RESULT = ['#82ca9d', '#ff4d4d'];

    const natureSinistreData = useMemo(() => {
        const counts = allCases.reduce((acc, c) => {
            acc[c.nature] = (acc[c.nature] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
    }, [allCases]);

    const resultData = useMemo(() => {
        const closedCases = allCases.filter(c => c.result);
        const counts = closedCases.reduce((acc, c) => {
            acc[c.result] = (acc[c.result] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
    }, [allCases]);
    
    const compagnieData = useMemo(() => {
        const counts = allCases.reduce((acc, c) => {
            acc[c.compagnie] = (acc[c.compagnie] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(counts).map(key => ({ name: key, Saisines: counts[key] })).sort((a,b) => b.Saisines - a.Saisines);
    }, [allCases]);

    return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Analyse & Rapports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Répartition par Nature de Sinistre</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={natureSinistreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{natureSinistreData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_NATURE[index % COLORS_NATURE.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Résultat Global des Investigations</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={resultData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{resultData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS_RESULT[index % COLORS_RESULT.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </div>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Nombre de saisines par compagnie</h3><ResponsiveContainer width="100%" height={300}><BarChart data={compagnieData} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" width={80} /><Tooltip /><Bar dataKey="Saisines" fill="#8884d8" /></BarChart></ResponsiveContainer></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Cartographie des Sinistres</h3><div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md"><p className="text-gray-500">Le composant de carte sera intégré ici.</p></div></div>
      </div>
    </div>
  );
}
  
const FacturesView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const paginatedData = allFactures.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Vérification des Factures</h2>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b-2 border-gray-200"><tr><th className="p-3 text-sm font-semibold text-gray-600">Nom de l'enseigne</th><th className="p-3 text-sm font-semibold text-gray-600">Mail 1</th><th className="p-3 text-sm font-semibold text-gray-600">Mail 2</th><th className="p-3 text-sm font-semibold text-gray-600">Identité du contact</th><th className="p-3 text-sm font-semibold text-gray-600">Observations</th></tr></thead>
                <tbody>
                    {paginatedData.map((contact, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50"><td className="p-3 font-medium text-gray-800">{contact.enseigne}</td><td className="p-3 text-gray-600">{contact.mail1}</td><td className="p-3 text-gray-600">{contact.mail2}</td><td className="p-3 text-gray-600">{contact.contact}</td><td className="p-3 text-gray-600">{contact.observations}</td></tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalItems={allFactures.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
        </div>
    </div>
    );
};

const MairiesView = () => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Répertoire des Mairies</h2>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto"><p className="text-sm text-gray-500 p-2 mb-4">Import du fichier des Mairies de France.</p><table className="w-full text-left"><thead className="border-b-2 border-gray-200"><tr><th className="p-3 text-sm font-semibold text-gray-600">Nom</th><th className="p-3 text-sm font-semibold text-gray-600">Coordonnées</th></tr></thead><tbody>{mairiesData.map((mairie, index) => (<tr key={index} className="border-b border-gray-200 hover:bg-gray-50"><td className="p-3 font-medium text-gray-800">{mairie.nom}</td><td className="p-3 text-gray-600">{mairie.coordonnees}</td></tr>))}</tbody></table></div>
    </div>
);

const JurisprudenceView = () => (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Jurisprudence</h2>
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-800">Cass. Civ.2, 14 juin 2012, n°11-22.097</h3><p className="mt-2 text-gray-600">Rapport d’enquête reconnu comme preuve de fraude.</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-800">Cass. Civ.1, 10 septembre 2014, n°13-22612</h3><p className="mt-2 text-gray-600">Vie privée et usage des détectives privés.</p></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-800">Cass. Civ.1, 31 octobre 2012, n°11-17.476</h3><p className="mt-2 text-gray-600">Filature légitime dans le cadre d’enquête assurance.</p></div>
        </div>
    </div>
);

const ArpView = () => {
    const [arpTab, setArpTab] = useState('france');
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ARP (Analyse Risques Particuliers)</h2>
            <div className="flex border-b border-gray-200 mb-4"><button onClick={() => setArpTab('france')} className={`py-2 px-4 text-sm font-medium ${arpTab === 'france' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>France</button><button onClick={() => setArpTab('monde')} className={`py-2 px-4 text-sm font-medium ${arpTab === 'monde' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Monde</button></div>
            {arpTab === 'france' && (<div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th>Agence</th><th>Identité</th><th>Adresse</th><th>Mail</th><th>Téléphone</th></tr></thead><tbody>{arpFrance.map((a, i) => <tr key={i} className="border-b"><td>{a.agence}</td><td>{a.identite}</td><td>{`${a.adresse}, ${a.cp} ${a.commune}`}</td><td>{a.mail}</td><td>{a.telPort}</td></tr>)}</tbody></table></div>)}
            {arpTab === 'monde' && (<div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr><th>Pays</th><th>Agence</th><th>Identité</th><th>Adresse</th><th>Mail</th><th>Langue</th></tr></thead><tbody>{arpMonde.map((a, i) => <tr key={i} className="border-b"><td>{a.pays}</td><td>{a.agence}</td><td>{a.identite}</td><td>{`${a.adresse}, ${a.cp} ${a.commune}`}</td><td>{a.mail}</td><td>{a.langue}</td></tr>)}</tbody></table></div>)}
        </div>
    );
};

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'cases': return <CasesView />;
      case 'reports': return <ReportsView />;
      case 'factures': return <FacturesView />;
      case 'mairies': return <MairiesView />;
      case 'jurisprudence': return <JurisprudenceView />;
      case 'arp': return <ArpView />;
      case 'settings': return <div>Paramètres</div>;
      default: return <DashboardView />;
    }
  };

  const NavLink = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}><Icon size={22} className="mr-4" /><span className="font-medium">{label}</span></button>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <nav className="w-72 bg-gray-800 text-white flex flex-col p-4">
        <div className="flex items-center mb-8"><svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg><h1 className="text-xl font-bold ml-2">Fraude Invest.</h1></div>
        <div className="flex-grow space-y-2">
          <NavLink id="dashboard" icon={LayoutDashboard} label="Vue d'ensemble" /><NavLink id="cases" icon={FolderKanban} label="Gestion des Dossiers" /><NavLink id="reports" icon={BarChart3} label="Analyse & Rapports" /><hr className="my-2 border-gray-700"/><NavLink id="factures" icon={FileCheck} label="Vérif. Factures" /><NavLink id="mairies" icon={Landmark} label="Mairies" /><NavLink id="jurisprudence" icon={Gavel} label="Jurisprudence" /><NavLink id="arp" icon={Globe} label="ARP" />
        </div>
        <div><NavLink id="settings" icon={Settings} label="Paramètres" /></div>
      </nav>
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="relative w-1/3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Rechercher un dossier, un assuré..." className="w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div className="flex items-center gap-4"><Bell size={24} className="text-gray-600" /><div className="flex items-center gap-2"><UserCircle size={32} className="text-gray-600" /><div><p className="font-semibold text-sm text-gray-800">John Doe</p><p className="text-xs text-gray-500">Enquêteur Principal</p></div></div></div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
