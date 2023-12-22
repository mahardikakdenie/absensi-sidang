<template>
    <div>
        <div class="my-3">
            <VueAllert type="success" dismissible icon="akar-icons:double-check">
                Selamat Datang {{  user?.name  }}
            </VueAllert>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div class="">
                <card className="h-min">
                    <div class="text-center">
                        <div class="flex justify-center">
                            <div class="flex-0">
                                <div class="author-img w-[65px] h-[88px] rounded-[40px]">
                                    <img :src="media.url" alt="" class="w-full h-full object-cover rounded-md" />
                                </div>
                            </div>
                        </div>
                        <hr class="my-4">
                        <div class="">
                            <div>
                                <span class="text-sm  whitespace-nowrap sm:whitespace-normal font-bold sm:text-xl">
                                    {{ user?.name }}
                                </span>
                            </div>
                            <div class="mt-2 text-sm">
                                <span class="font-bold">ID : </span> <span>ABCD - 1213123</span> 
                            </div>
                            <div class="mt-2 text-sm">
                                <span class="font-bold">Divisi : </span> <span>Jalan</span> 
                            </div>
                        </div>
                    </div>
                </card>
            </div>
            <div class="col-span-1 sm:col-span-2">
                <card>
                    <div>
                        <div class="">
                            <span class="whitespace-nowrap text-sm font-bold sm:text-xl">
                                Quick Attendance
                            </span>
                        </div>
                        <hr class="my-4">
                        <div>
                            <div v-for="i in 3" :key="i" class="mt-6">
                                <header-project :element="{ name: 'Nama Project' }" />
                                <div class="sm:px-2">
                                    <span class="font-bold whitespace-nowrap text-sm">
                                        Deadline : <span class="font-normal">01-01-2023</span>
                                    </span>
                                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                        <vue-button text="Clock In" btn-class="btn btn-sm btn-success light" />
                                        <vue-button text="Clock out" btn-class="btn btn-sm btn-danger light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>

<script setup>
import card from '@/components/Card';
import HeaderProject from '@/components/Project/Header.vue';
import VueButton from '@/components/Button/index.vue';
import VueAllert from '@/components/Alert';
import { useUserStore } from '@/store/user';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.user);
const media = computed(() => user?.value?.profile?.medias);

</script>
