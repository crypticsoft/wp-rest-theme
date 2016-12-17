<style>

</style>

<template>
    <div class="page">
        <h1 class="entry-title">{{ page.title.rendered }}</h1>

        <div class="entry-content" v-html="page.content.rendered"></div>
    </div>
</template>

<script>
    export default {
        created() {
            this.getPage();
        },

        data() {
            return {
                page: {
                    id: 0,
                    slug: '',
                    title: { rendered: '' },
                    content: { rendered: '' }
                }
            }
        },

        methods: {
            getPage() {
                this.$http.get(wp.root + 'wp/v2/pages/' + this.$route.meta.postId).then(function(response) {
                    this.page = response.data;
                    this.$parent.$emit('page-title', this.page.title.rendered);
                }, function(response) {
                    console.log(response);
                });
            }
        },

        route: {
            canReuse() {
                return false;
            }
        }
    }
</script>
