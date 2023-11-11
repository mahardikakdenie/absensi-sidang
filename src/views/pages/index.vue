<template>
<div>
    <div class="grid grid-rows-1">
        <div class="grid lg:grid-cols-3 grid-cols-2 gap-2">
            <div v-for="i in 6" :key="i">
                <card className="hover:shadow-md cursor-pointer">
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            <span class="lg:text-2xl text-sm">
                                Bagian {{ i }}
                            </span>
                        </div>
                        <div>
                            <div>
                                <span class="text-sm">
                                    Progress
                                </span>
                            </div>
                            <div class="text-sm block mb-[2px] text-primary-500">
                                100%
                            </div>
                        </div>
                    </div>
                </card>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Card from '@/components/Card';
export default {
    components: {
        Card,
    }
}
</script>

<style>

</style>
