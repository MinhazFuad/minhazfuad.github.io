import { getCollection } from "@/lib/content";
import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ExternalLink, FileText, Palette, Code, Briefcase, Award, GraduationCap, Github, Linkedin, Dribbble } from "lucide-react"; 
import Image from "next/image";

// Helper for social icons
const SocialLink = ({ href, icon: Icon, label }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 rounded-full transition-all hover:scale-110 text-gray-700 dark:text-gray-200" aria-label={label}>
    <Icon size={20} />
  </a>
);

export default function Home() {
  // Fetch all collections
  const projects = getCollection("projects");
  const designs = getCollection("designs"); 
  const experience = getCollection("experience");
  const papers = getCollection("papers");
  const certifications = getCollection("certifications");
  const education = getCollection("education");

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-20 md:space-y-32">
      
      {/* Navbar - Includes ALL Links */}
      <nav className="fixed top-4 md:top-6 left-0 right-0 flex justify-center z-50 px-4">
        <GlassCard className="flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full !bg-white/80 dark:!bg-black/80 backdrop-blur-md border border-white/20 shadow-lg max-w-[95vw] overflow-x-auto scrollbar-hide">
           <a href="#projects" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" aria-label="Work"><Code className="w-5 h-5 text-purple-500" /></a>
           <a href="#designs" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" aria-label="Designs"><Palette className="w-5 h-5 text-pink-500" /></a>
           <a href="#experience" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" aria-label="Experience"><Briefcase className="w-5 h-5 text-blue-500" /></a>
           <a href="#education" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" aria-label="Education"><GraduationCap className="w-5 h-5 text-orange-500" /></a>
           <a href="#certifications" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" aria-label="Certifications"><Award className="w-5 h-5 text-emerald-500" /></a>
           <a href="#papers" className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors" aria-label="Research"><FileText className="w-5 h-5 text-indigo-500" /></a>
           <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1"></div>
           <ThemeToggle />
        </GlassCard>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center space-y-8 pt-20">
          <GlassCard className="relative p-8 md:p-12 max-w-5xl w-full border-white/40 dark:border-white/10">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left space-y-6">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-xs font-bold tracking-wider uppercase inline-block">
                  Open to Work
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white leading-[1.1]">
                  Md Abdul Ahad Minhaz
                </h1>
                <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300">
                  ML & Vision-Language Researcher <br/>
                  <span className="text-purple-600 dark:text-purple-400 font-normal">Web Developer</span> & <span className="text-pink-600 dark:text-pink-400 font-normal">Graphic Designer</span>
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3 justify-center md:justify-start py-2">
                   <SocialLink href="https://github.com/minhazfuad" icon={Github} label="GitHub" />
                   <SocialLink href="https://linkedin.com/in/minhaz-fuad-361420365" icon={Linkedin} label="LinkedIn" />
                   <SocialLink href="https://behance.net/vic087" icon={Dribbble} label="Behance" />
                   <SocialLink href="https://scholar.google.com/citations" icon={GraduationCap} label="Scholar" />
                </div>

                <div className="flex gap-4 justify-center md:justify-start pt-4">
                  <a href="#projects" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40">
                    View Portfolio
                  </a>
                  <a href="mailto:fuad000219@gmail.com" className="px-8 py-3 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full font-medium transition-all">
                    Contact Me
                  </a>
                </div>
              </div>

              <div className="relative group shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-1000 animate-tilt"></div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl">
                   <Image src="/uploads/me.jpg" alt="Md Abdul Ahad Minhaz" fill className="object-cover" priority />
                </div>
              </div>
            </div>
          </GlassCard>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-28">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
            <Code size={24} />
          </div>
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any, i) => (
            <GlassCard key={project.id} delay={i * 0.1} className="group hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full border-white/40 dark:border-white/10">
              <div className="h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                   <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                {/* Description Text */}
                <div className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed prose dark:prose-invert text-sm">
                   {project.content || project.description}
                </div>
                
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Recent Designs Section */}
      <section id="designs" className="scroll-mt-28">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl text-pink-600 dark:text-pink-400">
            <Palette size={24} />
          </div>
          <h2 className="text-3xl font-bold">Recent Designs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.map((design: any, i) => (
            <GlassCard key={design.id} delay={i * 0.1} className="group relative overflow-hidden aspect-square cursor-pointer hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300">
              <img src={design.image} alt={design.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{design.title}</h3>
                <p className="text-gray-300 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {design.date ? new Date(design.date).getFullYear() : 'Recent'}
                </p>
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

      {/* Experience Section */}
      <section id="experience" className="scroll-mt-28">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400"><Briefcase size={24} /></div>
          <h2 className="text-3xl font-bold">Experience</h2>
        </div>
        <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-800 ml-3 pl-8 relative">
           {experience.map((exp: any, i) => (
             <GlassCard key={exp.id} delay={i * 0.1} className="p-8 relative">
               <div className="absolute -left-[41px] top-8 w-5 h-5 bg-blue-500 rounded-full border-4 border-white dark:border-gray-950"></div>
               <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                 <h3 className="text-xl font-bold">{exp.role}</h3>
                 <span className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md whitespace-nowrap">{exp.date}</span>
               </div>
               <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{exp.company}</p>
               <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-sm">{exp.content}</div>
             </GlassCard>
           ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="scroll-mt-28">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400"><GraduationCap size={24} /></div>
          <h2 className="text-3xl font-bold">Education</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {education.map((edu: any, i) => (
             <GlassCard key={edu.id} delay={i * 0.1} className="p-8 flex flex-col justify-between h-full border-t-4 border-t-orange-500">
               <div>
                 <h3 className="text-xl font-bold mb-2">{edu.school}</h3>
                 <p className="text-gray-600 dark:text-gray-300 font-medium">{edu.degree}</p>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{edu.location}</p>
               </div>
               <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                 <span className="text-sm font-mono text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                   {edu.date}
                 </span>
               </div>
             </GlassCard>
           ))}
        </div>
      </section>

      {/* Certifications Section */}
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

      {/* Research Papers Section */}
      <section id="papers" className="scroll-mt-28 pb-12 md:pb-20">
         <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-10">
          <div className="p-2 md:p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
            <FileText size={24} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Research Papers</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {papers.map((paper: any, i) => (
            <GlassCard key={paper.id} delay={i * 0.1} className="p-6 hover:border-indigo-500/50 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-500 hidden sm:block">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-500 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {paper.venue}
                    </p>
                  </div>
                </div>
                
                {paper.link && (
                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-all text-sm font-medium whitespace-nowrap"
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