import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBiodata } from '../biodataSlice';
import { ArrowLeft, Download, Palette, Layout, Settings, Eye } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

// Import All 10 Templates
import TraditionalTemplate from '../components/templates/TraditionalTemplate';
import ModernTemplate from '../components/templates/ModernTemplate';
import IslamicTemplate from '../components/templates/IslamicTemplate';
import SikhTemplate from '../components/templates/SikhTemplate';
import ChristianTemplate from '../components/templates/ChristianTemplate';
import JainTemplate from '../components/templates/JainTemplate';
import MinimalistTemplate from '../components/templates/MinimalistTemplate';
import ElegantTemplate from '../components/templates/ElegantTemplate';
import RoyalTemplate from '../components/templates/RoyalTemplate';
import FloralTemplate from '../components/templates/FloralTemplate';

const TEMPLATES = [
    { id: 'modern', name: 'Modern', icon: '✨', component: ModernTemplate, bg: 'bg-blue-50 text-blue-700', desc: 'Clean, professional, and minimalist.' },
    { id: 'traditional', name: 'Hindu Traditional', icon: '🕉️', component: TraditionalTemplate, bg: 'bg-red-50 text-red-800', desc: 'Classic maroon & gold styling.' },
    { id: 'islamic', name: 'Islamic', icon: '☪️', component: IslamicTemplate, bg: 'bg-green-50 text-green-800', desc: 'Elegant green with Bismillah header.' },
    { id: 'sikh', name: 'Sikh', icon: 'ੴ', component: SikhTemplate, bg: 'bg-orange-50 text-orange-800', desc: 'Vibrant orange with Ek Onkar.' },
    { id: 'christian', name: 'Christian', icon: '✝️', component: ChristianTemplate, bg: 'bg-slate-100 text-slate-700', desc: 'Subtle slate blue with Cross motif.' },
    { id: 'jain', name: 'Jain', icon: '🌸', component: JainTemplate, bg: 'bg-yellow-50 text-yellow-800', desc: 'Warm gold and red with Jai Jinendra.' },
    { id: 'minimalist', name: 'Minimalist', icon: '⬜', component: MinimalistTemplate, bg: 'bg-gray-100 text-gray-800', desc: 'Ultra-clean black & white grid.' },
    { id: 'elegant', name: 'Elegant Blush', icon: '🎀', component: ElegantTemplate, bg: 'bg-pink-50 text-pink-700', desc: 'Soft pinks and aesthetic cursive.' },
    { id: 'royal', name: 'Royal Purple', icon: '👑', component: RoyalTemplate, bg: 'bg-purple-50 text-purple-900', desc: 'Dark purple and rich gold ornate borders.' },
    { id: 'floral', name: 'Mint Floral', icon: '🌿', component: FloralTemplate, bg: 'bg-teal-50 text-teal-800', desc: 'Fresh mint greens and abstract floral shapes.' }
];

