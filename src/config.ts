async function loadFileAndGetLines(filePath : string) {
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

export const cascadeMoons = await loadFileAndGetLines("/cascademoons.txt");
export const cascadeReq = [-1, -1, -1, 0, -1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
  