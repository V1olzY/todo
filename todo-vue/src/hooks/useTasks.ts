import axios from "axios";
import {ref, onMounted, computed, Ref} from 'vue';
import { ITask } from "@/types/ITask";
import {ICategory} from "@/types/ICategory";

export function useTasks(token: string, categories: Ref<ICategory[]>) {
    const tasks = ref<ITask[]>([]);

    const fetching = async () => {
        try {
            const response = await axios.get('https://taltech.akaver.com/api/v1/TodoTasks/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            tasks.value = response.data;
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await axios.delete(`https://taltech.akaver.com/api/v1/TodoTasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            tasks.value = tasks.value.filter(task => task.id !== taskId);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    const addTask = async (task: ITask) => {
        try {
            const response = await axios.post('https://taltech.akaver.com/api/v1/TodoTasks/', task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            tasks.value.push(response.data);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    const updateTask = async (taskId: string, task: ITask) => {
        try {
            await axios.put(`https://taltech.akaver.com/api/v1/TodoTasks/${taskId}`, task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const index = tasks.value.findIndex(t => t.id === taskId);
            if (index !== -1) {
                tasks.value[index] = task;
            }
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    const getCategoryName = (categoryId: string): string => {
        const category = categories.value.find(cat => cat.id === categoryId);
        return category ? category.categoryName : "";
    };

    // Create a sort function to sort tasks by category name
    const sortByCategory = (a: ITask, b: ITask): number => {
        const categoryNameA = getCategoryName(a.todoCategoryId);
        const categoryNameB = getCategoryName(b.todoCategoryId);
        return categoryNameA.localeCompare(categoryNameB);
    };

    const sortTasks = (selectedSort: Ref<string>) => {
        return computed(() => {
            if (selectedSort.value === "2") {
                return tasks.value.slice().sort((task1, task2) => task1.taskSort - task2.taskSort);
            } else if (selectedSort.value === "1") {
                return tasks.value.slice().sort((task1, task2) => task2.taskSort - task1.taskSort);
            } else if (selectedSort.value === "3") {
                return tasks.value.slice().sort((task1, task2) => task1.taskName.localeCompare(task2.taskName));
            } else if (selectedSort.value === "4") {
                return tasks.value.slice().sort((task1, task2) => task2.taskName.localeCompare(task1.taskName));
            } else if (selectedSort.value === "5") {
                return tasks.value.slice().sort(sortByCategory);
            }else {
                return tasks.value;
            }
        });
    };
    onMounted(fetching);

    return {
        tasks,
        deleteTask,
        addTask,
        updateTask,
        sortTasks

    };
}
