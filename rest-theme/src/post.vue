<style>

</style>

<template>
    <div class="post">
        <h1 class="entry-title" v-if="isSingle">{{ post.title.rendered }}</h1>
        <h2 class="entry-title" v-else><router-link :to="post.slug">{{ post.title.rendered }}</router-link></h2>

        <div class="entry-content" v-html="post.content.rendered"></div>
    </div>
</template>

<script>
    export default {
        props: {
            post: {
                type: Object,
                default() {
                    return {
                        id: 0,
                        slug: '',
                        title: { rendered: '' },
                        content: { rendered: '' }
                    }
                }
            }
        },

        created() {
            // If post hasn't been passed by prop
            if (!this.post.id) {
                this.getPost();
                this.isSingle = true;
            }
        },

        data() {
            return {
                base_path: wp.base_path,
                isSingle: false,
                currentRoute: window.location.pathname
            }
        },

        methods: {
            getPost() {
                this.$http.get(wp.root + 'wp/v2/posts/' + this.$route.meta.postId).then(function(response) {
                    this.post = response.data;
                    this.$parent.$emit('page-title', this.post.title.rendered);
                }, function(response) {
                    console.log(response);
                });
            }
        }
    }
</script>
