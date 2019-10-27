export interface Task {
    imageName: string;
    name: string;
    description: string;
    isOpen: boolean;
}

export type Prediction<T> = (entity: T) => boolean;
