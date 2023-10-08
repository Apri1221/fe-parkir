<template>
    <div class="container">
        <div class="w-full px-5">
            
            <!-- header -->
            <div v-if="setSearch || setModal" class="grid grid-cols-3 gap-4 my-6">
                <div v-if="setSearch" class="col-span-2">
                    <span class="z-10 h-full flex absolute text-center text-blueGray-300 text items-center w-8 pl-3">
                        <i class="fas fa-search"></i>
                    </span>
                    <input placeholder="Search Category"
                        class="border-transparent shadow-md text-xl py-3 w-full placeholder-blueGray-200 text-blueGray-700 relative bg-white rounded-md outline-none focus:ring focus:ring-lightBlue-500 focus:ring-1 focus:border-lightBlue-500 border border-solid transition duration-200 pl-10"
                        @input="(event) => setSearch(event.target.value)">
                </div>
                <div v-if="setModal" class="shadow-md px-2
                        py-2 w-1/4 cursor-pointer bg-white rounded-2xl dark:bg-gray-700
                        relative hover:border-blue-600 hover:border-opacity-100 border-white border-2 border-opacity-0
                    " @click="setModal">
                    <svg class="mx-auto lg:w-8 md:w-6 sm:w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <title>Add {{ title }}</title>
                        <g fill="#3b82f6">
                        <path
                            d="M28 4H12C9.79 4 8.02 5.79 8.02 8L8 40c0 2.21 1.77 4 3.98 4H36c2.21 0 4-1.79 4-4V16L28 4zm4 28h-6v6h-4v-6h-6v-4h6v-6h4v6h6v4zm-6-14V7l11 11H26z">
                        </path>
                        </g>
                    </svg>
                </div>
            </div>

            <!-- table -->
            <div
                class="relative flex flex-col min-w-0 break-words w-full mt-4 mb-8 shadow-lg rounded-lg bg-white text-blueGray-700">
                <div class="px-6 py-4 border-0">
                    <div class="flex flex-wrap items-center">
                        <div class="relative w-full max-w-full flex-grow flex-1">
                            <h3 class="font-bold text-2xl text-blueGray-700">{{ title }}</h3>
                        </div>
                    </div>
                </div>
                <div class="block w-full overflow-x-auto">
                    <table class="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th class="px-6 justify-center align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">No</th>
                                <th v-for="(value, index) in listColumns"
                                    class="px-6 align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold text-left">
                                    {{ $t(value) }}
                                </th>
                                <th v-if="deleteRow || editRow" class="px-6 justify-center align-middle border border-solid py-3 text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-bold" colspan="2">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, x) in data">
                                <td class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                    <div class="flex justify-center mr-4"><span class="ml-3">
                                            {{ x+1 }}
                                        </span></div>
                                </td>
                                <td v-for="(col, y) in listColumns"
                                    class="border-t-0 px-3 align-middle border-l-0 border-r-0 text-base whitespace-nowrap p-4">
                                    <div class="flex items-center">
                                        <span class="ml-3">
                                            {{ isDate(col) 
                                                ? $moment(Object.values(data)[Object.keys(data).indexOf(col)]).format('DD MMM YYYY') 
                                                : col.toLowerCase().includes('price') || col.toLowerCase().includes('amount')
                                                    ? convertRupiah(Object.values(data)[Object.keys(data).indexOf(col)])
                                                    : Object.values(data)[Object.keys(data).indexOf(col)] }}
                                        </span>
                                    </div>
                                </td>
                                <td v-if="editRow" class="border-t-0 pl-3 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-4">
                                    <t-button @click="() => editRow(x)">Edit</t-button>
                                </td>
                                <td v-if="deleteRow" class="border-t-0 pr-3 align-middle border-l-0 border-r-0 text-base whitespace-nowrap py-4">
                                    <t-button @click="() => deleteRow(x)" variant="error">Delete</t-button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <t-pagination class="mr-0" :total-items="total" :per-page="perPage" v-model="current"
                    @change="setPage" />
        </div>
    </div>
</template>

<script>
import toRupiah from '@develoka/angka-rupiah-js';


export default {
    name: "Table",
    props: ['total', 'perPage', 'title', 'listColumns', 'data', 'setPage', 'setSearch', 'setModal', 'deleteRow', 'editRow'],
    data() {
        return {
            current: 1
        }
    },
    methods: {
        isDate(col) {
            return col === 'created_at' || col === 'updated_at'
        },
        convertRupiah(val) {
            return toRupiah(val, {formal: false})
        } 
    }
};

</script>