<template lang="">
  <div
    class="bg-white bg-no-repeat custom-dropshadow footer-bg dark:bg-slate-700 flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-[9999] bottom-0 py-[12px] px-4"
  >
    <router-link to="/" v-slot="{ isActive }">
      <span
        class="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center text-slate-900"
        ><Icon icon="solar:home-bold" />
      </span>
      <span
        class="block text-[11px] text-slate-900"
        >Home</span
      >
    </router-link>
    <router-link
      v-slot="{ isActive }"
      :to="{ name: 'Layout' }"
      class="relative bg-white bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-slate-700 h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center"
    >
      <div
        class="h-[50px] w-[50px] rounded-full relative left-[0px] top-[0px] custom-dropshadow"
      >
        <img
          src="@/assets/images/users/user-1.jpg"
          alt=""
          class="w-full h-full rounded-full"
        />
      </div>
    </router-link>
    <router-link to="/logout" v-slot="{ isActive }">
      <span
        class="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center text-slate-900">
        <Icon icon="heroicons-outline:login" />
      </span>
      <span
        class="block text-[11px] text-slate-900"
        >Logout</span
      >
    </router-link>
  </div>
</template>
<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
};
</script>
<style lang="scss"></style>
