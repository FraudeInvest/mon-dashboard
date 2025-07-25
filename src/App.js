import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, FolderKanban, BarChart3, Settings, Bell, UserCircle, Search, PlusCircle, Upload, FileDown,
    FileCheck, Landmark, Gavel, Globe, ChevronLeft, ChevronRight, FolderClock, FolderCheck, Percent, Clock, Sparkles, X, Info
} from 'lucide-react';

const CasesView = ({ cases, setCases, setNotification, isXlsxLoaded }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    const paginatedData = cases.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCase(null);
        setAnalysisResult(null);
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

    const getResultPill = (result) => {
        if (!result) return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">En attente</span>;
        switch (result) {
          case 'Positif': return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{result}</span>;
          case 'Négatif': return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">{result}</span>;
          default: return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{result}</span>;
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
                        <div className="flex justify-between items-center border-b pb-3 mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Analyse IA Gemini - Dossier {selectedCase?.id}</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-48">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                            </div>
                        ) : analysisResult && (
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
                    <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
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
                <div className="flex justify-end items-center mt-4">
                    <span className="text-sm text-gray-600 mr-4">Page {currentPage}</span>
                    <div className="inline-flex">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50">
                            <ChevronLeft size={16} />
                        </button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={paginatedData.length < ITEMS_PER_PAGE} className="px-3 py-1 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
