import yaml from 'js-yaml';
import { LinkCategory } from '@/data/links';

export async function loadYamlData(): Promise<LinkCategory[]> {
  try {
    const response = await fetch('/src/data/links.yaml');
    const yamlText = await response.text();
    return yaml.load(yamlText) as LinkCategory[];
  } catch (error) {
    console.error('Error loading YAML data:', error);
    return [];
  }
}
