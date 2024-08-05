<template>
    <div>
        <div class="border bg-white shadow-md rounded p-5">
            <div class="flex justify-between">
                <div>
                    <img src="https://oo-tools.mahardikakdenie.my.id/logo/orderonline.svg" width="150" alt="">
                </div>
                <div>
                    <span class="text-danger-500 text-sm">*Confidential</span>
                </div>
            </div>

            <div class="grid grid-cols-2 mt-6">
                <div>
                    <div>
                        <span class="font-bold text-md">
                            PT ORDIVO TEKNOLOGI INDONESIA
                        </span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm">Payrol Cut off : 01 - 31 Aug 2024</span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm">Name : {{ user?.id }} / {{ user?.name }}</span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm">Email : {{ user?.email }}</span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm">Job Position : Software engineer</span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm">PTKP : TK/0</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span class="font-bold text-md">
                            PAYSLIP
                        </span>
                    </div>
                    <div class="mt-2">
                        <span class="text-sm">NPWP : TK/0</span>
                    </div>
                </div>
            </div>

            <div class="mt-6 border rounded">
                <div class="bg-gray-300 grid grid-cols-2 p-2">
                    <div>
                        <span class="font-bold">Earnings</span>
                    </div>
                    <div>
                        <span class="font-bold">Deductions</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 p-2">
                    <div class="border-r">
                        <div>
                            <small>Basic Salary : 6.000.000</small>
                        </div>
                        <div>
                            <small>BPJS Kesehatan Employee : 70.000</small>
                        </div>
                        <div>
                            <small>JHT Employee : 140.000</small>
                        </div>
                        <div>
                            <small>PPh21 : 93.000</small>
                        </div>
                    </div>
                    <div class="px-2">
                        <div>
                            <small>BPJS Kesehatan Employee : 70.000</small>
                        </div>
                        <div>
                            <small>JHT Employee : 140.000</small>
                        </div>
                        <div>
                            <small>PPh21 : 93.000</small>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2 p-2 border-t border-b">
                    <div>
                        <small><b>Total Earning : 6.303.518</b></small>
                    </div>
                    <div>
                        <small><b>Total Deductions : 303.518</b></small>
                    </div>
                </div>
                <div class="grid grid-cols-2 p-2 mt-4">
                    <div></div>
                    <div>
                        <span class="font-bold">Take Home Pay : 6.000.000</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 pl-3">
                    <div>
                        <div class="mt-5">
                            <div>
                                <span>Benefits *</span>
                            </div>
                        </div>
                        <hr class="my-2">

                        <div>
                            <div class="flex justify-between">
                                <div>
                                    <small>JKK</small>
                                </div>
                                <div>
                                    <small>16.000</small>
                                </div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div>
                                    <small>JKM</small>
                                </div>
                                <div>
                                    <small>21.000</small>
                                </div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div>
                                    <small>JHT COMPANY</small>
                                </div>
                                <div>
                                    <small>259.000</small>
                                </div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div>
                                    <small>BPJS KESEHATAN COMPANY</small>
                                </div>
                                <div>
                                    <small>280.000</small>
                                </div>
                            </div>
                            <div class="flex justify-between mt-2">
                                <div>
                                    <small class="font-bold">Total Benefit</small>
                                </div>
                                <div>
                                    <small class="font-bold">576.000</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import userApi from '@/helpers/user';

const user = ref(null);
const isLoading = ref(false);

const getUser = () => {
    isLoading.value = true;
    const callback = (response) => {
        isLoading.value = false;
        const users = response?.data?.data;
        user.value = users;
        console.log("🚀 ~ callback ~ user.value:", user.value)
    };
    const err = (e) => {
        console.log(e);
    };

    userApi.getMe({
        entities: 'roles.role,profile.medias,divisions.division'
    }, callback, err);
};

onMounted(() => {
    getUser();
});
</script>
