import { getSortedProjectsData } from '../lib/projects';
import Link from 'next/link';

export default function Home() {
  const allProjects = getSortedProjectsData();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-10">My Portfolio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allProjects.map(({ id, title, description, image }) => (
          <div key={id} className="border p-4 rounded-lg">
            <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">{description}</p>
            {/* You would create a dynamic route /projects/[id] to view the full details */}
          </div>
        ))}
      </div>
    </main>
  );
}