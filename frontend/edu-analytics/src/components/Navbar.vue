<template>
    <div class="display">
        {{ display }}
        Hello
    </div>
    
</template>
<script>
    export default {
        data: function() {
            return {
                display: 'Nav working'
            }
            
        }
    }
</script>
<style scoped>
    .display {
        color: red
    }
</style>

