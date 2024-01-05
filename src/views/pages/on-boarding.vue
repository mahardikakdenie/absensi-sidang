<template>
	<div class="space-y-5">
        <VueAllert type="success" dismissible icon="akar-icons:double-check">
            Selamat datang, Mahardika Kessuma Denie! Akun Anda telah berhasil terdaftar di sistem kami. Untuk dapat mengakses sistem dengan lebih baik, mohon segera lengkapi profil Anda. Terima kasih atas kerjasama Anda.
        </VueAllert>
		<Card title="Vertical">
			<HorizentalWizard />
		</Card>
	</div>
</template>
<script>
import Card from '@/components/Card';
import HorizentalWizard from '@/components/FormWizard/Horizontal.vue';
import VueAllert from '@/components/Alert';

export default {
	components: {
		HorizentalWizard,
        Card,
        VueAllert,
	},
};
</script>
<style lang=""></style>
