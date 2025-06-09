import { ExperienceItem } from '../portfolioData'; // Assuming ExperienceItem is exported from portfolioData

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  if (!experience || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="mb-8">
      <h2 className="text-2xl mb-4 text-yellow-400">~/experience:</h2>
      {experience.map((job, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold text-blue-400">
            {job.key} {/* Position */}
            <span className="text-green-400"> @ </span>
            {job.url ? (
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:underline"
              >
                {job.value} {/* Company Name */}
              </a>
            ) : (
              <span className="text-pink-400">{job.value}</span>
            )}
          </h3>
          <p className="text-sm text-gray-400 mb-1">
            {job.startDate} - {job.endDate || 'Present'}
          </p>
          {job.summary && <p className="text-gray-300 mb-2">{job.summary}</p>}
          {job.highlights && job.highlights.length > 0 && (
            <ul className="list-disc list-inside pl-4 text-gray-300">
              {job.highlights.map((highlight, i) => (
                <li key={i} className="mb-1">
                  <span className="text-purple-400">{'> '}</span>{highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );
};

export default ExperienceSection;