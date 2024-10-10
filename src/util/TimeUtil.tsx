export function convertTime(time: number): string {    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) /60);
    const seconds = (time % 3600) % 60;
  
    let convertedTime = "";
  
    convertedTime += hours > 0 ? hours + "h " : ""; 
    convertedTime += (minutes > 0) ? minutes + "m " : ""; 
    convertedTime += seconds + "s";
    return convertedTime;
  }