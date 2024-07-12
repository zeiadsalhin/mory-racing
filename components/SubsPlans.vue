<script setup lang="ts">
const yearly: boolean = true;
const popular = { daily: false, monthly: true }; // or set it to true or false as needed
const plan_id = { lite: 'price_1PbK2wHndLqqnsBR3EjfRMcx', ultimate: 'no' }
const planName = { daily: "Mory Racing Lite", monthly: "Mory Racing Ultimate" };
const planDescription = { daily: "Mory Racing Plan with limited access, 24h of unlimited racing", monthly: "Mory Racing Plan with full access, gameplay, and live racing" };
const features = {
    daily: [
        'Game Access/Racings for 24 hours',
        'Stable API',
        // 'no Interruptions / Ads',
        'Live Support 24/7'],
    monthly: ['Unlimited Game Access/Racings',
        'Stable API',
        'no Interruptions / Ads',
        'Live Support 24/7'],
}
const price = { daily: 3, monthly: 70 }


// selected Plan
const showPlans = ref(true)
const planSelected = ref();
const plan_price_id = ref();
const planPrice = ref();
const planDesc = ref();

const SelectPlan = (planv, plan_id, planp, pland) => {
    planSelected.value = planv
    plan_price_id.value = plan_id
    planPrice.value = planp
    planDesc.value = pland
    showPlans.value = false
    // console.log(planSelected.value, planPrice.value, planDesc.value);

}
</script>

<template>
    <div>
        <div v-if="showPlans" id="plans" class="plans">
            <p class="font-semibold text-lg md:text-left text-center p-2 my-auto">Available Plans:
            </p>

            <div class="h-full md:flex justify-center md:space-x-5 w-full m-10 mx-auto text-white"
                :class="{ 'dark': popular }">
                <div
                    class="relative flex flex-col h-full mb-8 md:max-w-[22rem] p-6 rounded-2xl bg-[#000] border-2 border-[#ff0050] shadow-sm shadow-[#ff0050]">
                    <div v-if="popular.daily" class="absolute top-0 right-0 mr-6 -mt-4">
                        <div
                            class="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-[#ff0050] text-white rounded-full shadow-sm shadow-slate-950/5">
                            Most Popular</div>
                    </div>
                    <div class="mb-5">
                        <div class="text-slate-900 dark:text-slate-200 font-semibold text-lg mb-1">{{ planName.daily }}
                        </div>
                        <div class="inline-flex items-baseline mb-2">
                            <span class="text-slate-900 dark:text-slate-200 font-semibold text-2xl">$</span>
                            <span class="text-slate-900 dark:text-slate-200 font-semibold text-3xl">{{ price.daily
                                }}</span>
                            <span class="text-slate-500 font-medium">/day</span>
                        </div>
                        <div class="text-sm text-slate-500 mb-5">{{ planDescription.daily }}</div>
                        <a @click="SelectPlan(planName.daily, plan_id.lite, price.daily, planDescription.daily)"
                            class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#ff0050] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-[#ff0050]/10 hover:bg-[zinc-600] focus:outline-none focus:ring-2 focus:ring-[#00f2ea] transition-colors duration-150"
                            href="#0">
                            Purchase Plan
                        </a>
                    </div>
                    <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                    <ul class="text-slate-600 dark:text-slate-400 text-xs text-left space-y-3 grow">
                        <template v-for="feature in features.daily">
                            <li class="flex items-center">
                                <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                                <span>{{ feature }}</span>
                            </li>
                        </template>
                    </ul>
                </div>

                <div
                    class="relative flex flex-col h-full mb-8 md:max-w-[22rem]  p-6 rounded-2xl bg-[#000] border-2 border-[#ff0050] shadow-xl shadow-[#ff0050]/10  ">
                    <div v-if="popular.monthly" class="absolute top-0 right-0 mr-6 -mt-4">
                        <div
                            class="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-[#ff0050] text-white rounded-full shadow-2xl shadow-slate-950/5">
                            Most Popular</div>
                    </div>
                    <div class="mb-5">
                        <div class="text-slate-900 dark:text-slate-200 font-semibold text-lg mb-1">{{ planName.monthly
                            }}</div>
                        <div class="inline-flex items-baseline mb-2">
                            <span class="text-slate-900 dark:text-slate-200 font-semibold text-2xl">$</span>
                            <span class="text-slate-900 dark:text-slate-200 font-semibold text-3xl">{{ price.monthly
                                }}</span>
                            <span class="text-slate-500 font-medium">/mo</span>
                        </div>
                        <div class="text-sm text-slate-500 mb-5">{{ planDescription.monthly }}</div>
                        <a @click="SelectPlan(planName.monthly, plan_id.ultimate, price.monthly, planDescription.monthly)"
                            class="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#ff0050] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-[#ff0050]/10 hover:bg-[zinc-600] focus:outline-none focus:ring-2 focus:ring-[#00f2ea] transition-colors duration-150"
                            href="#1">
                            Purchase Plan
                        </a>
                    </div>
                    <div class="text-slate-900 dark:text-slate-200 font-medium mb-3">Includes:</div>
                    <ul class="text-slate-600 dark:text-slate-400 text-xs text-left space-y-3 grow">
                        <template v-for="feature in features.monthly">
                            <li class="flex items-center">
                                <svg class="w-3 h-3 fill-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                                <span>{{ feature }}</span>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
        <v-card v-else color="#00f2ea" variant="outlined"
            class="payments md:w-1/2 space-y-5 shadow-2xl shadow-[#ff0050]/10 min-h-[30rem] mx-auto">
            <div class="selected text-[#ff0050] md:p-5">
                <p class="font-semibold p-4 my-auto text-xl"><v-icon>mdi-check-circle</v-icon>Selected:
                <p class="underline inline-block">{{ planSelected }}</p>, ${{ planPrice }}
                {{ planSelected === 'Mory Racing Lite' ? '/day' : '/month' }}</p>
            </div>
            <p class="font-semibold text-lg md:text-left md:p-4 my-auto text-white"><v-icon
                    class="m-2">mdi-credit-card-outline</v-icon>Select
                Payment
                Method:
            </p>
            <div class="paymentmethods p-1">
                <p class="onetime p-1">One-Time purchase</p>
                <Paypal :plan="planSelected" :price="planPrice" :description="planDesc" />
                <p class="onetime p-3">or Subscribing</p>
                <Paypal-subs :plan="planSelected" :price="planPrice" :description="planDesc" />
                <Stripe :plan="plan_price_id" />
            </div>
            <v-btn @click="showPlans = true" class="ma-4 mt-10">Back</v-btn>
        </v-card>
    </div>
</template>