import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, FolderKanban, BarChart3, Settings, Bell, UserCircle, Search, FileDown, PlusCircle } from 'lucide-react';

// Mock Data for the charts and table
const monthlyCasesData = [
  { name: 'Jan', 'Dossiers Ouverts': 12, 'Dossiers Clôturés': 8 },
  { name: 'Fév', 'Dossiers Ouverts': 19, 'Dossiers Clôturés': 12 },
  { name: 'Mar', 'Dossiers Ouverts': 25, 'Dossiers Clôturés': 20 },
  { name: 'Avr', 'Dossiers Ouverts': 18, 'Dossiers Clôturés': 15 },
  { name: 'Mai', 'Dossiers Ouverts': 22, 'Dossiers Clôturés': 18 },
  { name: 'Juin', 'Dossiers Ouverts': 30, 'Dossiers Clôturés': 25 },
];

const fraudTypeData = [
  { name: 'Fausse Déclaration', value: 400 },
  { name: 'Fraude Organisée', value: 150 },
  { name: 'Sinistre Inexistant', value: 300 },
  { name: 'Exagération du Préjudice', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const casesData = [
  { id: 'FRA-00125', insured: 'Jean Dupont', type: 'Fausse Déclaration', status: 'En cours', priority: 'Haute', date: '2023-05-15' },
  { id: 'FRA-00124', insured: 'Marie Curie', type: 'Sinistre Inexistant', status: 'Clôturé', priority: 'Moyenne', date: '2023-05-12' },
  { id: 'FRA-00123', insured: 'Pierre Martin', type: 'Exagération du Préjudice', status: 'En attente de pièces', priority: 'Basse', date: '2023-05-10' },
  { id: 'FRA-00122', insured: 'Sophie Leroy', type: 'Fraude Organisée', status: 'En cours', priority: 'Haute', date: '2023-05-08' },
  { id: 'FRA-00121', insured: 'Luc Bernard', type: 'Fausse Déclaration', status: 'Clôturé', priority: 'Moyenne', date: '2023-05-05' },
  { id: 'FRA-00120', insured: 'Claire Petit', type: 'Sinistre Inexistant', status: 'En cours', priority: 'Moyenne', date: '2023-05-02' },
];

// Helper to get status color
const getStatusPill = (status) => {
  switch (status) {
    case 'En cours':
      return <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">{status}</span>;
    case 'Clôturé':
      return <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">{status}</span>;
    case 'En attente de pièces':
      return <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">{status}</span>;
    default:
      return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{status}</span>;
  }
};

// Helper to get priority color
const getPriorityPill = (priority) => {
    switch (priority) {
      case 'Haute':
        return <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">{priority}</span>;
      case 'Moyenne':
        return <span className="px-2 py-1 text-xs font-medium text-orange-800 bg-orange-100 rounded-full">{priority}</span>;
      case 'Basse':
        return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{priority}</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">{priority}</span>;
    }
  };


// Main Component for the Dashboard View
const DashboardView = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Vue d'ensemble</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Dossiers en cours</h3>
        <p className="text-3xl font-bold text-gray-800">42</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Dossiers clôturés (30j)</h3>
        <p className="text-3xl font-bold text-gray-800">18</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Taux de fraude avérée</h3>
        <p className="text-3xl font-bold text-gray-800">67%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">Durée moy. d'enquête</h3>
        <p className="text-3xl font-bold text-gray-800">21 jours</p>
      </div>
    </div>
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-800 mb-4">Dossiers Récents</h3>
            <ul>
                {casesData.slice(0, 4).map(c => (
                    <li key={c.id} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                        <div>
                            <p className="font-semibold text-gray-700">{c.id} - {c.insured}</p>
                            <p className="text-sm text-gray-500">{c.type}</p>
                        </div>
                        {getStatusPill(c.status)}
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-800 mb-4">Tâches prioritaires</h3>
             <ul>
                <li className="flex items-center py-2"><PlusCircle className="w-4 h-4 mr-2 text-blue-500"/>Finaliser rapport FRA-00125</li>
                <li className="flex items-center py-2"><PlusCircle className="w-4 h-4 mr-2 text-blue-500"/>Contacter témoin pour FRA-00122</li>
                <li className="flex items-center py-2"><PlusCircle className="w-4 h-4 mr-2 text-blue-500"/>Demander pièces manquantes FRA-00123</li>
                <li className="flex items-center py-2"><PlusCircle className="w-4 h-4 mr-2 text-blue-500"/>Planifier surveillance pour nouveau dossier</li>
            </ul>
        </div>
    </div>
  </div>
);

// Main Component for the Cases Management View
const CasesView = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-bold text-gray-800">Gestion des Dossiers</h2>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition">
          <PlusCircle size={20}/>
          Nouveau Dossier
        </button>
        <button className="flex items-center gap-2 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-50 transition">
          <FileDown size={20}/>
          Exporter
        </button>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
      <table className="w-full text-left">
        <thead className="border-b-2 border-gray-200">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">N° de Dossier</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Nom de l'Assuré</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Type de Fraude</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Statut</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Priorité</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Date d'Ouverture</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {casesData.map((caseItem) => (
            <tr key={caseItem.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4 font-medium text-gray-800">{caseItem.id}</td>
              <td className="p-4 text-gray-600">{caseItem.insured}</td>
              <td className="p-4 text-gray-600">{caseItem.type}</td>
              <td className="p-4">{getStatusPill(caseItem.status)}</td>
              <td className="p-4">{getPriorityPill(caseItem.priority)}</td>
              <td className="p-4 text-gray-600">{caseItem.date}</td>
              <td className="p-4">
                <button className="text-blue-600 hover:underline">Voir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Main Component for the Reports View
const ReportsView = () => (
  <div>
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Analyse & Rapports</h2>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-800 mb-4">Évolution des dossiers par mois</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyCasesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Dossiers Ouverts" fill="#8884d8" />
            <Bar dataKey="Dossiers Clôturés" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="font-bold text-gray-800 mb-4">Répartition par Type de Fraude</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={fraudTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {fraudTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// Main Component for the Settings View
const SettingsView = () => (
    <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Paramètres</h2>
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Profil</h3>
                <div className="flex items-center gap-4">
                    <UserCircle size={64} className="text-gray-400"/>
                    <div>
                        <p className="font-bold">John Doe (Vous)</p>
                        <p className="text-sm text-gray-500">john.doe@assurance-enquete.fr</p>
                        <button className="mt-2 text-sm text-blue-600 hover:underline">Modifier le profil</button>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Notifications</h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="notif1">Notification par email pour les nouveaux dossiers</label>
                        <input type="checkbox" id="notif1" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="notif2">Alerte pour les tâches à haute priorité</label>
                        <input type="checkbox" id="notif2" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                    </div>
                </div>
            </div>
        </div>
    </div>
);


// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'cases':
        return <CasesView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  const NavLink = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon size={22} className="mr-4" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <div className="flex items-center mb-8">
          <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          <h1 className="text-xl font-bold ml-2">Fraude Invest.</h1>
        </div>
        <div className="flex-grow space-y-2">
          <NavLink id="dashboard" icon={LayoutDashboard} label="Vue d'ensemble" />
          <NavLink id="cases" icon={FolderKanban} label="Gestion des Dossiers" />
          <NavLink id="reports" icon={BarChart3} label="Analyse & Rapports" />
        </div>
        <div>
          <NavLink id="settings" icon={Settings} label="Paramètres" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Rechercher un dossier, un assuré..." className="w-full bg-gray-100 border-transparent rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={24} className="text-gray-600" />
            <div className="flex items-center gap-2">
                <UserCircle size={32} className="text-gray-600" />
                <div>
                    <p className="font-semibold text-sm text-gray-800">John Doe</p>
                    <p className="text-xs text-gray-500">Enquêteur Principal</p>
                </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
