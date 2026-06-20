import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Architecture = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            EduPulse Platform Architecture
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            A comprehensive overview of our Cloud-Native infrastructure, CI/CD pipelines, and application design.
          </p>
        </motion.div>

        {/* Cloud Infrastructure Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-8 rounded-2xl mb-12 shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="text-blue-500">☁️</span> AWS Cloud Infrastructure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className={`mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                EduPulse is built on a highly available, fault-tolerant infrastructure completely codified in <strong>Terraform</strong>.
              </p>
              <ul className={`space-y-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li>🟢 <strong>Amazon EKS:</strong> Orchestrates the React frontend and FastAPI backend via auto-scaling pods.</li>
                <li>🟢 <strong>Amazon RDS:</strong> Multi-AZ PostgreSQL providing robust, ACID-compliant data storage.</li>
                <li>🟢 <strong>Amazon S3:</strong> Encrypted, version-controlled object storage for learning materials.</li>
                <li>🟢 <strong>HashiCorp Vault:</strong> Zero-trust dynamic secret injection directly into pod memory.</li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border flex items-center justify-center ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
               <img src="/images/Screenshot 2026-06-20 at 12.08.48 am.png" alt="Infrastructure Example" className="rounded-lg shadow-lg w-full object-cover" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </motion.div>

        {/* CI/CD Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-2xl mb-12 shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="text-green-500">🚀</span> Automated CI/CD Deployment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`order-2 md:order-1 p-6 rounded-xl border flex items-center justify-center ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
               <img src="/images/Screenshot 2026-06-20 at 12.09.05 am.png" alt="CI/CD Pipeline Example" className="rounded-lg shadow-lg w-full object-cover" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <div className="order-1 md:order-2">
              <p className={`mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Our DevOps philosophy relies on zero manual intervention. From code push to live production, the pipeline handles everything securely.
              </p>
              <ul className={`space-y-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li>🔄 <strong>GitHub Webhooks:</strong> Trigger Jenkins automatically on main branch merges.</li>
                <li>🔄 <strong>Jenkins Pipeline:</strong> Lints, tests, and builds optimized Docker containers.</li>
                <li>🔄 <strong>Amazon ECR:</strong> Scans and hosts version-tagged Docker images.</li>
                <li>🔄 <strong>Kubernetes Rolling Updates:</strong> Zero-downtime deployments via Kubernetes ReplicaSets.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Observability */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-8 rounded-2xl mb-12 shadow-xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
            <span className="text-purple-500">📊</span> Observability & Monitoring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className={`mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                You cannot improve what you cannot measure. EduPulse implements full-stack observability.
              </p>
              <ul className={`space-y-3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <li>📈 <strong>Prometheus:</strong> Scrapes real-time application and business metrics.</li>
                <li>📈 <strong>Grafana:</strong> Visualizes student momentum, placement readiness, and cluster health.</li>
                <li>📈 <strong>ELK Stack:</strong> Filebeat ships structured JSON logs to Logstash and Elasticsearch for immediate debugging.</li>
              </ul>
            </div>
            <div className={`p-6 rounded-xl border flex items-center justify-center ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
               <img src="/images/Screenshot 2026-06-20 at 12.10.14 am.png" alt="Monitoring Dashboard Example" className="rounded-lg shadow-lg w-full object-cover" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Architecture;
