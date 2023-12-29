<template>
    <div>
        <card>
            <data-table title="Project" btn-text="Buat Project" />
        </card>
    </div>
    </template>
    
    <script setup>
    import Card from '@/components/Card/index.vue';
    import DataTable from '@/components/DataTable/index.vue';
    import projectsApi from '@/helpers/projects.js';
    import { useDataTableStore } from '@/store/data-table.js';
    import { onMounted } from 'vue';
    
    const store = useDataTableStore();
    
    const headers = [
        {
            label: 'Project Number',
            field: 'projectNo', 
        },
        {
            label: 'Name',
            field: 'name'
        },
        {
            label: 'Address',
            field: 'address'
        },
        {
            label: 'Cost',
            field: 'cost'
        }, 
        {
            label: 'Actions',
            field: 'actions'
        }
    ];
    
    const actions = [];
    
    const getData = () => {
        const callback = (response) => {
            const projects = response?.data?.data;
            store.setData(projects);
        };
    
        const err = (e) => {
            console.log('e => ', e);
        };
    
        projectsApi.getData({}, callback, err);
    };
    
    onMounted(() => {
        getData();
        store.setHeaders(headers)
    });
    
    </script>
    
    <style>
    
    </style>
    