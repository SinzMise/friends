import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function TemplatePage() {
  const { name } = useParams();
  const [templateContent, setTemplateContent] = useState("");

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const response = await fetch(`/src/templates/${name}.html`);
        if (!response.ok) {
          throw new Error("Template not found");
        }
        const html = await response.text();
        setTemplateContent(html);
      } catch (error) {
        console.error("Error loading template:", error);
        toast.error("Failed to load template");
        setTemplateContent(`<div class="p-4 text-red-500">Template ${name} not found</div>`);
      }
    };

    loadTemplate();
  }, [name]);

  return (
    <div className="p-4">
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: templateContent }}
      />
    </div>
  );
}