<style>

</style>

<template>
    <div class="posts">
        <Post v-for="post in posts" :post="post"></Post>
    </div>
</template>

<script>
    export default {
        created() {
            this.getPosts();
        },

        data() {
            return {
                posts: []
            }
        },

        methods: {
            getPosts() {
                this.$http.get(wp.root + 'wp/v2/posts').then(function(response) {
                    this.posts = response.data;
                    this.$emit('page-title', '');
                }, function(response) {
                    console.log(response);
                });
            }
        }
    }
</script>
