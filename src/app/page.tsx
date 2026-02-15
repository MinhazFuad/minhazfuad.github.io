import { getCollection } from "@/lib/content";
import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ExternalLink, FileText, Palette, Code, Briefcase, Award } from "lucide-react"; // Added Award icon
import Image from "next/image";

export default function Home() {
  const projects = getCollection("projects");
  const designs = getCollection("designs"); 
  const experience = getCollection("experience");
  const papers = getCollection("papers");
  const certifications = getCollection("certifications"); // <--- Fetch Certifications

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-16 md:space-y-24">
      
      {/* Navbar - Responsive */}
      <nav className="fixed top-4 md:top-6 left-0 right-0 flex justify-center z-50 px-4">
        <GlassCard className="flex items-center justify-between md:justify-center gap-4 md:gap-6 px-6 py-3 rounded-full !bg-white/80 dark:!bg-black/80 backdrop-blur-md border border-white/20 shadow-lg w-full md:w-auto max-w-sm md:max-w-none overflow-x-auto scrollbar-hide">
           {/* Mobile Icons / Desktop Text */}
           <a href="#projects" className="hover:text-purple-500 transition-colors flex flex-col md:flex-row items-center gap-1" aria-label="Projects">
             <span className="hidden md:block font-medium">Work</span>
             <Code className="block md:hidden w-5 h-5" />
           </a>
           
           <a href="#designs" className="hover:text-pink-500 transition-colors flex flex-col md:flex-row items-center gap-1" aria-label="Designs">
             <span className="hidden md:block font-medium">Designs</span>
             <Palette className="block md:hidden w-5 h-5" />
           </a>

           <a href="#experience" className="hover:text-blue-500 transition-colors flex flex-col md:flex-row items-center gap-1" aria-label="Experience">
             <span className="hidden md:block font-medium">Exp</span>
             <Briefcase className="block md:hidden w-5 h-5" />
           </a>

           <a href="#papers" className="hover:text-indigo-500 transition-colors flex flex-col md:flex-row items-center gap-1" aria-label="Research">
             <span className="hidden md:block font-medium">Research</span>
             <FileText className="block md:hidden w-5 h-5" />
           </a>

           {/* New Certifications Link */}
           <a href="#certifications" className="hover:text-emerald-500 transition-colors flex flex-col md:flex-row items-center gap-1" aria-label="Certifications">
             <span className="hidden md:block font-medium">Certs</span>
             <Award className="block md:hidden w-5 h-5" />
           </a>

           <div className="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1 md:mx-2 shrink-0"></div>
           <ThemeToggle />
        </GlassCard>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center space-y-8 pt-24 md:pt-20">
          <GlassCard className="relative p-6 md:p-12 max-w-5xl w-full border-white/40 dark:border-white/10">
            
            <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-10">
              {/* Text Side */}
              <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs md:text-sm font-medium inline-block">
                  Available for Hire
                </span>
                <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white leading-tight">
                  I Craft Digital <br/> Reality
                </h1>
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Full Stack Developer & Visual Designer.<br/>
                  Blending <span className="text-purple-500 font-semibold">Code</span> with <span className="text-pink-500 font-semibold">Creativity</span>.
                </p>
                <div className="flex gap-4 justify-center md:justify-start pt-2">
                  <a href="#projects" className="px-5 py-2.5 md:px-6 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/30 text-sm md:text-base">
                    View Work
                  </a>
                  <a href="#experience" className="px-5 py-2.5 md:px-6 md:py-3 bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 rounded-lg font-medium transition-all text-sm md:text-base">
                    Contact Me
                  </a>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                <div className="relative w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl">
                   <Image 
                     src="/uploads/me.jpg" 
                     alt="Profile Picture" 
                     fill
                     className="object-cover"
                     priority
                   />
                </div>
              </div>
            </div>

          </GlassCard>
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-28">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="p-2 md:p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
            <Code className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project: any, i) => (
            <GlassCard key={project.id} delay={i * 0.1} className="group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full border-white/40 dark:border-white/10">
              <div className="h-48 md:h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6 pt-12">
                   <h3 className="text-xl md:text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                   {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 md:px-3 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Recent Designs */}
      <section id="designs" className="scroll-mt-28">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="p-2 md:p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400">
            <Palette className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Recent Designs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design: any, i) => (
            <GlassCard key={design.id} delay={i * 0.1} className="group relative overflow-hidden aspect-square cursor-pointer hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300">
              <img src={design.image} alt={design.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{design.title}</h3>
                {design.link && (
                  <a href={design.link} target="_blank" className="mt-4 text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center gap-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                    View Full <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Certifications - NEW SECTION */}
      <section id="certifications" className="scroll-mt-28">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="p-2 md:p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert: any, i) => (
            <GlassCard key={cert.id} delay={i * 0.1} className="p-4 flex flex-col items-center text-center hover:border-emerald-500/50 transition-colors group">
              <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 relative">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-contain p-2" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-400"><Award size={48}/></div>
                )}
              </div>
              <h3 className="text-lg font-bold group-hover:text-emerald-500 transition-colors">{cert.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
              <p className="text-xs text-gray-400 mt-1 mb-3">{cert.date}</p>
              
              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto px-4 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors flex items-center gap-1"
                >
                  Verify Credential <ExternalLink size={10} />
                </a>
              )}
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="scroll-mt-28">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
            <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
        </div>
        
        <div className="space-y-6 md:space-y-8 border-l-2 border-gray-200 dark:border-gray-800 ml-3 pl-6 md:pl-8 relative">
           {experience.map((exp: any, i) => (
             <GlassCard key={exp.id} delay={i * 0.1} className="p-6 md:p-8 relative">
               <div className="absolute -left-[33px] md:-left-[41px] top-8 w-4 h-4 md:w-5 md:h-5 bg-blue-500 rounded-full border-4 border-white dark:border-gray-950"></div>
               <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                 <div>
                   <h3 className="text-lg md:text-xl font-bold">{exp.role}</h3>
                   <span className="text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base">{exp.company}</span>
                 </div>
                 <span className="text-xs md:text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md whitespace-nowrap w-fit">
                   {exp.date}
                 </span>
               </div>
               <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-sm">
                 {exp.content}
               </div>
             </GlassCard>
           ))}
        </div>
      </section>

      {/* Research Papers */}
      <section id="papers" className="scroll-mt-28 pb-12 md:pb-20">
         <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="p-2 md:p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Research Papers</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {papers.map((paper: any, i) => (
            <GlassCard key={paper.id} delay={i * 0.1} className="p-4 md:p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-base md:text-lg font-bold group-hover:text-indigo-500 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {paper.venue}
                    </p>
                </div>
                {paper.link && (
                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-all text-xs md:text-sm font-medium whitespace-nowrap"
                  >
                    Read Paper <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

    </main>
  );
}