const ViewBiodata = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    const [biodata, setBiodata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [step, setStep] = useState('select'); // 'select' | 'preview'
    
    // PDF Printing Logistics
    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle: `${biodata?.personal?.fullName || 'Biodata'}_Marriage_Biodata`,
        pageStyle: `
            @page { size: A4 portrait; margin: 0; }
            @media print {
                body {
                    -webkit-print-color-adjust: exact; 
                    print-color-adjust: exact;
                }
                ::-webkit-scrollbar { display: none; }
                .print-perfect {
                    zoom: 0.610; /* Fit 1300px into 794px A4 width in Chromium */
                    width: 1300px !important;
                    height: 1838px !important;
                    overflow: hidden !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
            }
        `
    });

    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const data = await dispatch(getBiodata(id)).unwrap();

                // Format the Date of Birth to a readable format for all templates
                if (data?.personal?.dob) {
                    try {
                        const dateObj = new Date(data.personal.dob);
                        // Converts to "14 August 1999" format
                        data.personal.dob = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                    } catch (e) {
                        console.error("Failed to format date:", e);
                    }
                }

                setBiodata(data);
            } catch (err) {
                console.error(err);
                setError(typeof err === 'string' ? err : err.message || 'Failed to fetch biodata');
            } finally {
                setLoading(false);
            }
        };

        if (user && id) {
            fetchBiodata();
        }
    }, [id, user, dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-red-100 p-8 max-w-lg mx-auto mt-10">
                <div className="text-red-500 text-xl font-medium mb-2">Oops! Something went wrong</div>
                <div className="text-gray-500 mb-6">{error}</div>
                <button 
                  onClick={() => navigate('/dashboard/my-biodatas')}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Return to Dashboard
                </button>
            </div>
        );
    }

    const ActiveComponent = TEMPLATES.find(t => t.id === activeTemplate)?.component || ModernTemplate;

    // STEP 1: TEMPLATE SELECTION GALLERY
    if (step === 'select') {
        return (
            <div className="max-w-6xl mx-auto pb-16 animate-fade-in">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <button 
                            onClick={() => navigate('/dashboard/my-biodatas')}
                            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium mb-4"
                        >
                            <ArrowLeft size={18} />
                            Back to My Biodatas
                        </button>
                        <h1 className="text-4xl font-playfair font-bold text-gray-800">Choose a Template</h1>
                        <p className="text-gray-500 mt-2 text-lg">Select a beautifully crafted design for <span className="font-semibold text-primary">{biodata?.personal?.fullName}</span>'s biodata.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {TEMPLATES.map((template) => {
                        const TemplateComponent = template.component;
                        return (
                            <div 
                                key={template.id}
                                onClick={() => {
                                    setActiveTemplate(template.id);
                                    setStep('preview');
                                }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden transform hover:-translate-y-1"
                            >
                                {/* Live Component Thumbnail! */}
                                <div className="relative w-full aspect-[1/1.3] bg-gray-50 overflow-hidden border-b border-gray-100 group-hover:opacity-90 transition-opacity">
                                    <div className="absolute top-0 left-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none select-none">
                                        <TemplateComponent data={biodata} />
                                    </div>
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="bg-white text-primary font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all flex items-center gap-2">
                                            <Eye size={16} /> Preview
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Card Footer */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-2">{template.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // STEP 2: FULL-SCREEN PREVIEW OR PDF DOWNLOAD
    return (
        <div className="min-h-screen bg-gray-100/50 pb-12 animate-fade-in -mt-8 -mx-4 sm:-mx-8 lg:-mx-12 px-4 sm:px-8 lg:px-12 pt-8">
            
            {/* Sticky Top Toolbar for the Preview */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-4 z-50">
                <button 
                    onClick={() => setStep('select')}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors font-medium border border-gray-200"
                >
                    <ArrowLeft size={18} />
                    Choose Different Template
                </button>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest hidden md:block">
                        Previewing <span className="text-primary">{TEMPLATES.find(t => t.id === activeTemplate)?.name}</span>
                    </span>
                    
                    <button 
                        className="flex items-center gap-2 bg-primary text-white px-8 py-2.5 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        onClick={handlePrint}
                    >
                        <Download size={20} />
                        Download PDF
                    </button>
                </div>
            </div>

            {/* The Document Wrapper */}
            <div className="w-full flex justify-center pb-20 overflow-x-auto relative">
                <div className="transform transition-all duration-500 drop-shadow-2xl">
                    <div ref={contentRef} className="bg-white relative print-perfect flex-shrink-0 mx-auto overflow-hidden" style={{ width: '1300px', minHeight: '1838px' }}>
                        <ActiveComponent data={biodata} />
                        
                        {/* PREMIUM WATERMARK */}
                        {(!user?.isPremium || new Date() > new Date(user?.premiumExpiryDate)) && (
                            <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
                                <div className="transform -rotate-45 text-textDark opacity-[0.07] text-6xl md:text-9xl font-playfair font-black whitespace-nowrap select-none flex flex-col items-center">
                                    <span>ShaadiBio</span>
                                    <span className="text-xl md:text-3xl mt-4 tracking-[0.3em] font-montserrat uppercase opacity-80">
                                        Upgrade to Remove
                                    </span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ViewBiodata;
