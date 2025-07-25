import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, FunnelChart, Funnel, LabelList, ScatterChart, Scatter, ZAxis } from 'recharts';
import { 
    LayoutDashboard, FolderKanban, BarChart3, Settings, Bell, UserCircle, Search, PlusCircle, Upload, FileDown,
    FileCheck, Landmark, Gavel, Globe, ChevronLeft, ChevronRight, FolderClock, FolderCheck, Percent, Clock, Sparkles, X, Info,
    Hash, Building, FileText, MapPin, Euro
} from 'lucide-react';

// --- DATA GENERATION SCRIPT (EXPANDED) ---
const a_depts = [
    { code: '75', name: 'Paris', fullName: 'Paris' }, 
    { code: '13', name: 'B-du-R', fullName: 'Bouches-du-Rhône' }, 
    { code: '69', name: 'Rhône', fullName: 'Rhône' },
    { code: '31', name: 'H-Garonne', fullName: 'Haute-Garonne' }, 
    { code: '06', name: 'A-Mar.', fullName: 'Alpes-Maritimes' }, 
    { code: '44', name: 'L-Atl.', fullName: 'Loire-Atlantique' },
    { code: '67', name: 'Bas-Rhin', fullName: 'Bas-Rhin' }, 
    { code: '34', name: 'Hérault', fullName: 'Hérault' }, 
    { code: '33', name: 'Gironde', fullName: 'Gironde' },
    { code: '59', name: 'Nord', fullName: 'Nord' }, 
    { code: '35', name: 'I-et-V.', fullName: 'Ille-et-Vilaine' }, 
    { code: '51', name: 'Marne', fullName: 'Marne' },
    { code: '76', name: 'S-Mar.', fullName: 'Seine-Maritime' }, 
    { code: '42', name: 'Loire', fullName: 'Loire' }, 
    { code: '83', name: 'Var', fullName: 'Var' },
    { code: '38', name: 'Isère', fullName: 'Isère' }, 
    { code: '21', name: 'Côte-d\'Or', fullName: 'Côte-d\'Or' }, 
    { code: '49', name: 'M-et-L.', fullName: 'Maine-et-Loire' }
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
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

    const incidentsByDept = useMemo(() => {
        return data.reduce((acc, c) => {
            const code = c.departmentCode;
            if (code) acc[code] = (acc[code] || 0) + 1;
            return acc;
        }, {});
    }, [data]);

    const maxIncidents = Math.max(...Object.values(incidentsByDept), 0);

    const interpolateColor = (color1, color2, factor) => {
        let result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return result;
    };

    const getColor = (value) => {
        if (value === 0) return '#E5E7EB';
        const factor = value / (maxIncidents || 1);
        const color = interpolateColor([255, 247, 188], [217, 95, 2], factor); // Yellow to Red
        return `rgb(${color.join(',')})`;
    };
    
    const handleMouseMove = (e, deptFullName, count) => {
        setTooltip({ visible: true, content: `${deptFullName}: ${count || 0} sinistre(s)`, x: e.pageX, y: e.pageY });
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 p-2 bg-gray-100 rounded-lg">
                {a_depts.map(dept => {
                    const incidentCount = incidentsByDept[dept.code] || 0;
                    const bgColor = getColor(incidentCount);
                    const textColor = (incidentCount / (maxIncidents || 1)) > 0.6 ? 'white' : 'black';
                    return (
                        <div 
                            key={dept.code}
                            className="p-1 text-center rounded-md text-xs flex flex-col items-center justify-center aspect-square transition-transform duration-200 hover:scale-110"
                            style={{ backgroundColor: bgColor, color: textColor }}
                            onMouseMove={(e) => handleMouseMove(e, dept.fullName, incidentCount)}
                            onMouseLeave={() => setTooltip({ visible: false, content: '', x: 0, y: 0 })}
                        >
                            <span className="text-[10px] sm:text-xs">{dept.name}</span>
                            <span className="font-bold text-lg sm:text-xl">{incidentCount}</span>
                        </div>
                    )
                })}
            </div>
            {tooltip.visible && (
                <div className="absolute bg-black/70 text-white p-2 rounded-md text-sm pointer-events-none" style={{ top: tooltip.y - 30, left: tooltip.x + 10 }}>
                    {tooltip.content}
                </div>
            )}
        </div>
    );
};


