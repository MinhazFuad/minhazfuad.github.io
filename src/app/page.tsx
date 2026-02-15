import { getCollection } from "@/lib/content";
import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle"; // We will create this next

export default function Home() {
  const projects = getCollection("projects");
  const experience = getCollection("experience");

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
      
      {/* Navbar */}
      <nav className="fixed top-6 left-0 right-0 flex justify-center z-50">
        <GlassCard className="flex items-center gap-6 px-8 py-3 rounded-full !bg-white/70 dark:!bg-black/70">
           <a href="#projects" className="hover:text-purple-500 font-medium">Work</a>
           <a href="#experience" className="hover:text-purple-500 font-medium">Experience</a>
           <ThemeToggle />
        </GlassCard>
      </nav>

      {/* Hero */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center space-y-6 pt-20">
        <GlassCard className="p-10 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            I Build Digital Experiences
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Full Stack Developer & Researcher. <br/>
            Specialized in AI, Modern Web, and Glassmorphism UI.
          </p>
        </GlassCard>
      </section>

      {/* Projects */}
      <section id="projects">
        <h2 className="text-3xl font-bold mb-8 ml-2">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any, i) => (
            <GlassCard key={project.id} delay={i * 0.1} className="group hover:scale-[1.02] transition-transform duration-300">
              <div className="h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                {/* Ensure you have an image, or fallback */}
                {project.image && <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />}
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-purple-500 uppercase">{project.type}</span>
                <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <h2 className="text-3xl font-bold mb-8 ml-2">Experience</h2>
        <div className="space-y-6">
           {experience.map((exp: any, i) => (
             <GlassCard key={exp.id} delay={i * 0.1} className="p-8">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="text-xl font-bold">{exp.role}</h3>
                   <p className="text-purple-500">{exp.company}</p>
                 </div>
                 <span className="text-sm opacity-60 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">{exp.date}</span>
               </div>
               <div className="mt-4 prose dark:prose-invert">
                 {exp.content}
               </div>
             </GlassCard>
           ))}
        </div>
      </section>

    </main>
  );
}