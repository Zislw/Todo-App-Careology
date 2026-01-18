export interface PriorityConfig {
  backgroundColor?: string;
  label: string;
}

export enum ePriority{
     HIGH='high',
     MEDIUM = 'medium',
     LOW = 'low'    
}

export const getPriorityConfig = (priorityName?: string): PriorityConfig => {
  if (!priorityName) {
    return {
      label: 'None'
    };
  }
  
  const name = priorityName.toLowerCase();
  
  switch (name) {
    case 'high':
      return {
        backgroundColor: '#f4bac2',
        label: 'High'
      };
    case 'medium':
      return {
        backgroundColor: '#d5e040',
        label: 'Medium'
      };
    case 'low':
      return {
        backgroundColor: '#d5dbdf',
        label: 'Low'
      };
    default:
      return {
        backgroundColor: '#F5F5F5',
        label: 'None'
      };
  }
};