// --- VIEWS / COMPONENTS ---
const DashboardView = ({ cases }) => {
    const casesInProgress = cases.filter(c => !c.resultat).length;
    const casesClosed = cases.filter(c => c.resultat).length;
    const positiveResults = cases.filter(c => c.resultat === 'Positif').length;
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
                {cases.slice(0, 5).map(c => (
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

// --- FAKE GEMINI API CALL ---
const callGeminiAPI = (caseData) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const riskLevel = caseData.montant > 50000 ? 'Élevé' : 'Moyen';
            const summary = `Le dossier concerne un sinistre de type "${caseData.nature}" déclaré à ${caseData.adresse} pour un montant de ${caseData.montant.toLocaleString('fr-FR')} €.`;
            const analysis = `Le montant déclaré est significatif. Les sinistres de type "${caseData.nature}" dans cette zone présentent un historique de fraude modéré. Aucun lien direct avec des réseaux de fraude connus n'a été établi à ce stade.`;
            const recommendations = `1. Vérifier l'authenticité des factures fournies.\n2. Mener un entretien approfondi avec l'assuré.\n3. Envisager une enquête de voisinage si des incohérences apparaissent.`;
            
            const result = {
                summary,
                riskLevel,
                analysis,
                recommendations
            };
            resolve(result);
        }, 1500); // Simulate network delay
    });
};

