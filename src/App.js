import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  LayoutDashboard, FolderKanban, BarChart3, Settings, Bell, UserCircle,
  Search, PlusCircle, Upload, FileDown, FileCheck, Landmark, Gavel, Globe,
  ChevronLeft, ChevronRight, FolderClock, FolderCheck, Percent, Clock,
  Sparkles, X, Info, Hash, Building, FileText, MapPin, Euro, ChevronDown,
  Edit, Trash2
} from 'lucide-react';

// --- SCRIPT DE GÉNÉRATION DE DONNÉES ---
const a_depts = [
    { code: '75', name: 'Paris', fullName: 'Paris' }, { code: '92', name: 'Hauts-de-Seine', fullName: 'Hauts-de-Seine' }, { code: '93', name: 'Seine-Saint-Denis', fullName: 'Seine-Saint-Denis' }, { code: '94', name: 'Val-de-Marne', fullName: 'Val-de-Marne' },
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
    { code: '49', name: 'M-et-L.', fullName: 'Maine-et-Loire' },
    { code: '84', name: 'Vaucluse', fullName: 'Vaucluse' },
    { code: '57', name: 'Moselle', fullName: 'Moselle' },
    { code: '77', name: 'Seine-et-Marne', fullName: 'Seine-et-Marne' },
    { code: '78', name: 'Yvelines', fullName: 'Yvelines' },
    { code: '91', name: 'Essonne', fullName: 'Essonne' },
    { code: '95', name: 'Val-d\'Oise', fullName: 'Val-d\'Oise' }
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
        mail1: `contact@${enseigne.split(' ')[0].toLowerCase()}.fr`,
        mail2: `verif@${enseigne.split(' ')[0].toLowerCase()}.fr`,
        contact: `Service Client`,
        observations: Math.random() > 0.5 ? 'Réponse rapide.' : 'Nécessite une preuve d\'achat.',
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
        agence: `Agence ${getRandom(a_regions)}`,
        identite: `${getRandom(a_prenoms)} ${getRandom(a_noms)}`,
        adresse: `${randomNum(1,100)} Avenue de France`,
        cp: `${randomNum(10,95)}000`,
        commune: commune,
        region: getRandom(a_regions),
        telFixe: `0${randomNum(1,5)}...`,
        telPort: `0${randomNum(6,7)}...`,
        mail: `${getRandom(a_noms).toLowerCase()}@arp-fr.com`
    };
});

const generateArpMondeData = (count) => Array.from({ length: count }, () => ({
    pays: getRandom(a_pays),
    agence: `Global Invest ${getRandom(a_pays)}`,
    identite: `${getRandom(a_prenoms)} ${getRandom(a_noms)}`,
    adresse: `${randomNum(1,100)} Main Street`,
    cp: `${randomNum(1000,99999)}`,
    commune: `Capital City`,
    telFixe: `+${randomNum(10,99)}...`,
    telPort: `+${randomNum(10,99)}...`,
    mail: `${getRandom(a_noms).toLowerCase()}@global-invest.com`,
    langue: getRandom(a_langues)
}));

// --- HELPERS & PAGINATION ---
const getResultPill = (result) => {
    if (!result) return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">En attente</span>;
    switch (result) {
        case 'Positif':
            return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{result}</span>;
        case 'Négatif':
            return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">{result}</span>;
        default:
            return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{result}</span>;
    }
};

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-end items-center mt-4">
            <span className="text-sm text-gray-600 mr-4">Page {currentPage} sur {totalPages}</span>
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

