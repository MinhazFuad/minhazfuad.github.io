import { getCollection } from "@/lib/content";
import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ExternalLink, FileText, Palette, Code, Briefcase, Award, GraduationCap, Github, Linkedin, Dribbble, MapPin } from "lucide-react"; 
import Image from "next/image";

// Helper for social icons
const SocialLink = ({ href, icon: Icon, label }: any) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/50 dark:bg-black/50 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 rounded-full transition-all hover:scale-110 text-slate-600 dark:text-slate-300 shadow-sm" aria-label={label}>
    <Icon size={20} />
  </a>
);

export default function Home() {
  const projects = getCollection("projects");
  const designs = getCollection("designs"); 
  const experience = getCollection("experience");
  const papers = getCollection("papers");
  const certifications = getCollection("certifications");
  const education = getCollection("education");

  return (
    <div className="min-h-screen">
      
      {/* Navbar - Padding set to 2.5 (py-2.5) */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <GlassCard className="flex items-center justify-center gap-2 md:gap-6 px-4 py-2.5 !w-full !max-w-none !rounded-none !bg-white/90 dark:!bg-slate-900/90 backdrop-blur-xl border-b border-white/20 border-t-0 border-x-0 shadow-lg shadow-blue-900/5 overflow-x-auto scrollbar-hide">
           <a href="#projects" className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors group" aria-label="Work">
             <Code className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
           </a>
           <a href="#designs" className="p-2 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-xl transition-colors group" aria-label="Designs">
             <Palette className="w-5 h-5 text-slate-500 group-hover:text-cyan-500 transition-colors" />
           </a>
           <a href="#experience" className="p-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors group" aria-label="Experience">
             <Briefcase className="w-5 h-5 text-slate-500 group-hover:text-indigo-500 transition-colors" />
           </a>
           <a href="#education" className="p-2 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl transition-colors group" aria-label="Education">
             <GraduationCap className="w-5 h-5 text-slate-500 group-hover:text-sky-500 transition-colors" />
           </a>
           <a href="#certifications" className="p-2 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-colors group" aria-label="Certifications">
             <Award className="w-5 h-5 text-slate-500 group-hover:text-teal-500 transition-colors" />
           </a>
           <a href="#papers" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors group" aria-label="Research">
             <FileText className="w-5 h-5 text-slate-500 group-hover:text-slate-400 transition-colors" />
           </a>
           <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
           <ThemeToggle />
        </GlassCard>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-12 pt-0 space-y-24 md:space-y-32">

        {/* Hero Section - Top Padding set to 24 (pt-24) */}
        <section className="min-h-[65vh] flex flex-col justify-center items-center pt-24">
            <GlassCard className="relative p-8 md:p-14 w-full border-white/40 dark:border-white/5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl">
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
                
                <div className="flex-1 text-center md:text-left space-y-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-widest uppercase inline-block border border-blue-200 dark:border-blue-800">
                      Open to Work
                    </span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
                      <MapPin size={14} /> Dhaka, Bangladesh
                    </span>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                    Md Abdul Ahad <br/>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Minhaz</span>
                  </h1>
                  
                  <div className="space-y-2">
                    <p className="text-xl md:text-2xl font-light text-slate-600 dark:text-slate-300">
                      ML & Vision-Language Researcher
                    </p>
                    <p className="text-lg md:text-xl font-normal text-slate-500 dark:text-slate-400">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">Web Developer</span> 
                      <span className="mx-2 text-slate-300 dark:text-slate-600">|</span> 
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">Graphic Designer</span>
                    </p>
                  </div>

                  <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
                    Passionate about bridging the gap between <b>AI Research</b> and <b>Creative Design</b>. Specializing in Deep Learning, Computer Vision, and Full-Stack Web Development.
                  </p>
                  
                  <div className="flex gap-4 justify-center md:justify-start py-2">
                     <SocialLink href="https://github.com/minhazfuad" icon={Github} label="GitHub" />
                     <SocialLink href="https://linkedin.com/in/minhaz-fuad-361420365" icon={Linkedin} label="LinkedIn" />
                     <SocialLink href="https://behance.net/vic087" icon={Dribbble} label="Behance" />
                     <SocialLink href="https://scholar.google.com/citations" icon={GraduationCap} label="Scholar" />
                  </div>

                  <div className="flex gap-4 justify-center md:justify-start pt-4">
                    <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium text-base transition-all shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1">
                      View Portfolio
                    </a>
                    <a href="mailto:fuad000219@gmail.com" className="px-8 py-3 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full font-medium text-base transition-all text-slate-700 dark:text-slate-200">
                      Contact Me
                    </a>
                  </div>
                </div>

                <div className="relative group shrink-0">
                  <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500 via-cyan-500 to-indigo-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                  <div className="relative w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-[6px] border-white dark:border-slate-800 shadow-2xl">
                     <Image src="/uploads/me.jpg" alt="Md Abdul Ahad Minhaz" fill className="object-cover" priority />
                  </div>
                </div>
              </div>
            </GlassCard>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-32">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="text-blue-600 dark:text-blue-400">
              <Code size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project: any, i) => (
              <GlassCard key={project.id} delay={i * 0.1} className="group hover:scale-[1.01] transition-transform duration-300 flex flex-col h-full border-white/60 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 !rounded-3xl">
                <div className="h-64 bg-slate-200 dark:bg-slate-800 overflow-hidden relative rounded-t-3xl">
                  {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-6 pt-12">
                     <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed prose dark:prose-invert text-base font-medium">
                     {project.content || project.description}
                  </div>
                  
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tags?.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-800">
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
        <section id="designs" className="scroll-mt-32">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="text-cyan-600 dark:text-cyan-400">
              <Palette size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Recent Designs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design: any, i) => (
              <GlassCard key={design.id} delay={i * 0.1} className="group relative overflow-hidden aspect-square cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 border-none !rounded-3xl">
                <img src={design.image} alt={design.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{design.title}</h3>
                  <p className="text-slate-300 text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    {design.date ? new Date(design.date).getFullYear() : 'Recent'}
                  </p>
                  {design.link && (
                    <a href={design.link} target="_blank" className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                      View Full <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-32">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="text-indigo-600 dark:text-indigo-400"><Briefcase size={22} /></div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Experience</h2>
          </div>
          <div className="space-y-8 border-l-2 border-slate-300 dark:border-slate-700 ml-4 pl-8 relative">
             {experience.map((exp: any, i) => (
               <GlassCard key={exp.id} delay={i * 0.1} className="p-8 relative border-white/50 dark:border-white/10 !bg-white/70 dark:!bg-slate-900/70 !rounded-3xl">
                 <div className="absolute -left-[43px] top-8 w-5 h-5 bg-indigo-500 rounded-full border-4 border-slate-100 dark:border-slate-800"></div>
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                   <span className="text-sm font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg whitespace-nowrap">{exp.date}</span>
                 </div>
                 <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 text-base">{exp.company}</p>
                 <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-base leading-relaxed">{exp.content}</div>
               </GlassCard>
             ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-32">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="text-sky-600 dark:text-sky-400"><GraduationCap size={22} /></div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Education</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {education.map((edu: any, i) => (
               <GlassCard key={edu.id} delay={i * 0.1} className="p-8 flex flex-col justify-between h-full border-t-4 border-t-sky-500 border-x-white/20 border-b-white/20 !bg-white/70 dark:!bg-slate-900/70 !rounded-3xl">
                 <div>
                   <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{edu.school}</h3>
                   <p className="text-slate-700 dark:text-slate-300 font-medium text-base">{edu.degree}</p>
                   <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{edu.location}</p>
                 </div>
                 <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 flex justify-between items-center">
                   <span className="text-xs font-mono text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/30 px-3 py-1.5 rounded-full">
                     {edu.date}
                   </span>
                 </div>
               </GlassCard>
             ))}
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="scroll-mt-32">
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="text-teal-600 dark:text-teal-400">
              <Award size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert: any, i) => (
              <GlassCard key={cert.id} delay={i * 0.1} className="p-6 flex flex-col items-center text-center hover:border-teal-500/50 transition-colors group !bg-white/70 dark:!bg-slate-900/70 !rounded-3xl">
                <div className="w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden mb-5 relative flex items-center justify-center">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="w-full h-full object-contain p-3" />
                  ) : (
                     <Award className="text-slate-300 dark:text-slate-600" size={40}/>
                  )}
                </div>
                <h3 className="text-lg font-bold group-hover:text-teal-500 transition-colors text-slate-900 dark:text-white line-clamp-2">{cert.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{cert.issuer}</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">{cert.date}</p>
                
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto px-4 py-2 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/30 rounded-full hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors flex items-center gap-1.5"
                  >
                    Verify <ExternalLink size={12} />
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Research Papers Section */}
        <section id="papers" className="scroll-mt-32 pb-16">
           <div className="inline-flex items-center gap-3 mb-10 px-6 py-2.5 rounded-full bg-white/60 dark:bg-black/60 backdrop-blur-md border border-white/20 shadow-sm">
            <div className="text-slate-600 dark:text-slate-400">
              <FileText size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Research Papers</h2>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {papers.map((paper: any, i) => (
              <GlassCard key={paper.id} delay={i * 0.1} className="p-6 hover:border-blue-500/50 transition-colors group !bg-white/70 dark:!bg-slate-900/70 !rounded-3xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-500 hidden sm:block">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-blue-500 transition-colors text-slate-900 dark:text-white">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                        {paper.venue}
                      </p>
                    </div>
                  </div>
                  
                  {paper.link && (
                    <a 
                      href={paper.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all text-sm font-medium whitespace-nowrap text-slate-700 dark:text-slate-300"
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
    </div>
  );
}