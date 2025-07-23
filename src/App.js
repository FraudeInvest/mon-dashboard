import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, FunnelChart, Funnel, LabelList, ScatterChart, Scatter, ZAxis } from 'recharts';
import { 
    LayoutDashboard, FolderKanban, BarChart3, Settings, Bell, UserCircle, Search, PlusCircle,
    FileCheck, Landmark, Gavel, Globe, ChevronLeft, ChevronRight, FolderClock, FolderCheck, Percent, Clock
} from 'lucide-react';

// --- DATA GENERATION SCRIPT (EXPANDED) ---
const a_depts = [
    { code: '75', name: 'Paris' }, { code: '13', name: 'Bouches-du-Rhône' }, { code: '69', name: 'Rhône' },
    { code: '31', name: 'Haute-Garonne' }, { code: '06', name: 'Alpes-Maritimes' }, { code: '44', name: 'Loire-Atlantique' },
    { code: '67', name: 'Bas-Rhin' }, { code: '34', name: 'Hérault' }, { code: '33', name: 'Gironde' },
    { code: '59', name: 'Nord' }, { code: '35', name: 'Ille-et-Vilaine' }, { code: '51', name: 'Marne' },
    { code: '76', name: 'Seine-Maritime' }, { code: '42', name: 'Loire' }, { code: '83', name: 'Var' },
    { code: '38', name: 'Isère' }, { code: '21', name: 'Côte-d\'Or' }, { code: '49', name: 'Maine-et-Loire' }
];
const a_compagnies = ["AXA", "MAIF", "GMF", "Allianz", "Groupama", "MACIF", "Matmut", "Crédit Agricole Assurances"];
const a_natures = ["Vol", "Cambriolage", "Incendie", "Accident de la circulation", "Assurance de personne", "Dégât des eaux"];
const a_noms = ["Dupont", "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Lefebvre", "Leroy"];
const a_prenoms = ["Jean", "Marie", "Pierre", "Sophie", "Luc", "Claire", "Paul", "Julie", "Michel", "Nathalie", "Antoine", "Valérie"];
const a_enseignes = ["BricoMax", "TechFutur", "ModeChic", "AutoPièces Express", "Bijouterie L'Éclat", "Meubles&Co", "SportPerform", "JardiVerdure"];
const a_regions = ["Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Occitanie", "Hauts-de-France", "Nouvelle-Aquitaine", "Grand Est"];
const a_pays = ["Espagne", "Italie", "Allemagne", "Royaume-Uni", "Belgique", "Suisse", "Portugal", "Pays-Bas"];
const a_langues = ["Français", "Anglais", "Italien", "Espagnol", "Portugais", "Allemand"];

const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateCasesData = (count) => Array.from({ length: count }, (_, i) => {
    const dateSaisine = randomDate(new Date(2024, 0, 1), new Date(2025, 6, 23));
    const isClotured = Math.random() > 0.4;
    const dept = getRandom(a_depts);
    return {
        id: `2025-${String(i + 1).padStart(3, '0')}`,
        dateSaisine: dateSaisine.toISOString().split('T')[0],
        numSinistre: `SIN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        compagnie: getRandom(a_compagnies),
        dateSinistre: randomDate(new Date(2023, 0, 1), dateSaisine).toISOString().split('T')[0],
        nature: getRandom(a_natures),
        adresse: dept.name,
        departmentCode: dept.code,
        montant: randomNum(500, 150000),
        dateCloture: isClotured ? randomDate(dateSaisine, new Date(2025, 7, 1)).toISOString().split('T')[0] : null,
        resultat: isClotured ? (Math.random() > 0.3 ? 'Positif' : 'Négatif') : null,
    };
});

const generateFacturesContacts = (count) => Array.from({ length: count }, () => {
    const enseigne = getRandom(a_enseignes);
    const ville = getRandom(a_depts).name;
    return {
        enseigne: `${enseigne} ${ville}`,
        mail1: `contact@${enseigne.split(' ')[0].toLowerCase()}.fr`, mail2: `verif@${enseigne.split(' ')[0].toLowerCase()}.fr`,
        contact: `Service Client`, observations: Math.random() > 0.5 ? 'Réponse rapide.' : 'Nécessite une preuve d\'achat.',
    };
});

const generateMairiesData = (count) => Array.from({ length: count }, () => {
    const ville = getRandom(a_depts).name;
    return {
        nom: `Mairie de ${ville}`,
        coordonnees: `${randomNum(1,150)} Rue de la République, ${ville} - 0${randomNum(1,5)} ${randomNum(10,99)} ${randomNum(10,99)} ${randomNum(10,99)} ${randomNum(10,99)}`
    };
});

const generateArpFranceData = (count) => Array.from({ length: count }, () => {
    const commune = getRandom(a_depts).name;
    return {
        agence: `Agence ${getRandom(a_regions)}`, identite: `${getRandom(a_prenoms)} ${getRandom(a_noms)}`,
        adresse: `${randomNum(1,100)} Avenue de France`, cp: `${randomNum(10,95)}000`, commune: commune,
        region: getRandom(a_regions), telFixe: `0${randomNum(1,5)}...`, telPort: `0${randomNum(6,7)}...`, mail: `${getRandom(a_noms).toLowerCase()}@arp-fr.com`
    };
});

const generateArpMondeData = (count) => Array.from({ length: count }, () => ({
    pays: getRandom(a_pays), agence: `Global Invest ${getRandom(a_pays)}`, identite: `${getRandom(a_prenoms)} ${getRandom(a_noms)}`,
    adresse: `${randomNum(1,100)} Main Street`, cp: `${randomNum(1000,99999)}`, commune: `Capital City`,
    telFixe: `+${randomNum(10,99)}...`, telPort: `+${randomNum(10,99)}...`, mail: `${getRandom(a_noms).toLowerCase()}@global-invest.com`, langue: getRandom(a_langues)
}));

// --- GENERATED DATA ---
const allCases = generateCasesData(100);
const allFactures = generateFacturesContacts(100);
const allMairies = generateMairiesData(100);
const allArpFrance = generateArpFranceData(100);
const allArpMonde = generateArpMondeData(100);

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
        <div className="flex justify-end items-center mt-4"><span className="text-sm text-gray-600 mr-4">Page {currentPage} sur {totalPages}</span><div className="inline-flex"><button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"><ChevronLeft size={16} /></button><button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"><ChevronRight size={16} /></button></div></div>
    );
};

// --- MAP COMPONENT ---
const FranceMap = ({ data }) => {
    const [geoData, setGeoData] = useState(null);
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
    const [isD3Loaded, setIsD3Loaded] = useState(!!window.d3);

    useEffect(() => {
        if (window.d3) {
            setIsD3Loaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = "https://d3js.org/d3.v7.min.js";
        script.async = true;
        script.onload = () => setIsD3Loaded(true);
        script.onerror = () => console.error("D3.js script could not be loaded.");
        document.body.appendChild(script);
        return () => { if (document.body.contains(script)) document.body.removeChild(script); };
    }, []);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson')
            .then(response => response.json())
            .then(data => setGeoData(data))
            .catch(error => console.error("Could not load geojson data", error));
    }, []);

    const incidentsByDept = useMemo(() => {
        return data.reduce((acc, c) => {
            const code = c.departmentCode;
            if (code) acc[code] = (acc[code] || 0) + 1;
            return acc;
        }, {});
    }, [data]);

    if (!isD3Loaded || !geoData) {
        return <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-md"><p className="text-gray-500">Chargement de la carte...</p></div>;
    }

    const maxIncidents = Math.max(...Object.values(incidentsByDept), 0);
    const colorScale = window.d3.scaleSequential(window.d3.interpolateViridis).domain([0, maxIncidents || 1]);
    const projection = window.d3.geoConicConformal().center([2.454071, 46.279229]).scale(2600).translate([450 / 2, 400 / 2]);
    const pathGenerator = window.d3.geoPath().projection(projection);

    const handleMouseMove = (e, deptName, count) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setTooltip({ visible: true, content: `${deptName}: ${count || 0} sinistre(s)`, x: e.clientX - left + 20, y: e.clientY - top });
    };

    return (
        <div className="relative">
            <svg width="100%" height="400" viewBox="0 0 450 400">
                <g>
                    {geoData.features.map(dept => {
                        const deptCode = dept.properties.code;
                        const incidentCount = incidentsByDept[deptCode] || 0;
                        return (
                            <path
                                key={dept.properties.code}
                                d={pathGenerator(dept)}
                                fill={incidentCount > 0 ? colorScale(incidentCount) : '#E5E7EB'}
                                stroke="white"
                                strokeWidth={0.5}
                                onMouseMove={(e) => handleMouseMove(e, dept.properties.nom, incidentCount)}
                                onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                            />
                        );
                    })}
                </g>
            </svg>
            {tooltip.visible && (
                <div className="absolute bg-black/70 text-white p-2 rounded-md text-sm pointer-events-none" style={{ top: tooltip.y, left: tooltip.x }}>
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};


// --- VIEWS / COMPONENTS ---
const DashboardView = () => {
    const casesInProgress = allCases.filter(c => !c.resultat).length;
    const casesClosed = allCases.filter(c => c.resultat).length;
    const positiveResults = allCases.filter(c => c.resultat === 'Positif').length;
    const positiveRate = casesClosed > 0 ? ((positiveResults / casesClosed) * 100).toFixed(0) : 0;
    
    const StatCard = ({ title, value, icon: Icon, colorClass }) => (
        <div className={`p-6 rounded-lg shadow-md text-white ${colorClass}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-medium opacity-80">{title}</h3>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                    <Icon size={24} />
                </div>
            </div>
        </div>
    );

    return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Vue d'ensemble</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Dossiers en cours" value={casesInProgress} icon={FolderClock} colorClass="bg-blue-500" />
            <StatCard title="Dossiers clôturés" value={casesClosed} icon={FolderCheck} colorClass="bg-green-500" />
            <StatCard title="Résultat Positif (global)" value={`${positiveRate}%`} icon={Percent} colorClass="bg-purple-500" />
            <StatCard title="Délai moyen d'enquête" value="28 jours" icon={Clock} colorClass="bg-orange-500" />
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-800 mb-4">Dossiers Récents</h3>
            <ul>
                {allCases.slice(0, 5).map(c => (
                    <li key={c.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <div>
                            <p className="font-semibold text-gray-700">{c.id} - {c.compagnie}</p>
                            <p className="text-sm text-gray-500">{c.nature} - {c.adresse}</p>
                        </div>
                        {getResultPill(c.resultat)}
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
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <FolderKanban className="text-yellow-500" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Gestion des Dossiers</h2>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
                <PlusCircle size={20}/> Nouveau Dossier
            </button>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">N° Dossier</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Date Saisine</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Compagnie</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Nature Sinistre</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Montant</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Date Clôture</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Résultat</th>
                            <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((c) => (
                            <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-800">{c.id}</td>
                                <td className="p-4 text-gray-600">{c.dateSaisine}</td>
                                <td className="p-4 text-gray-600">{c.compagnie}</td>
                                <td className="p-4 text-gray-600">{c.nature}</td>
                                <td className="p-4 text-gray-600">{c.montant.toLocaleString('fr-FR')} €</td>
                                <td className="p-4 text-gray-600">{c.dateCloture || 'N/A'}</td>
                                <td className="p-4">{getResultPill(c.resultat)}</td>
                                <td className="p-4"><button className="text-blue-600 hover:underline">Voir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalItems={allCases.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
        </div>
    </div>
    );
};

const ReportsView = () => {
    const NEW_PALETTE = ['#2980B9', '#16A085', '#F39C12', '#E91E63', '#8E44AD', '#3498DB', '#1ABC9C'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>);
    };
    
    const darkenColor = (color, percent) => {
        let f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    };

    const dataByNature = useMemo(() => { const counts = allCases.reduce((acc, c) => { acc[c.nature] = (acc[c.nature] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, value: counts[key] })); }, []);
    const dataByResult = useMemo(() => { const closed = allCases.filter(c => c.resultat); const counts = closed.reduce((acc, c) => { acc[c.resultat] = (acc[c.resultat] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, value: counts[key] })); }, []);
    const dataByCompany = useMemo(() => { const counts = allCases.reduce((acc, c) => { acc[c.compagnie] = (acc[c.compagnie] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, Saisines: counts[key] })).sort((a,b) => b.Saisines - a.Saisines); }, []);
    const dataByMonth = useMemo(() => { const counts = allCases.reduce((acc, c) => { const month = c.dateSaisine.substring(0, 7); acc[month] = (acc[month] || 0) + 1; return acc; }, {}); return Object.keys(counts).sort().map(key => ({ name: key, Dossiers: counts[key] })); }, []);
    
    const dataResolutionTime = useMemo(() => {
        const natureGroups = {};
        allCases.filter(c => c.dateCloture).forEach(c => {
            const duration = (new Date(c.dateCloture) - new Date(c.dateSaisine)) / (1000 * 3600 * 24);
            if (!natureGroups[c.nature]) natureGroups[c.nature] = [];
            natureGroups[c.nature].push(duration);
        });
        return Object.keys(natureGroups).map(nature => ({
            name: nature,
            'Délai moyen (jours)': Math.round(natureGroups[nature].reduce((a, b) => a + b, 0) / natureGroups[nature].length)
        }));
    }, []);

    const dataAmountVsDuration = useMemo(() => {
        return allCases.filter(c => c.dateCloture).map(c => ({
            montant: c.montant,
            duree: (new Date(c.dateCloture) - new Date(c.dateSaisine)) / (1000 * 3600 * 24)
        }));
    }, []);

    const dataResultsByCompany = useMemo(() => {
        const companyGroups = {};
        allCases.forEach(c => {
            if (!companyGroups[c.compagnie]) companyGroups[c.compagnie] = { Positif: 0, Négatif: 0 };
            if (c.resultat === 'Positif') companyGroups[c.compagnie].Positif++;
            else if (c.resultat === 'Négatif') companyGroups[c.compagnie].Négatif++;
        });
        return Object.keys(companyGroups).map(compagnie => ({ name: compagnie, ...companyGroups[compagnie] }));
    }, []);

    return (
    <div><h2 className="text-3xl font-bold text-gray-800 mb-6">Analyse & Rapports</h2><div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Répartition par Nature de Sinistre</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={dataByNature} dataKey="value" cx="50%" cy="52%" outerRadius={120} isAnimationActive={false}>{dataByNature.map((entry, index) => <Cell key={`cell-shadow-${index}`} fill={darkenColor(NEW_PALETTE[index % NEW_PALETTE.length], 0.2)} />)}</Pie><Pie data={dataByNature} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={120}>{dataByNature.map((entry, index) => <Cell key={`cell-main-${index}`} fill={NEW_PALETTE[index % NEW_PALETTE.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Résultat Global</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={dataByResult} dataKey="value" cx="50%" cy="52%" outerRadius={100} isAnimationActive={false}>{dataByResult.map((entry, index) => <Cell key={`cell-shadow-${index}`} fill={entry.name === 'Positif' ? darkenColor('#16A085', 0.2) : darkenColor('#E91E63', 0.2)} />)}</Pie><Pie data={dataByResult} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100}>{dataByResult.map((entry, index) => <Cell key={`cell-main-${index}`} fill={entry.name === 'Positif' ? '#16A085' : '#E91E63'} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Résultats par Compagnie</h3><ResponsiveContainer width="100%" height={300}><BarChart data={dataResultsByCompany} stackOffset="sign"><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="Positif" fill="#93C572" stackId="stack" /><Bar dataKey="Négatif" fill="#DC2626" stackId="stack" /></BarChart></ResponsiveContainer></div>
        <div className="xl:col-span-4 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Évolution des saisines par mois</h3><ResponsiveContainer width="100%" height={300}><LineChart data={dataByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="Dossiers" stroke="#2980B9" strokeWidth={2} activeDot={{ r: 8 }} /></LineChart></ResponsiveContainer></div>
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Délai moyen de résolution par nature</h3><ResponsiveContainer width="100%" height={300}><BarChart data={dataResolutionTime}><defs><linearGradient id="colorPastel" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2980B9" stopOpacity={0.9}/><stop offset="95%" stopColor="#8E44AD" stopOpacity={0.6}/></linearGradient></defs><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="Délai moyen (jours)" fill="url(#colorPastel)" /></BarChart></ResponsiveContainer></div>
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Montant vs. Durée d'enquête</h3><ResponsiveContainer width="100%" height={300}><ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}><CartesianGrid /><XAxis type="number" dataKey="montant" name="Montant" unit="€" /><YAxis type="number" dataKey="duree" name="Durée" unit="j" /><Tooltip cursor={{ strokeDasharray: '3 3' }} /><Scatter name="Dossiers" data={dataAmountVsDuration} fill="#B22222" /></ScatterChart></ResponsiveContainer></div>
        <div className="xl:col-span-4 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Cartographie des Sinistres</h3><FranceMap data={allCases} /></div>
    </div></div>
  );
}
  
const PaginatedTableView = ({ title, data, columns }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const paginatedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    return (
        <div><h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2><div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto"><table className="w-full text-left">
            <thead className="border-b-2 border-gray-200"><tr>{columns.map(col => <th key={col.key} className="p-3 text-sm font-semibold text-gray-600">{col.header}</th>)}</tr></thead>
            <tbody>{paginatedData.map((item, index) => (<tr key={index} className="border-b border-gray-200 hover:bg-gray-50">{columns.map(col => <td key={col.key} className="p-3 text-gray-600">{item[col.key]}</td>)}</tr>))}</tbody>
        </table><Pagination currentPage={currentPage} totalItems={data.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} /></div></div>
    );
};

const JurisprudenceView = () => (
    <div><h2 className="text-3xl font-bold text-gray-800 mb-6">Jurisprudence</h2><div className="space-y-6"><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-800">Cass. Civ.2, 14 juin 2012, n°11-22.097</h3><p className="mt-2 text-gray-600">Rapport d’enquête reconnu comme preuve de fraude.</p></div><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-800">Cass. Civ.1, 10 septembre 2014, n°13-22612</h3><p className="mt-2 text-gray-600">Vie privée et usage des détectives privés.</p></div><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-lg text-gray-800">Cass. Civ.1, 31 octobre 2012, n°11-17.476</h3><p className="mt-2 text-gray-600">Filature légitime dans le cadre d’enquête assurance.</p></div></div></div>
);

const ArpView = () => {
    const [arpTab, setArpTab] = useState('france');
    return (
        <div><h2 className="text-3xl font-bold text-gray-800 mb-6">ARP (Analyse Risques Particuliers)</h2><div className="flex border-b border-gray-200 mb-4"><button onClick={() => setArpTab('france')} className={`py-2 px-4 text-sm font-medium ${arpTab === 'france' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>France</button><button onClick={() => setArpTab('monde')} className={`py-2 px-4 text-sm font-medium ${arpTab === 'monde' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Monde</button></div>
        {arpTab === 'france' && <PaginatedTableView title="" data={allArpFrance} columns={[{key: 'agence', header: 'Agence'}, {key: 'identite', header: 'Identité'}, {key: 'commune', header: 'Commune'}, {key: 'mail', header: 'Mail'}]} />}
        {arpTab === 'monde' && <PaginatedTableView title="" data={allArpMonde} columns={[{key: 'pays', header: 'Pays'}, {key: 'agence', header: 'Agence'}, {key: 'identite', header: 'Identité'}, {key: 'mail', header: 'Mail'}, {key: 'langue', header: 'Langue'}]} />}
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
      case 'factures': return <PaginatedTableView title="Vérification des Factures" data={allFactures} columns={[{key: 'enseigne', header: 'Enseigne'}, {key: 'mail1', header: 'Mail 1'}, {key: 'contact', header: 'Contact'}, {key: 'observations', header: 'Observations'}]} />;
      case 'mairies': return <PaginatedTableView title="Répertoire des Mairies" data={allMairies} columns={[{key: 'nom', header: 'Nom'}, {key: 'coordonnees', header: 'Coordonnées'}]} />;
      case 'jurisprudence': return <JurisprudenceView />;
      case 'arp': return <ArpView />;
      case 'settings': return <div>Paramètres</div>;
      default: return <DashboardView />;
    }
  };

  const NavLink = ({ id, icon: Icon, label }) => (<button onClick={() => setActiveTab(id)} className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}><Icon size={22} className="mr-4" /><span className="font-medium">{label}</span></button>);

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