// --- COMPOSANT CARTE DE FRANCE LEAFLET ---
const LeafletFranceMap = ({ data, d3 }) => {
    const [geojson, setGeojson] = React.useState(null);
    const [filterNature, setFilterNature] = React.useState("TOUT");
    const [filterCompagnie, setFilterCompagnie] = React.useState("TOUT");
    const mapRef = React.useRef(null);
    const geoJsonLayerRef = React.useRef(null);

    // Charger le GeoJSON une seule fois
    React.useEffect(() => {
        fetch("https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson")
            .then(res => res.json())
            .then(data => setGeojson(data))
            .catch(err => console.error("Erreur chargement GeoJSON", err));
    }, []);

    // Initialiser la carte Leaflet
    React.useEffect(() => {
        if (window.L && !mapRef.current) {
            const map = window.L.map('leaflet-map').setView([46.5, 2.5], 6);
            mapRef.current = map;
            window.L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
        }
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Mettre à jour la carte lorsque les données ou les filtres changent
    React.useEffect(() => {
        if (geojson && d3 && mapRef.current) {
            // Filtrer les données
            const filteredData = data.filter(row => {
                const matchNature = filterNature === "TOUT" || row.nature === filterNature;
                const matchCompagnie = filterCompagnie === "TOUT" || row.compagnie === filterCompagnie;
                return matchNature && matchCompagnie;
            });

            // Agréger les statistiques
            const stats = {};
            filteredData.forEach(({ departmentCode, montant }) => {
                const code = departmentCode;
                const value = Number(montant);
                if (!stats[code]) stats[code] = { montantTotal: 0, count: 0 };
                stats[code].montantTotal += value;
                stats[code].count += 1;
            });

            const maxMontant = d3.max(Object.values(stats), d => d.montantTotal) || 0;
            const colorScale = d3.scaleSequential()
                .domain([0, maxMontant])
                .interpolator(d3.interpolateTurbo);

            const onEachFeature = (feature, layer) => {
                const code = feature.properties.code;
                const info = stats[code];
                if (info) {
                    layer.setStyle({
                        fillColor: colorScale(info.montantTotal),
                        weight: 1, color: "#000", fillOpacity: 0.9,
                    });
                } else {
                    layer.setStyle({
                        fillColor: "#f0f0f0",
                        weight: 1, color: "#aaa", fillOpacity: 0.3,
                    });
                }
                layer.bindTooltip(
                    `<strong>${feature.properties.nom}</strong><br/>
                     Sinistres: ${info?.count || 0}<br/>
                     Montant total: ${(info?.montantTotal || 0).toLocaleString()} €`
                );
                layer.on({
                    mouseover: e => e.target.setStyle({ weight: 2, color: "#333" }),
                    mouseout: e => e.target.setStyle({ weight: 1, color: info ? "#000" : "#aaa" }),
                });
            };

            // Supprimer l'ancienne couche si elle existe
            if (geoJsonLayerRef.current) {
                mapRef.current.removeLayer(geoJsonLayerRef.current);
            }

            // Ajouter la nouvelle couche
            geoJsonLayerRef.current = window.L.geoJSON(geojson, { onEachFeature });
            geoJsonLayerRef.current.addTo(mapRef.current);
        }
    }, [geojson, d3, data, filterNature, filterCompagnie]);
    
    if (!d3 || !window.L) {
        return <div>Chargement des librairies de la carte...</div>;
    }

    const natures = Array.from(new Set(data.map(r => r.nature))).sort();
    const compagnies = Array.from(new Set(data.map(r => r.compagnie))).sort();

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
                <select value={filterNature} onChange={e => setFilterNature(e.target.value)} className="p-2 border rounded-md shadow-sm">
                    <option value="TOUT">Tous types de sinistre</option>
                    {natures.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <select value={filterCompagnie} onChange={e => setFilterCompagnie(e.target.value)} className="p-2 border rounded-md shadow-sm">
                    <option value="TOUT">Toutes compagnies</option>
                    {compagnies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div id="leaflet-map" style={{ height: "600px", width: "100%", borderRadius: '8px' }}></div>
        </div>
    );
};


// --- VUES / COMPOSANTS ---
const DashboardView = ({ cases, onCardClick }) => {
    const casesInProgress = cases.filter(c => !c.resultat).length;
    const casesClosed = cases.filter(c => c.resultat).length;
    const positiveResults = cases.filter(c => c.resultat === 'Positif').length;
    const positiveRate = casesClosed > 0 ? ((positiveResults / casesClosed) * 100).toFixed(0) : 0;

    const StatCard = ({ title, value, icon: Icon, colorClass, onClick }) => (
        <button onClick={onClick} disabled={!onClick} className={`p-6 rounded-lg shadow-md text-white text-left w-full transition-transform duration-200 hover:scale-105 ${colorClass} ${onClick ? 'cursor-pointer' : 'cursor-default'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-sm font-medium opacity-80">{title}</h3>
                    <p className="text-3xl font-bold">{value}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-lg">
                    <Icon size={24} />
                </div>
            </div>
        </button>
    );

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Vue d'ensemble</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Dossiers en cours" value={casesInProgress} icon={FolderClock} colorClass="bg-blue-500" onClick={() => onCardClick('en-cours', 'Dossiers en cours')} />
                <StatCard title="Dossiers clôturés" value={casesClosed} icon={FolderCheck} colorClass="bg-green-500" onClick={() => onCardClick('clotures', 'Dossiers clôturés')} />
                <StatCard title="Résultat Positif (global)" value={`${positiveRate}%`} icon={Percent} colorClass="bg-purple-500" onClick={() => onCardClick('positif', 'Dossiers avec résultat positif')} />
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

// --- FAUX APPEL API GEMINI ---
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
        }, 1500); // Simuler le délai réseau
    });
};

const CasesView = ({ cases, setCases, setNotification, isXlsxLoaded }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 10;

    const [selectedIds, setSelectedIds] = React.useState([]);
    const paginatedData = cases.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = React.useState(false);
    const [isNewCaseModalOpen, setIsNewCaseModalOpen] = React.useState(false);
    const [editingCase, setEditingCase] = React.useState(null);
    const [selectedCase, setSelectedCase] = React.useState(null);
    const [analysisResult, setAnalysisResult] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [newCaseData, setNewCaseData] = React.useState({
        numSinistre: '',
        compagnie: '',
        nature: '',
        adresse: '',
        montant: ''
    });

    React.useEffect(() => {
        if (editingCase) {
            setNewCaseData(editingCase);
            setIsNewCaseModalOpen(true);
        }
    }, [editingCase]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(paginatedData.map(c => c.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (e, id) => {
        if (e.target.checked) {
            setSelectedIds([...selectedIds, id]);
        } else {
           setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        }
    };

    const handleDeleteSelected = () => {
        setCases(cases.filter(c => !selectedIds.includes(c.id)));
        setNotification({ type: 'success', message: `${selectedIds.length} dossier(s) supprimé(s).` });
        setSelectedIds([]);
    };

    const handleDeleteOne = (id) => {
        setCases(cases.filter(c => c.id !== id));
        setNotification({ type: 'success', message: `Dossier ${id} supprimé.` });
    };

    const handleEditClick = (caseItem) => {
        setEditingCase(caseItem);
    };

    React.useEffect(() => {
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

    const handleCaseSubmit = (e) => {
        e.preventDefault();
        if (editingCase) {
            // Mettre à jour le dossier existant
            setCases(cases.map(c => c.id === editingCase.id ? { ...c, ...newCaseData, montant: Number(newCaseData.montant) } : c));
            setNotification({ type: 'success', message: `Dossier ${editingCase.id} mis à jour.` });
        } else {
            // Ajouter un nouveau dossier
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
            setNotification({ type: 'success', message: `Dossier ${newId} ajouté.` });
        }
        setIsNewCaseModalOpen(false);
        setEditingCase(null);
        setNewCaseData({ numSinistre: '', compagnie: '', nature: '', adresse: '', montant: '' });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setNotification({ type: 'error', message: "Veuillez sélectionner un fichier Excel (.xlsx ou .xls)" });
            return;
        }

        const allowedExtensions = /\.(xlsx|xls)$/i;
        if (!allowedExtensions.test(file.name)) {
            setNotification({ type: 'error', message: "Format de fichier non pris en charge. Veuillez choisir un fichier .xlsx ou .xls" });
            return;
        }

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = window.XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = window.XLSX.utils.sheet_to_json(ws, { raw: false });

                if (data.length === 0) {
                    setNotification({ type: 'error', message: "Le fichier est vide ou mal formaté." });
                    return;
                }
                
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
                setNotification({ type: 'success', message: `Importation réussie ! ${formattedData.length} dossiers ont été chargés.` });
            } catch (error) {
                setNotification({ type: 'error', message: "Erreur lors de la lecture du fichier. Vérifiez son contenu." });
                console.error("Erreur lecture fichier : ", error);
            }
        };
        reader.readAsBinaryString(file);
    };

    const handleExport = () => {
        if (!isXlsxLoaded) {
           setNotification({ type: 'error', message: "La librairie d'export n'est pas encore chargée." });
            return;
        }
        const ws = window.XLSX.utils.json_to_sheet(cases);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, "Dossiers");
        window.XLSX.writeFile(wb, "export_dossiers.xlsx");
       setNotification({ type: 'success', message: "Exportation réussie." });
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
                            <h3 className="text-xl font-bold text-gray-800">{editingCase ? `Modifier le Dossier ${editingCase.id}` : 'Nouveau Dossier'}</h3>
                            <button onClick={() => { setIsNewCaseModalOpen(false); setEditingCase(null); }} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCaseSubmit} className="space-y-6 p-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative"><Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="N° de Sinistre" value={newCaseData.numSinistre} onChange={(e) => setNewCaseData({...newCaseData, numSinistre: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                                <div className="relative"><Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Compagnie" value={newCaseData.compagnie} onChange={(e) => setNewCaseData({...newCaseData, compagnie: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                                <div className="relative"><FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Nature du Sinistre" value={newCaseData.nature} onChange={(e) => setNewCaseData({...newCaseData, nature: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                                <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="text" placeholder="Adresse" value={newCaseData.adresse} onChange={(e) => setNewCaseData({...newCaseData, adresse: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                            </div>
                            <div className="relative"><Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/><input type="number" placeholder="Montant" value={newCaseData.montant} onChange={(e) => setNewCaseData({...newCaseData, montant: e.target.value})} className="pl-10 mt-1 block w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required /></div>
                            <div className="flex justify-end gap-2 pt-4"><button type="button" onClick={() => { setIsNewCaseModalOpen(false); setEditingCase(null); }} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Annuler</button><button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editingCase ? 'Enregistrer' : 'Ajouter'}</button></div>
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
                        {selectedIds.length > 0 && (
                            <button onClick={handleDeleteSelected} className="flex items-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition">
                                <Trash2 size={20}/> Supprimer ({selectedIds.length})
                            </button>
                        )}
                         <label className="flex items-center gap-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition cursor-pointer">
                            <Upload size={20}/> Importer
                            <input type="file" className="hidden" onChange={handleFileUpload} accept=".xlsx, .xls" />
                        </label>
                        <button onClick={handleExport} className="flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition">
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
                                    <th className="p-4 w-12"><input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} className="form-checkbox h-5 w-5 text-blue-600 rounded" /></th>
                                    <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">N° Dossier</th>
                                    <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Compagnie</th>
                                    <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Nature Sinistre</th>
                                    <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Montant</th>
                                    <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Résultat</th>
                                    <th className="p-4 text-sm font-semibold text-blue-800 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                               {paginatedData.map((c) => (
                                    <tr key={c.id} className={`border-b border-gray-200 ${selectedIds.includes(c.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                                        <td className="p-4"><input type="checkbox" checked={selectedIds.includes(c.id)} onChange={(e) => handleSelectOne(e, c.id)} className="form-checkbox h-5 w-5 text-blue-600 rounded" /></td>
                                        <td className="p-4 font-medium text-gray-800">{c.id}</td>
                                        <td className="p-4 text-gray-600">{c.compagnie}</td>
                                        <td className="p-4 text-gray-600">{c.nature}</td>
                                        <td className="p-4 text-gray-600">{c.montant.toLocaleString('fr-FR')} €</td>
                                        <td className="p-4">{getResultPill(c.resultat)}</td>
                                        <td className="p-4 flex items-center gap-2">
                                            <button onClick={() => handleAnalyseClick(c)} className="text-purple-600 hover:text-purple-800"><Sparkles size={18}/></button>
                                            <button onClick={() => handleEditClick(c)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                            <button onClick={() => handleDeleteOne(c.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
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

const ReportsView = ({ cases, d3 }) => {
    const NEW_PALETTE = ['#2980B9', '#16A085', '#F39C12', '#E91E63', '#8E44AD', '#3498DB', '#1ABC9C'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">{`${(percent * 100).toFixed(0)}%`}</text>);
    };

    const darkenColor = (color, percent) => {
        let f = parseInt(color.slice(1), 16),
            t = percent < 0 ? 0 : 255,
            p = percent < 0 ? percent * -1 : percent,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
    };

    const dataByNature = React.useMemo(() => { const counts = cases.reduce((acc, c) => { acc[c.nature] = (acc[c.nature] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, value: counts[key] })); }, [cases]);
    const dataByResult = React.useMemo(() => { const closed = cases.filter(c => c.resultat); const counts = closed.reduce((acc, c) => { acc[c.resultat] = (acc[c.resultat] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, value: counts[key] })); }, [cases]);
    const dataByCompany = React.useMemo(() => { const counts = cases.reduce((acc, c) => { acc[c.compagnie] = (acc[c.compagnie] || 0) + 1; return acc; }, {}); return Object.keys(counts).map(key => ({ name: key, Saisines: counts[key] })).sort((a, b) => b.Saisines - a.Saisines); }, [cases]);
    const dataByMonth = React.useMemo(() => { const counts = cases.reduce((acc, c) => { const month = c.dateSaisine.substring(0, 7); acc[month] = (acc[month] || 0) + 1; return acc; }, {}); return Object.keys(counts).sort().map(key => ({ name: key, Dossiers: counts[key] })); }, [cases]);

    const dataResolutionTime = React.useMemo(() => {
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

    const dataAmountVsDuration = React.useMemo(() => {
        return cases.filter(c => c.dateCloture).map(c => ({
            montant: c.montant,
            duree: (new Date(c.dateCloture) - new Date(c.dateSaisine)) / (1000 * 3600 * 24)
        }));
    }, [cases]);

    const dataResultsByCompany = React.useMemo(() => {
        const companyGroups = {};
        cases.forEach(c => {
            if (!companyGroups[c.compagnie]) companyGroups[c.compagnie] = { Positif: 0, Négatif: 0 };
            if (c.resultat === 'Positif') companyGroups[c.compagnie].Positif++;
            else if (c.resultat === 'Négatif') companyGroups[c.compagnie].Négatif++;
        });
        return Object.keys(companyGroups).map(compagnie => ({ name: compagnie, ...companyGroups[compagnie] }));
    }, [cases]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Analyse & Rapports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Cartographie des Sinistres</h3>
                    <LeafletFranceMap data={cases} d3={d3} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Répartition par Nature de Sinistre</h3>
                   <ResponsiveContainer width="100%" height={300}>
                       <PieChart>
                           <Pie data={dataByNature} dataKey="value" cx="50%" cy="52%" outerRadius={100} isAnimationActive={false}>{dataByNature.map((entry, index) => <Cell key={`cell-shadow-${index}`} fill={darkenColor(NEW_PALETTE[index % NEW_PALETTE.length], 0.2)} />)}</Pie>
                           <Pie data={dataByNature} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100}>{dataByNature.map((entry, index) => <Cell key={`cell-main-${index}`} fill={NEW_PALETTE[index % NEW_PALETTE.length]} />)}</Pie>
                           <Tooltip />
                        </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Résultat Global</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={dataByResult} dataKey="value" cx="50%" cy="52%" outerRadius={100} isAnimationActive={false}>{dataByResult.map((entry, index) => <Cell key={`cell-shadow-${index}`} fill={entry.name === 'Positif' ? darkenColor('#16A085', 0.2) : darkenColor('#E91E63', 0.2)} />)}</Pie>
                            <Pie data={dataByResult} dataKey="value" nameKey="name" cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={100}>{dataByResult.map((entry, index) => <Cell key={`cell-main-${index}`} fill={entry.name === 'Positif' ? '#16A085' : '#E91E63'} />)}</Pie>
                            <Tooltip />
                        </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Délai moyen de résolution par nature</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dataResolutionTime}>
                           <defs><linearGradient id="colorPastel" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2980B9" stopOpacity={0.9}/><stop offset="95%" stopColor="#8E44AD" stopOpacity={0.6}/></linearGradient></defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="Délai moyen (jours)" fill="url(#colorPastel)" />
                        </BarChart>
                   </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Évolution des saisines par mois</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dataByMonth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Dossiers" stroke="#2980B9" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                   </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-gray-800 mb-4">Résultats par Compagnie</h3>
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={dataResultsByCompany} stackOffset="sign">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Positif" fill="#93C572" stackId="stack" />
                            <Bar dataKey="Négatif" fill="#DC2626" stackId="stack" />
                        </BarChart>
                   </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

const PaginatedTableView = ({ title, data, columns }) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 10;
    const paginatedData = data.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b-2 border-gray-200">
                       <tr>{columns.map(col => <th key={col.key} className="p-3 text-sm font-semibold text-gray-600">{col.header}</th>)}</tr>
                    </thead>
                   <tbody>{paginatedData.map((item, index) => (<tr key={index} className="border-b border-gray-200 hover:bg-gray-50">{columns.map(col => <td key={col.key} className="p-3 text-gray-600">{item[col.key]}</td>)}</tr>))}</tbody>
                </table>
                <Pagination currentPage={currentPage} totalItems={data.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
};

const JurisprudenceView = ({ searchTerm }) => {
    const [openItem, setOpenItem] = React.useState(null);
    const jurisprudenceData = [
        {
            category: "Recevabilité de la Preuve",
            cases: [
                { ref: "Cass. Civ.2, 14 juin 2012, n°11-22.097", principle: "Le rapport d'enquête privée est recevable comme preuve.", implication: "Les rapports produits sont des éléments de preuve légitimes pour démontrer une fraude, à condition que l'enquête ait été menée de manière légale." },
                { ref: "Cass. Soc, 6 décembre 2007, n°06-43.797", principle: "La filature organisée par un employeur pour contrôler un salarié est un moyen de preuve illicite.", implication: "La surveillance doit être justifiée et proportionnée, et ne peut pas constituer une atteinte disproportionnée à la vie privée, même dans un contexte de suspicion de fraude." }
            ]
        },
        {
            category: "Atteinte à la Vie Privée",
            cases: [
                { ref: "Cass. Civ.1, 10 septembre 2014, n°13-22612", principle: "Le droit à la preuve ne peut justifier la production d'éléments portant atteinte à la vie privée.", implication: "Toute investigation doit respecter scrupuleusement la vie privée de la personne enquêtée. Les informations collectées dans des lieux privés sans consentement sont irrecevables." },
                { ref: "Cass. Civ.2, 5 novembre 2015, n°14-19.092", principle: "L'utilisation de photographies issues d'un compte Facebook privé, sans le consentement de l'intéressé, porte atteinte à la vie privée.", implication: "La collecte d'informations sur les réseaux sociaux doit se limiter aux profils et publications publics. L'accès à des contenus restreints est illégal." }
            ]
        }
    ];

    const filteredJurisprudenceData = React.useMemo(() => {
        if (!searchTerm) return jurisprudenceData;
        const lowercasedFilter = searchTerm.toLowerCase();
        return jurisprudenceData
            .map(category => ({
                ...category,
                cases: category.cases.filter(item =>
                    Object.values(item).some(value =>
                        String(value).toLowerCase().includes(lowercasedFilter)
                    )
                )
            }))
            .filter(category => category.cases.length > 0);
    }, [searchTerm]);

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <Gavel className="text-gray-700" size={32} />
                <h2 className="text-3xl font-bold text-gray-800">Jurisprudence</h2>
            </div>
            <div className="space-y-4">
               {filteredJurisprudenceData.map((category, catIndex) => (
                    <div key={catIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <h3 className="text-xl font-bold text-gray-800 p-4 bg-gray-50">{category.category}</h3>
                        <div className="divide-y">
                           {category.cases.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    <button onClick={() => setOpenItem(openItem === `${catIndex}-${itemIndex}` ? null : `${catIndex}-${itemIndex}`)} className="w-full flex justify-between items-center p-4 text-left font-semibold text-blue-800 hover:bg-blue-50">
                                       <span>{item.ref}</span>
                                       <ChevronDown className={`transform transition-transform ${openItem === `${catIndex}-${itemIndex}` ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openItem === `${catIndex}-${itemIndex}` && (
                                        <div className="p-4 bg-gray-50 text-sm">
                                           <p className="font-bold text-gray-700">Principe :</p>
                                           <p className="mb-2 text-gray-600">{item.principle}</p>
                                           <p className="font-bold text-gray-700">Implication pratique :</p>
                                           <p className="text-gray-600">{item.implication}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ArpView = ({ arpFranceData, arpMondeData }) => {
    const [arpTab, setArpTab] = React.useState('france');
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ARP (Analyse Risques Particuliers)</h2>
            <div className="flex border-b border-gray-200 mb-4">
                <button onClick={() => setArpTab('france')} className={`py-2 px-4 text-sm font-medium ${arpTab === 'france' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>France</button>
                <button onClick={() => setArpTab('monde')} className={`py-2 px-4 text-sm font-medium ${arpTab === 'monde' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Monde</button>
            </div>
            {arpTab === 'france' && <PaginatedTableView title="" data={arpFranceData} columns={[{key: 'agence', header: 'Agence'}, {key: 'identite', header: 'Identité'}, {key: 'commune', header: 'Commune'}, {key: 'mail', header: 'Mail'}]} />}
            {arpTab === 'monde' && <PaginatedTableView title="" data={arpMondeData} columns={[{key: 'pays', header: 'Pays'}, {key: 'agence', header: 'Agence'}, {key: 'identite', header: 'Identité'}, {key: 'mail', header: 'Mail'}, {key: 'langue', header: 'Langue'}]} />}
        </div>
    );
};

// --- APPLICATION PRINCIPALE ---
export default function App() {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [allCases, setAllCases] = React.useState(() => generateCasesData(200));
    const [notification, setNotification] = React.useState({ type: '', message: '' });
    const [libsLoaded, setLibsLoaded] = React.useState({ xlsx: false, d3: false, leaflet: false });
    const [filteredCases, setFilteredCases] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState('');

    const allFactures = React.useMemo(() => generateFacturesContacts(100), []);
    const allMairies = React.useMemo(() => generateMairiesData(100), []);
    const allArpFrance = React.useMemo(() => generateArpFranceData(100), []);
    const allArpMonde = React.useMemo(() => generateArpMondeData(100), []);

    React.useEffect(() => {
        const loadScript = (src, key) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                 setLibsLoaded(prev => ({ ...prev, [key]: true }));
                 return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => setLibsLoaded(prev => ({ ...prev, [key]: true }));
            document.body.appendChild(script);
        };

        const loadCss = (href) => {
            if (document.querySelector(`link[href="${href}"]`)) return;
            const link = document.createElement('link');
            link.href = href;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        };
        
        loadCss("https://unpkg.com/leaflet@1.7.1/dist/leaflet.css");
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', 'xlsx');
        loadScript('https://d3js.org/d3.v7.min.js', 'd3');
        loadScript("https://unpkg.com/leaflet@1.7.1/dist/leaflet.js", 'leaflet');

    }, []);

    React.useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ type: '', message: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const genericFilter = (data, term) => {
        if (!term) return data;
        const lowercasedTerm = term.toLowerCase();
        return data.filter(item => 
            Object.values(item).some(value => 
                String(value).toLowerCase().includes(lowercasedTerm)
            )
        );
    };

    const filteredAllCases = React.useMemo(() => {
        if (!searchTerm) return allCases;
        const lowercasedTerm = searchTerm.toLowerCase();

        // Spécifiquement pour la recherche par année sur les dossiers
        if (/^\d{4}$/.test(lowercasedTerm)) {
            return allCases.filter(item =>
                (item.dateSaisine && item.dateSaisine.startsWith(lowercasedTerm)) ||
                (item.id && item.id.startsWith(lowercasedTerm))
            );
        }

        // Recherche générique pour les autres termes
        return allCases.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(lowercasedTerm)
            )
        );
    }, [allCases, searchTerm]);
    
    const filteredAllFactures = React.useMemo(() => genericFilter(allFactures, searchTerm), [allFactures, searchTerm]);
    const filteredAllMairies = React.useMemo(() => genericFilter(allMairies, searchTerm), [allMairies, searchTerm]);
    const filteredAllArpFrance = React.useMemo(() => genericFilter(allArpFrance, searchTerm), [allArpFrance, searchTerm]);
    const filteredAllArpMonde = React.useMemo(() => genericFilter(allArpMonde, searchTerm), [allArpMonde, searchTerm]);

    const renderContent = () => {
        if (filteredCases) {
            return (
                <div>
                    <button onClick={() => setFilteredCases(null)} className="flex items-center gap-2 mb-4 text-blue-600 hover:text-blue-800">
                        <ChevronLeft size={20} /> Retour à la vue d'ensemble
                    </button>
                    <PaginatedTableView 
                       title={filteredCases.title}
                       data={filteredCases.data}
                        columns={[
                            {key: 'id', header: 'N° Dossier'},
                            {key: 'compagnie', header: 'Compagnie'},
                            {key: 'nature', header: 'Nature'},
                            {key: 'montant', header: 'Montant'},
                            {key: 'resultat', header: 'Résultat'}
                        ]}
                    />
                </div>
            );
        }
        
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView cases={allCases} onCardClick={(filter, title) => setFilteredCases({data: allCases.filter(c => filter === 'en-cours' ? !c.resultat : filter === 'clotures' ? c.resultat : c.resultat === 'Positif'), title})} />;
            case 'cases':
                return <CasesView cases={filteredAllCases} setCases={setAllCases} setNotification={setNotification} isXlsxLoaded={libsLoaded.xlsx} />;
            case 'reports':
                return <ReportsView cases={allCases} d3={libsLoaded.d3 ? window.d3 : null} />;
            case 'factures':
                return <PaginatedTableView title="Vérification des Factures" data={filteredAllFactures} columns={[{key: 'enseigne', header: 'Enseigne'}, {key: 'mail1', header: 'Mail 1'}, {key: 'contact', header: 'Contact'}, {key: 'observations', header: 'Observations'}]} />;
            case 'mairies':
                return <PaginatedTableView title="Répertoire des Mairies" data={filteredAllMairies} columns={[{key: 'nom', header: 'Nom'}, {key: 'coordonnees', header: 'Coordonnées'}]} />;
            case 'jurisprudence':
                return <JurisprudenceView searchTerm={searchTerm} />;
            case 'arp':
                return <ArpView arpFranceData={filteredAllArpFrance} arpMondeData={filteredAllArpMonde} />;
            case 'settings':
                return <div><h2 className="text-3xl font-bold text-gray-800">Paramètres</h2><p className="mt-4">Cette section est en cours de construction.</p></div>;
            default:
                return <DashboardView cases={allCases} onCardClick={(filter, title) => setFilteredCases({data: allCases.filter(c => filter === 'en-cours' ? !c.resultat : filter === 'clotures' ? c.resultat : c.resultat === 'Positif'), title})} />;
        }
    };

    const NavLink = ({ id, icon: Icon, label }) => (
        <button onClick={() => { setActiveTab(id); setFilteredCases(null); }} className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
            <Icon size={22} className="mr-4" />
            <span className="font-medium">{label}</span>
        </button>
    );

    const notifBgColor = notification.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700';
    const tabsWithSearchBar = ['cases', 'factures', 'mairies', 'jurisprudence', 'arp'];
    const showSearchBar = tabsWithSearchBar.includes(activeTab);

    return (
        <div className="flex h-screen bg-white font-sans">
            <nav className="w-72 bg-gradient-to-b from-blue-900 to-gray-800 text-white flex flex-col p-4">
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
                    <NavLink id="dashboard" icon={LayoutDashboard} label="Vue d'ensemble" />
                    <NavLink id="cases" icon={FolderKanban} label="Gestion des Dossiers" />
                    <NavLink id="reports" icon={BarChart3} label="Analyse & Rapports" />
                    <hr className="my-2 border-gray-700"/>
                    <NavLink id="factures" icon={FileCheck} label="Vérif. Factures" />
                    <NavLink id="mairies" icon={Landmark} label="Mairies" />
                    <NavLink id="jurisprudence" icon={Gavel} label="Jurisprudence" />
                    <NavLink id="arp" icon={Globe} label="ARP" />
                </div>
                <div>
                    <NavLink id="settings" icon={Settings} label="Paramètres" />
                </div>
            </nav>
            <main className="flex-1 flex flex-col relative bg-gray-50">
                {notification.message && (
                    <div className={`absolute top-4 right-4 ${notifBgColor} px-4 py-3 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-down`}>
                        <Info size={20} className="mr-3"/>
                        <span className="block sm:inline">{notification.message}</span>
                        <button onClick={() => setNotification({type:'', message:''})} className="ml-4 font-bold"><X size={16}/></button>
                    </div>
                )}
                <header className={`bg-white shadow-sm p-4 flex items-center ${showSearchBar ? 'justify-between' : 'justify-end'}`}>
                    {showSearchBar && (
                       <div className="relative w-1/3">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                           <input 
                                type="text" 
                                placeholder="Rechercher..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                       </div>
                    )}
                    <div className="flex items-center gap-4">
                        <Bell size={24} className="text-gray-600" />
                            <UserCircle size={32} className="text-gray-600" />
                            <div>
                                <p className="font-semibold text-sm text-gray-800">APIS33</p>
                                <p className="text-xs text-gray-500">Enquêteur Principal</p>
                           </div>
                        </div>
                    </header>
                <div className="flex-1 p-8 overflow-y-auto">
                    {renderContent()}
               </div>
           </main>
        </div>
    );
}
