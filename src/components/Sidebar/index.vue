<template>
	<div :class="this.$store.themeSettingsStore.semidark ? 'dark' : ''">
		<div :class="`sidebar-wrapper bg-white dark:bg-slate-800 ${sidebarIsBordered} ${siebarIsCollaps} ${sideBarIsHovered}`"
			@mouseenter="this.$store.themeSettingsStore.isMouseHovered = true"
			@mouseleave="this.$store.themeSettingsStore.isMouseHovered = false">
			<div :class="`
					logo-wrapper ${siebarIsCollaps} ${isLogoWrapperWhen} ${themeSkinIsHovered ? 'logo-hovered' : ''
				}
				`">
				<img src="https://oo-tools.mahardikakdenie.my.id/logo/orderonline.svg" width="200" class="mr-2" alt="">
				<span class="cursor-pointer text-slate-900 dark:text-white text-2xl" v-if="isSidebarOpenOrMouseHovered"
					@click="
						this.$store.themeSettingsStore.sidebarCollasp =
						!this.$store.themeSettingsStore.sidebarCollasp
						">
					<div class="h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150"
						:class="this.$store.themeSettingsStore.sidebarCollasp
								? ''
								: 'ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700'
							"></div>
				</span>
			</div>
			<div class="h-[60px] absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none"
				:class="[shadowbase ? ' opacity-100' : ' opacity-0']"></div>

			<SimpleBar class="sidebar-menu px-4 h-[calc(100%-80px)]" @created="(instance) => {
					simplebarInstance = instance;
				}
				">
				<Navmenu :items="menuItems" />
			</SimpleBar>
		</div>
	</div>
</template>
<script>
// import { Icon } from "@iconify/vue";
import { defineComponent } from 'vue';
import { menuItems } from '@/constant/static';
import Navmenu from './Navmenu';
import { gsap } from 'gsap';
import { SimpleBar } from 'simplebar-vue3';
import { ref, onMounted } from 'vue';

export default defineComponent({
	components: {
		// Icon,
		Navmenu,
		SimpleBar,
	},
	data() {
		return {
			menuItems,
			openClass: 'w-[248px]',
			closeClass: 'w-[72px] close_sidebar',
		};
	},

	computed: {
		sidebarIsCollasp() {
			return this.$store.themeSettingsStore.sidebarCollasp;
		},
		themeSkinIsBordered() {
			return this.$store.themeSettingsStore.skin === 'bordered';
		},
		siebarIsCollaps() {
			return this.sidebarIsCollasp ? this.closeClass : this.openClass;
		},
		themeSkinIsHovered() {
			return this.$store.themeSettingsStore.isMouseHovered;
		},
		borderedClass() {
			return 'border-r border-gray-5002 dark:border-slate-700';
		},
		sidebarIsBordered() {
			const isBordered = this.themeSkinIsBordered;
			const borderedClass = this.borderedClass;

			return isBordered ? borderedClass : 'shadow-base';
		},
		sideBarIsHovered() {
			return this.themeSkinIsHovered ? 'sidebar-hovered' : '';
		},
		isSidebarOpenOrMouseHovered() {
			return !this.sidebarIsCollasp || this.themeSkinIsHovered;
		},
		isSidebarCollapsedAndNotHovered() {
			return this.sidebarIsCollasp && !this.themeSkinIsHovered;
		},
		isLogoWrapperWhen() {
			return this.themeSkinIsBordered
				? `border-b ${this.borderedClass}`
				: ' border-none';
		},
	},

	setup() {
		const shadowbase = ref(false);
		const simplebarInstance = ref(null);
		onMounted(() => {
			simplebarInstance.value
				.getScrollElement()
				.addEventListener('scroll', () => {
					if (
						simplebarInstance.value.getScrollElement().scrollTop >
						50
					) {
						simplebarInstance.value
							.getScrollElement()
							.classList.add('scroll');
						shadowbase.value = true;
					} else {
						simplebarInstance.value
							.getScrollElement()
							.classList.remove('scroll');
						shadowbase.value = false;
					}
				});
		});

		return {
			simplebarInstance,
			shadowbase,
		};
	},
});
</script>
<style lang="scss">
.sidebar-wrapper {
	@apply fixed ltr:left-0 rtl:right-0 top-0 h-screen z-[999];
	transition: width 0.2s cubic-bezier(0.39, 0.575, 0.565, 1);
	will-change: width;

	.logo-wrapper {
		@apply logo-segment h-[80px] flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6 sticky top-0 px-4;
	}
}

.nav-shadow {
	background: linear-gradient(rgb(255, 255, 255) 5%,
			rgba(255, 255, 255, 75%) 45%,
			rgba(255, 255, 255, 20%) 80%,
			transparent);
}

.dark {
	.nav-shadow {
		background: linear-gradient(rgba(#1e293b, 100%) 5%,
				rgba(#1e293b, 75%) 45%,
				rgba(#1e293b, 20%) 80%,
				transparent);
	}
}

.sidebar-wrapper.sidebar-hovered {
	width: 248px !important;
}

.logo-segment.logo-hovered {
	width: 248px !important;
}

.ring-active {
	@apply ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700;
}
</style>
