export interface Project {
    id: string;
    titleLines: string[]; // For multi-line titles e.g., ["CRYPTO", "SOUNDBOX"]
    descriptionLines: string[]; // For multi-line descriptions e.g., ["QR Txns", "+ React", "ETHGlobal", "Hack"]
    url?: string; // Optional: A link to the project
  }
  
  // Add other existing types here if the file already exists
  // export interface SomeOtherType { ... }