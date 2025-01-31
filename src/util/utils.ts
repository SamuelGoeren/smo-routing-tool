export async function loadFileAndGetLines(filePath : string) {
    try {
      // Fetch the file from the public directory
      const response = await fetch(filePath);
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to load file: ${filePath}`);
      }
  
      // Read the file content as text
      const fileContents = await response.text();
  
      // Split the file content into lines by newline characters
      const lines = fileContents.split('\n');
  
      // Return the array of lines
      return lines;
    } catch (error) {
      console.error('Error loading file:', error);
      return []; // Return an empty array if there's an error
    }
  }

export function checkMultipleMoonRequirements(requirements : number[], finishedMoons : number[]) : boolean {
    for(const req of requirements){
      if(!finishedMoons.includes(req) && req >= 0) return false;
    }
  
    return true;
  }