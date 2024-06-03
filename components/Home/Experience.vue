<template>
    <div>
        <div class=" grid grid-cols-2 relative">
            <div class="flex flex-col">
                <div>
                    <div class="bgrid border-t border-l border-r border-[#232325] h-[350px]"></div>
                    <div class="bdot border border-[#232325] h-[200px] text-[#6A6B6C]">
                        <div class="px-5 py-7 text-md">
                            Checkout My Instagram
                            <nuxt-icon name="link"></nuxt-icon> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="bdot border-[#232325] border-t border-b border-r h-[300px]"></div>
                <div class="bgrid border-[#232325] border-r border-b h-[250px]"></div>
            </div>
        </div>
        <div class="border-[#232325] border-l border-r border-b h-[100px] flex flex-row">
            <div class="border-[#232325] border-r w-[150px] h-[100px]">
            </div>
            <div class="border-[#232325] border-r w-[140px] h-[100px]"></div>
            <div class="border-[#232325] border-r w-[140px] h-[100px]"></div>
            <div class="border-[#232325] border-r w-[140px] h-[100px]"></div>
            <div class="border-[#232325] border-r w-[140px] h-[100px]"></div>
        </div>
        <div class=" grid grid-cols-2 relative">
            <div class="flex flex-col">
                <div>
                    <div class="bdot border-l border-r border-[#232325] h-[350px]"></div>
                    <div class="bgrid border border-[#232325] h-[200px]"></div>
                </div>
            </div>
            <div class="flex flex-col">
                <div class="bgrid border-[#232325] border-b border-r h-[300px]"></div>
                <div class="bdot border-[#232325] border-r border-b h-[250px]"></div>
            </div>
        </div>

    </div>
</template>
<style>
.bdot {
    background-image: radial-gradient(#242424 5%, transparent 0);
    background-size: 16px 16px;
}
.bgrid {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='8' height='8' fill='none' stroke='rgb(255 255 255 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
</style>