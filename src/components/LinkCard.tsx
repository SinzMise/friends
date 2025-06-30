import { FriendLink } from "@/data/links";

interface LinkCardProps {
  link: FriendLink;
}

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a 
      href={link.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md"
    >
      <div className="mb-3 flex items-center">
        <img 
          src={link.avatar} 
          alt={link.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <h3 className="ml-3 text-lg font-medium text-blue-700">{link.name}</h3>
      </div>
      <img
        src={link.cover}
        alt={link.name}
        className="mb-3 aspect-video w-full rounded object-cover"
      />
      <p className="line-clamp-2 text-sm text-gray-800">{link.desc}</p>
    </a>
  );
}