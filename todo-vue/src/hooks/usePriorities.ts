import axios from "axios";
import {ref, onMounted} from 'vue';
import {IPriority} from "@/types/IPriority";



export function usePriorities(token: string) {
    const priorities = ref<IPriority[]>([])
    const appUserId = ref("")


    const fetching = async () => {
        try {
            const response = await axios.get('https://taltech.akaver.com/api/v1/TodoPriorities/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            priorities.value = response.data;
            appUserId.value = response.data.length > 0 ? response.data[0].appUserId : "";

        } catch (e) {
            alert(`Error: ${e}`)

        }
    }

    const deletePriority = async (priorityId: string) => {
        try {
            await axios.delete(`https://taltech.akaver.com/api/v1/TodoPriorities/${priorityId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            priorities.value = priorities.value.filter(priority => priority.id !== priorityId);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    }

    const updatePriority = async (priorityId: string, updatedPriority: IPriority) => {
        try {
            await axios.put(`https://taltech.akaver.com/api/v1/TodoPriorities/${priorityId}`, updatedPriority, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const index = priorities.value.findIndex(priority => priority.id === priorityId);
            if (index !== -1) {
                priorities.value.splice(index, 1, updatedPriority);
            }
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    const addPriority = async (newPriority: IPriority) => {
        try {
            const response = await axios.post('https://taltech.akaver.com/api/v1/TodoPriorities/', newPriority, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    appUserId: appUserId
                }
            });
            priorities.value.push(response.data);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    onMounted(fetching)

    return {
        priorities: priorities, appUserId, deletePriority, addPriority, updatePriority
    }
}
