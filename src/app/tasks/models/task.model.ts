export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created?: Date;
  updated?: Date;
}

export interface TaskCreateBody {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface ResponseTask {
  message: string;
  id?: string;
}
