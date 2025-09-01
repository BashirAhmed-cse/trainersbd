'use client'
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

const MembershipApplication = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    nationalId: '',
    whatsappNumber: '',
    presentAddress: '',
    permanentAddress: '',
    
    // Professional Information
    jobTitle: '',
    organization: '',
    education: '',
    sector: '',
    trainerExperience: '',
    experienceCertificate: null,
    profileImage: null,
    trainingSpecialization: '',
    
    // Membership Details
    membershipType: '',
    certifications: '',
    keySkills: '',
    joinReason: ''
  });

  const sectors = [
    'Education', 'Corporate Training', 'Healthcare', 
    'IT & Technology', 'Finance', 'Agriculture',
    'Vocational Training', 'Other'
  ];

  const membershipTypes = [
    'Regular Member', 'Associate Member', 
    'Student Member', 'Corporate Member'
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              Membership Application Form
            </span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Trainers Association of Bangladesh (TRAINERS)
            Cultivating Excellence, Leading Globally
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Step {step} of 3
            </span>
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {Math.round((step / 3) * 100)}% Complete
            </span>
          </div>
          <div className={`w-full rounded-full h-2.5 ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
          }`}>
            <div 
              className="bg-gradient-to-r from-blue-600 to-blue-800 h-2.5 rounded-full" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className={`rounded-xl shadow-lg overflow-hidden ${
          theme === 'dark' ? 'bg-slate-800' : 'bg-white'
        }`}>
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="p-6 sm:p-8">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
                    { name: 'email', label: 'Email Address', type: 'email', required: true },
                    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
                    { 
                      name: 'gender', 
                      label: 'Gender', 
                      type: 'select', 
                      options: ['Male', 'Female', 'Other'],
                      required: true 
                    },
                    { name: 'nationalId', label: 'National ID/Passport Number', type: 'text', required: true },
                    { name: 'whatsappNumber', label: 'WhatsApp Number', type: 'tel', required: true },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'border-slate-300'
                          } border`}
                          required={field.required}
                        >
                          <option value="">Select {field.label}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'border-slate-300'
                          } border`}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                  
                  {[
                    { name: 'presentAddress', label: 'Present Address', required: true },
                    { name: 'permanentAddress', label: 'Permanent Address', required: true },
                  ].map((field) => (
                    <div className="md:col-span-2" key={field.name}>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'border-slate-300'
                        } border`}
                        required={field.required}
                      ></textarea>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {step === 2 && (
              <div className="p-6 sm:p-8">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Professional Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'jobTitle', label: 'Current Job Title/Designation', type: 'text', required: true },
                    { name: 'organization', label: 'Organization/Company Name', type: 'text', required: true },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'border-slate-300'
                        } border`}
                        required={field.required}
                      />
                    </div>
                  ))}
                  
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Education <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'border-slate-300'
                      } border`}
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Sector <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'border-slate-300'
                      } border`}
                      required
                    >
                      <option value="">Select Sector</option>
                      {sectors.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Experience as a Trainer (Years) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="trainerExperience"
                      value={formData.trainerExperience}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'border-slate-300'
                      } border`}
                      required
                    />
                  </div>
                  
                  {[
                    { 
                      name: 'experienceCertificate', 
                      label: 'Experience Certificate',
                      accept: '.pdf,.doc,.docx',
                      text: 'Upload PDF/DOC (Max 5MB)'
                    },
                    { 
                      name: 'profileImage', 
                      label: 'Profile Image',
                      required: true,
                      accept: 'image/*',
                      text: 'Upload Image (Max 2MB)'
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <label className={`flex flex-col items-center justify-center w-full px-4 py-6 rounded-lg cursor-pointer ${
                        theme === 'dark' 
                          ? 'border-slate-600 hover:border-blue-500 bg-slate-700' 
                          : 'border-slate-300 hover:border-blue-500'
                      } border-2 border-dashed`}>
                        <Upload className={`w-8 h-8 mb-2 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <p className={`text-sm text-center ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {formData[field.name] 
                            ? formData[field.name].name 
                            : field.text}
                        </p>
                        <input
                          type="file"
                          name={field.name}
                          onChange={handleChange}
                          accept={field.accept}
                          className="hidden"
                          required={field.required}
                        />
                      </label>
                    </div>
                  ))}
                  
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Training Specialization (if any)
                    </label>
                    <textarea
                      name="trainingSpecialization"
                      value={formData.trainingSpecialization}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'border-slate-300'
                      } border`}
                      placeholder="List your areas of expertise"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Membership Details */}
            {step === 3 && (
              <div className="p-6 sm:p-8">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Membership Details
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Membership Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="membershipType"
                      value={formData.membershipType}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'border-slate-300'
                      } border`}
                      required
                    >
                      <option value="">Select Membership Type</option>
                      {membershipTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {[
                    { 
                      name: 'certifications', 
                      label: 'Do you hold any relevant certifications/ToT?',
                      placeholder: 'List your certifications or Training of Trainer (ToT) qualifications',
                      rows: 3
                    },
                    { 
                      name: 'keySkills', 
                      label: 'List Your Key Training Skills/Topics (if any)',
                      placeholder: 'Example: Leadership Development, Digital Marketing, Soft Skills Training',
                      rows: 3
                    },
                    { 
                      name: 'joinReason', 
                      label: 'Why You Want To Join Us',
                      required: true,
                      placeholder: '',
                      rows: 5
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <textarea
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        rows={field.rows}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'border-slate-300'
                        } border`}
                        placeholder={field.placeholder}
                        required={field.required}
                      ></textarea>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Navigation */}
            <div className={`px-6 py-4 flex justify-between ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-slate-50'
            }`}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className={`inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-slate-600 border-slate-500 text-white hover:bg-slate-500' 
                      : 'border border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit Application
                  <CheckCircle className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipApplication;