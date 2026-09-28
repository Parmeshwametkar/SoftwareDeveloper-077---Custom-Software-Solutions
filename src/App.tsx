/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';
import { DevelopmentProcessSection } from './components/DevelopmentProcessSection';
import { TeamSection } from './components/TeamSection';
import { ProjectEnquirySection } from './components/ProjectEnquirySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjectType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [enquiryProjectType, setEnquiryProjectType] = useState<ProjectType | undefined>(undefined);
  const [enquiryNotes, setEnquiryNotes] = useState<string | undefined>(undefined);

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'public') {
      setCurrentView('public');
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectServiceToInquire = (serviceTitle: string) => {
    setEnquiryNotes(`Service interest: ${serviceTitle}`);
    scrollToSection('request-project');
  };

  const handleSelectProjectToInquire = (projectTitle: string, projectType: string) => {
    setEnquiryProjectType(projectType as ProjectType);
    setEnquiryNotes(`Similar system reference: ${projectTitle}`);
    scrollToSection('request-project');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {currentView === 'admin' ? (
        <AdminDashboard onBackToWebsite={() => setCurrentView('public')} />
      ) : (
        <>
          <Navbar
            currentView={currentView}
            onViewChange={setCurrentView}
            onNavigateToSection={scrollToSection}
          />

          <main className="flex-1">
            <HeroSection
              onStartProject={() => scrollToSection('request-project')}
              onExploreProjects={() => scrollToSection('projects')}
            />

            <AboutSection
              onRequestConsultation={() => scrollToSection('request-project')}
            />

            <ServicesSection
              onSelectServiceToInquire={handleSelectServiceToInquire}
            />

            <ProjectsSection
              onRequestProjectSolution={handleSelectProjectToInquire}
            />

            <TechStackSection />

            <DevelopmentProcessSection />

            <TeamSection />

            <ProjectEnquirySection
              initialProjectType={enquiryProjectType}
              initialNotes={enquiryNotes}
              onViewInAdmin={() => setCurrentView('admin')}
            />

            <ContactSection
              onGoToProjectEnquiry={() => scrollToSection('request-project')}
            />
          </main>

          <Footer
            onNavigateToSection={scrollToSection}
            onOpenAdmin={() => setCurrentView('admin')}
          />
        </>
      )}
    </div>
  );
}
