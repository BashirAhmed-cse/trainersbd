'use client'
import { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, CheckCircle, X, FileText, Eye, EyeOff } from 'lucide-react';
import { useTheme } from 'next-themes';

const page = () => {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phoneNumber: '',
    
    // Profile Photo
    profilePhoto: null,
    
    // Bio Section
    bio: '',
    
    // Core Domain
    domains: [],
    customDomain: '',
    
    // Resume/CV
    resume: null,
    
    // Social Links
    linkedIn: '',
    portfolio: '',
    otherLinks: '',
    
    // Visibility & Consent
    visibility: 'members',
    consent: false
  });

  const domains = [
    'Digital Marketing',
    'Software Development',
    'UI/UX Design',
    'AI & Data Analytics',
    'Business Strategy',
    'Leadership & Training',
    'Other'
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Public (visible to everyone)' },
    { value: 'members', label: 'Members only' },
    { value: 'private', label: 'Private (only admins)' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'domains') {
        const updatedDomains = checked
          ? [...formData.domains, value]
          : formData.domains.filter(domain => domain !== value);
        
        setFormData(prev => ({
          ...prev,
          domains: updatedDomains
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const removeFile = (fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: null
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
    alert('Profile submitted successfully!');
  };

  const [showPassword, setShowPassword] = useState(false);

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
              Professional Profile Setup
            </span>
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Complete your professional profile to join our network of experts
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
            {/* Step 1: Personal Information & Profile Photo */}
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
                    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: false },
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
                  
                  {/* Profile Photo Upload */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Profile Photo <span className="text-red-500">*</span>
                    </label>
                    {formData.profilePhoto ? (
                      <div className="flex items-center justify-between p-4 rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/20">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm truncate">{formData.profilePhoto.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('profilePhoto')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
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
                          Upload JPG/PNG (Max 2MB)
                        </p>
                        <input
                          type="file"
                          name="profilePhoto"
                          onChange={handleChange}
                          accept=".jpg,.jpeg,.png"
                          className="hidden"
                          required
                        />
                      </label>
                    )}
                  </div>
                  
                  {/* Bio Section */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Short Bio (200-300 characters) <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      maxLength={300}
                      className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'border-slate-300'
                      } border`}
                      placeholder="Example: Marketing strategist with 10+ years of experience in EdTech and digital growth."
                      required
                    ></textarea>
                    <p className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {formData.bio.length}/300 characters
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Core Domain & Resume */}
            {step === 2 && (
              <div className="p-6 sm:p-8">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Professional Details
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Core Domain Selection */}
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                    (Choose one or more) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {domains.map((domain) => (
                        <label key={domain} className={`flex items-center p-3 rounded-lg border ${
                          theme === 'dark' 
                            ? 'border-slate-600 bg-slate-700' 
                            : 'border-slate-300'
                        }`}>
                          <input
                            type="checkbox"
                            name="domains"
                            value={domain}
                            checked={formData.domains.includes(domain)}
                            onChange={handleChange}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`ml-2 text-sm ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            {domain}
                          </span>
                        </label>
                      ))}
                    </div>
                    
                    {formData.domains.includes('Other') && (
                      <div className="mt-4">
                        <label className={`block text-sm font-medium mb-1 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Specify Other Domain
                        </label>
                        <input
                          type="text"
                          name="customDomain"
                          value={formData.customDomain}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'border-slate-300'
                          } border`}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Resume Upload */}
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Resume / CV <span className="text-red-500">*</span>
                    </label>
                    {formData.resume ? (
                      <div className="flex items-center justify-between p-4 rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/20">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm truncate">{formData.resume.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('resume')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
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
                          Upload PDF/DOC (Max 5MB)
                        </p>
                        <input
                          type="file"
                          name="resume"
                          onChange={handleChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          required
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Social Links & Visibility */}
            {step === 3 && (
              <div className="p-6 sm:p-8">
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Social Links & Visibility
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Social Links */}
                  {[
                    { name: 'linkedIn', label: 'LinkedIn Profile', type: 'url', placeholder: 'https://linkedin.com/in/yourprofile' },
                    { name: 'portfolio', label: 'Portfolio / Website', type: 'url', placeholder: 'https://yourportfolio.com' },
                    { name: 'otherLinks', label: 'Other Links', type: 'url', placeholder: 'https://otherlink.com' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'bg-slate-700 border-slate-600 text-white' 
                            : 'border-slate-300'
                        } border`}
                      />
                    </div>
                  ))}
                  
                  {/* Visibility Settings */}
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Profile Visibility
                    </label>
                    <div className="space-y-2">
                      {visibilityOptions.map((option) => (
                        <label key={option.value} className={`flex items-center p-3 rounded-lg border ${
                          theme === 'dark' 
                            ? 'border-slate-600 bg-slate-700' 
                            : 'border-slate-300'
                        }`}>
                          <input
                            type="radio"
                            name="visibility"
                            value={option.value}
                            checked={formData.visibility === option.value}
                            onChange={handleChange}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`ml-2 text-sm ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Consent Checkbox */}
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                  }`}>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 rounded text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <span className={`ml-2 text-sm ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        I agree to share my profile information on this platform. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
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
                  Save Profile
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

export default page;