const CasesView = ({ cases, setCases, setNotification, isXlsxLoaded }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const paginatedData = cases.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [newCaseData, setNewCaseData] = useState({
        numSinistre: '', compagnie: '', nature: '', adresse: '', montant: ''
    });

    useEffect(() => {
        if (selectedCase) {
            setIsLoading(true);
            setAnalysisResult(null);
            callGeminiAPI(selectedCase).then(result => {
                setAnalysisResult(result);
                setIsLoading(false);
            });
        }
    }, [selectedCase]);

    const handleAnalyseClick = (caseItem) => {
        setSelectedCase(caseItem);
        setIsAnalysisModalOpen(true);
    };

    const closeAnalysisModal = () => {
        setIsAnalysisModalOpen(false);
        setSelectedCase(null);
        setAnalysisResult(null);
    };
    
    const handleNewCaseSubmit = (e) => {
        e.preventDefault();
        const newId = `2025-${String(cases.length + 1).padStart(3, '0')}`;
        const newCase = {
            ...newCaseData,
            id: newId,
            dateSaisine: new Date().toISOString().split('T')[0],
            montant: Number(newCaseData.montant),
            departmentCode: getRandom(a_depts).code,
            dateCloture: null,
            resultat: null,
        };
        setCases([newCase, ...cases]);
        setNotification({type: 'success', message: `Dossier ${newId} ajouté avec succès.`});
        setIsNewCaseModalOpen(false);
        setNewCaseData({ numSinistre: '', compagnie: '', nature: '', adresse: '', montant: '' });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !isXlsxLoaded) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = window.XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = window.XLSX.utils.sheet_to_json(ws);
                // Basic validation and mapping
                const formattedData = data.map((row, index) => ({
                    id: row['id'] || `IMPORT-${index}`,
                    dateSaisine: row['dateSaisine'] || new Date().toISOString().split('T')[0],
                    numSinistre: row['numSinistre'] || 'N/A',
                    compagnie: row['compagnie'] || 'N/A',
                    dateSinistre: row['dateSinistre'] || 'N/A',
                    nature: row['nature'] || 'N/A',
                    adresse: row['adresse'] || 'N/A',
                    departmentCode: row['departmentCode'] || null,
                    montant: Number(row['montant']) || 0,
                    dateCloture: row['dateCloture'] || null,
                    resultat: row['resultat'] || null,
                }));
                setCases(formattedData);
                setNotification({type: 'success', message: `Importation réussie ! ${formattedData.length} dossiers ont été chargés.`});
            } catch (error) {
                console.error("Error reading file:", error);
                setNotification({type: 'error', message: "Erreur lors de la lecture du fichier."});
            }
        };
        reader.readAsBinaryString(file);
    };
    
    const handleExport = () => {
        if (!isXlsxLoaded) {
            setNotification({type: 'error', message: "La librairie d'export n'est pas encore chargée."});
            return;
        }
        const ws = window.XLSX.utils.json_to_sheet(cases);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, "Dossiers");
        window.XLSX.writeFile(wb, "export_dossiers.xlsx");
        setNotification({type: 'success', message: "Exportation réussie."});
    };

    return (
    <>
        {isAnalysisModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Analyse IA Gemini - Dossier {selectedCase?.id}</h3>
                        <button onClick={closeAnalysisModal} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                    </div>
                    {isLoading && <div className="flex justify-center items-center h-48"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div></div>}
                    {analysisResult && (
                        <div className="space-y-4 text-sm">
                            <div><strong className="text-gray-700">Résumé :</strong><p className="text-gray-600">{analysisResult.summary}</p></div>
                            <div><strong className="text-gray-700">Niveau de Risque :</strong> <span className={`font-bold px-2 py-1 rounded-full text-xs ${analysisResult.riskLevel === 'Élevé' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{analysisResult.riskLevel}</span></div>
                            <div><strong className="text-gray-700">Analyse :</strong><p className="text-gray-600">{analysisResult.analysis}</p></div>
                            <div><strong className="text-gray-700">Actions Recommandées :</strong><pre className="bg-gray-100 p-3 rounded-md whitespace-pre-wrap font-sans text-gray-600">{analysisResult.recommendations}</pre></div>
                        </div>
                    )}
                </div>
            </div>
        )}
        {isNewCaseModalOpen && (
             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h3 className="text-xl font-bold text-gray-800">Nouveau Dossier</h3>
                        <button onClick={() => setIsNewCaseModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleNewCaseSubmit} className="space-y-6 p-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="N° de Sinistre" value={newCaseData.numSinistre} onChange={(e) => setNewCaseData({...newCaseData, numSinistre: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                            <div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Compagnie" value={newCaseData.compagnie} onChange={(e) => setNewCaseData({...newCaseData, compagnie: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                            <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Nature du Sinistre" value={newCaseData.nature} onChange={(e) => setNewCaseData({...newCaseData, nature: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                            <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Adresse" value={newCaseData.adresse} onChange={(e) => setNewCaseData({...newCaseData, adresse: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                        </div>
                        <div className="relative"><Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="number" placeholder="Montant" value={newCaseData.montant} onChange={(e) => setNewCaseData({...newCaseData, montant: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                        <div className="flex justify-end gap-2 pt-4"><button type="button" onClick={() => setIsNewCaseModalOpen(false)} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Annuler</button><button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Ajouter</button></div>
                    </form>
                </div>
            </div>
        )}
        <div>
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <FolderKanban className="text-yellow-500" size={32} />
                    <h2 className="text-3xl font-bold text-gray-800">Gestion des Dossiers</h2>
                </div>
                 <div className="flex items-center gap-2">
                     <label htmlFor="file-upload" className={`cursor-pointer flex items-center gap-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition ${!isXlsxLoaded && 'opacity-50 cursor-not-allowed'}`}>
                        <Upload size={20}/> Importer
                    </label>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} accept=".xlsx, .xls, .csv" disabled={!isXlsxLoaded}/>
                    <button onClick={handleExport} className={`flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition ${!isXlsxLoaded && 'opacity-50 cursor-not-allowed'}`} disabled={!isXlsxLoaded}>
                        <FileDown size={20}/> Exporter
                    </button>
                    <button onClick={() => setIsNewCaseModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
                        <PlusCircle size={20}/> Nouveau Dossier
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">N° Dossier</th>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Compagnie</th>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Nature Sinistre</th>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Montant</th>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Résultat</th>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Actions</th>
                                <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Analyse IA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((c) => (
                                <tr key={c.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-4 font-medium text-gray-800">{c.id}</td>
                                    <td className="p-4 text-gray-600">{c.compagnie}</td>
                                    <td className="p-4 text-gray-600">{c.nature}</td>
                                    <td className="p-4 text-gray-600">{c.montant.toLocaleString('fr-FR')} €</td>
                                    <td className="p-4">{getResultPill(c.resultat)}</td>
                                    <td className="p-4"><button className="text-blue-600 hover:underline">Voir</button></td>
                                    <td className="p-4">
                                        <button onClick={() => handleAnalyseClick(c)} className="flex items-center gap-1 text-sm bg-purple-100 text-purple-700 font-semibold py-1 px-2 rounded-lg hover:bg-purple-200 transition">
                                            <Sparkles size={14}/> Analyser
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={currentPage} totalItems={cases.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
            </div>
        </div>
    </>
    );
};

const ReportsView = ({ cases }) => {
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

    const dataByNature = useMemo(() => { const counts = cases.reduce((acc, c) => { acc[c.nature] = (acc[c.nature] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, value: counts[key] })); }, [cases]);
    const dataByResult = useMemo(() => { const closed = cases.filter(c => c.resultat); const counts = closed.reduce((acc, c) => { acc[c.resultat] = (acc[c.resultat] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, value: counts[key] })); }, [cases]);
    const dataByCompany = useMemo(() => { const counts = cases.reduce((acc, c) => { acc[c.compagnie] = (acc[c.compagnie] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, Saisines: counts[key] })).sort((a,b) => b.Saisines - a.Saisines); }, [cases]);
    const dataByMonth = useMemo(() => { const counts = cases.reduce((acc, c) => { const month = c.dateSaisine.substring(0, 7); acc[month] = (acc[month] || 0) + 1; return acc; }, {}); return Object.keys(counts).sort().map(key => ({ name: key, Dossiers: counts[key] })); }, [cases]);
    
    const dataResolutionTime = useMemo(() => {
        const natureGroups = {};
        cases.filter(c => c.dateCloture).forEach(c => {
            const duration = (new Date(c.dateCloture) - new Date(c.dateSaisine)) / (1000 * 3600 * 24);
            if (!natureGroups[c.nature]) natureGroups[c.nature] = [];
            natureGroups[c.nature].push(duration);
        });
        return Object.keys(natureGroups).map(nature => ({
            name: nature,
            'Délai moyen (jours)': Math.round(natureGroups[nature].reduce((a, b) => a + b, 0) / natureGroups[nature].length)
        }));
    }, [cases]);

    const dataAmountVsDuration = useMemo(() => {
        return cases.filter(c => c.dateCloture).map(c => ({
            montant: c.montant,
            duree: (new Date(c.dateCloture) - new Date(c.dateSaisine)) / (1000 * 3600 * 24)
        }));
    }, [cases]);

    const dataResultsByCompany = useMemo(() => {
        const companyGroups = {};
        cases.forEach(c => {
            if (!companyGroups[c.compagnie]) companyGroups[c.compagnie] = { Positif: 0, Négatif: 0 };
            if (c.resultat === 'Positif') companyGroups[c.compagnie].Positif++;
            else if (c.resultat === 'Négatif') companyGroups[c.compagnie].Négatif++;
        });
        return Object.keys(companyGroups).map(compagnie => ({ name: compagnie, ...companyGroups[compagnie] }));
    }, [cases]);

    return (
    <div><h2 className="text-3xl font-bold text-gray-800 mb-6">Analyse & Rapports</h2><div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Répartition par Nature de Sinistre</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={dataByNature} dataKey="value" cx="50%" cy="52%" outerRadius={120} isAnimationActive={false}>{dataByNature.map((entry, index) => <Cell key={`cell-shadow-${index}`} fill={darkenColor(NEW_PALETTE[index % NEW_PALETTE.length], 0.2)} />)}</Pie><Pie data={dataByNature} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={120}>{dataByNature.map((entry, index) => <Cell key={`cell-main-${index}`} fill={NEW_PALETTE[index % NEW_PALETTE.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Résultat Global</h3><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={dataByResult} dataKey="value" cx="50%" cy="52%" outerRadius={100} isAnimationActive={false}>{dataByResult.map((entry, index) => <Cell key={`cell-shadow-${index}`} fill={entry.name === 'Positif' ? darkenColor('#16A085', 0.2) : darkenColor('#E91E63', 0.2)} />)}</Pie><Pie data={dataByResult} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100}>{dataByResult.map((entry, index) => <Cell key={`cell-main-${index}`} fill={entry.name === 'Positif' ? '#16A085' : '#E91E63'} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
        <div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Résultats par Compagnie</h3><ResponsiveContainer width="100%" height={300}><BarChart data={dataResultsByCompany} stackOffset="sign"><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="Positif" fill="#93C572" stackId="stack" /><Bar dataKey="Négatif" fill="#DC2626" stackId="stack" /></BarChart></ResponsiveContainer></div>
        <div className="xl:col-span-4 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Évolution des saisines par mois</h3><ResponsiveContainer width="100%" height={300}><LineChart data={dataByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="Dossiers" stroke="#2980B9" strokeWidth={2} activeDot={{ r: 8 }} /></LineChart></ResponsiveContainer></div>
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Délai moyen de résolution par nature</h3><ResponsiveContainer width="100%" height={300}><BarChart data={dataResolutionTime}><defs><linearGradient id="colorPastel" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2980B9" stopOpacity={0.9}/><stop offset="95%" stopColor="#8E44AD" stopOpacity={0.6}/></linearGradient></defs><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="Délai moyen (jours)" fill="url(#colorPastel)" /></BarChart></ResponsiveContainer></div>
        <div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Montant vs. Durée d'enquête</h3><ResponsiveContainer width="100%" height={300}><ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}><CartesianGrid /><XAxis type="number" dataKey="montant" name="Montant" unit="€" /><YAxis type="number" dataKey="duree" name="Durée" unit="j" /><Tooltip cursor={{ strokeDasharray: '3 3' }} /><Scatter name="Dossiers" data={dataAmountVsDuration} fill="#B22222" /></ScatterChart></ResponsiveContainer></div>
        <div className="xl:col-span-4 bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-gray-800 mb-4">Cartographie des Sinistres</h3><FranceMap data={cases} /></div>
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

const ArpView = ({ allArpFrance, allArpMonde }) => {
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
  const [allCases, setAllCases] = useState(() => generateCasesData(100));
  const [notification, setNotification] = useState({type: '', message: ''});
  const [isXlsxLoaded, setIsXlsxLoaded] = useState(false);
  
  const allFactures = useMemo(() => generateFacturesContacts(100), []);
  const allMairies = useMemo(() => generateMairiesData(100), []);
  const allArpFrance = useMemo(() => generateArpFranceData(100), []);
  const allArpMonde = useMemo(() => generateArpMondeData(100), []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.async = true;
    script.onload = () => setIsXlsxLoaded(true);
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView cases={allCases} />;
      case 'cases': return <CasesView cases={allCases} setCases={setAllCases} setNotification={setNotification} isXlsxLoaded={isXlsxLoaded} />;
      case 'reports': return <ReportsView cases={allCases} />;
      case 'factures': return <PaginatedTableView title="Vérification des Factures" data={allFactures} columns={[{key: 'enseigne', header: 'Enseigne'}, {key: 'mail1', header: 'Mail 1'}, {key: 'contact', header: 'Contact'}, {key: 'observations', header: 'Observations'}]} />;
      case 'mairies': return <PaginatedTableView title="Répertoire des Mairies" data={allMairies} columns={[{key: 'nom', header: 'Nom'}, {key: 'coordonnees', header: 'Coordonnées'}]} />;
      case 'jurisprudence': return <JurisprudenceView />;
      case 'arp': return <ArpView allArpFrance={allArpFrance} allArpMonde={allArpMonde} />;
      case 'settings': return <div>Paramètres</div>;
      default: return <DashboardView cases={allCases}/>;
    }
  };

  const NavLink = ({ id, icon: Icon, label }) => (<button onClick={() => setActiveTab(id)} className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}><Icon size={22} className="mr-4" /><span className="font-medium">{label}</span></button>);
  
  const notifBgColor = notification.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <nav className="w-72 bg-gray-800 text-white flex flex-col p-4">
        <div className="p-4 mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-wider text-white">
                <span>A</span>
                <span className="text-blue-400">P</span>
                <span className="text-gray-400">I</span>
                <span className="text-red-500">S</span>
                <span>33</span>
            </h1>
            <p className="text-sm font-light tracking-[0.3em] text-gray-300 mt-1">— AGENCE —</p>
        </div>
        <div className="flex-grow space-y-2">
          <NavLink id="dashboard" icon={LayoutDashboard} label="Vue d'ensemble" /><NavLink id="cases" icon={FolderKanban} label="Gestion des Dossiers" /><NavLink id="reports" icon={BarChart3} label="Analyse & Rapports" /><hr className="my-2 border-gray-700"/><NavLink id="factures" icon={FileCheck} label="Vérif. Factures" /><NavLink id="mairies" icon={Landmark} label="Mairies" /><NavLink id="jurisprudence" icon={Gavel} label="Jurisprudence" /><NavLink id="arp" icon={Globe} label="ARP" />
        </div>
        <div><NavLink id="settings" icon={Settings} label="Paramètres" /></div>
      </nav>
      <main className="flex-1 flex flex-col relative">
        {notification.message && (
            <div className={`absolute top-4 right-4 ${notifBgColor} px-4 py-3 rounded-lg shadow-lg flex items-center z-50`}>
                <Info size={20} className="mr-3"/>
                <span className="block sm:inline">{notification.message}</span>
                <button onClick={() => setNotification({type:'', message:''})} className="ml-4 font-bold">X</button>
            </div>
        )}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
            <div className="relative w-1/3"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input type="text" placeholder="Rechercher un dossier, un assuré..." className="w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
            <div className="flex items-center gap-4"><Bell size={24} className="text-gray-600" /><div className="flex items-center gap-2"><UserCircle size={32} className="text-gray-600" /><div><p className="font-semibold text-sm text-gray-800">John Doe</p><p className="text-xs text-gray-500">Enquêteur Principal</p></div></div></div>
        </header>
        <div className="flex-1 p-8 overflow-y-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
