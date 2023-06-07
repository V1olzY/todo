import axios from "axios";
import {ref, onMounted} from 'vue';
import {ICategory} from "@/types/ICategory";


export function useCategories(token: string) {
    const categories = ref<ICategory[]>([])

    const fetching = async () => {
        try {
            const response = await axios.get('https://taltech.akaver.com/api/v1/TodoCategories/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            categories.value = response.data;
        } catch (e) {
            alert(`Error: ${e}`)
        }
    }

    const deleteCategory = async (categoryId: string) => {
        try {
            await axios.delete(`https://taltech.akaver.com/api/v1/TodoCategories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            categories.value = categories.value.filter(category => category.id !== categoryId);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    }

    const addCategory = async (newCategory: ICategory) => {
        try {
            console.log(`New Category: `)
            console.log(newCategory)
            const response = await axios.post('https://taltech.akaver.com/api/v1/TodoCategories/', newCategory, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            categories.value.push(response.data);
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };

    const updateCategory = async (categoryId: string, updatedCategory: ICategory) => {
        try {
            console.log(`Category ID: ${categoryId}`)
            console.log(updatedCategory)
            await axios.put(`https://taltech.akaver.com/api/v1/TodoCategories/${categoryId}`, updatedCategory, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const index = categories.value.findIndex(category => category.id === categoryId);
            if (index !== -1) {
                categories.value.splice(index, 1, updatedCategory);
            }
        } catch (e) {
            alert(`Error: ${e}`);
        }
    };


    onMounted(fetching)

    return {
        categories, deleteCategory, addCategory, updateCategory
    }
}
