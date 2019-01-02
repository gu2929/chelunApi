<template>
    <div class='banner'>
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item>
                <img src="http://localhost:8080/src/assets/banner@3x.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img src="http://localhost:8080/src/assets/banner@3x.png" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img src="http://localhost:8080/src/assets/banner@3x.png" alt="">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .banner img{
        width:100%;
        height:auto;
        display:block;
    }
</style>