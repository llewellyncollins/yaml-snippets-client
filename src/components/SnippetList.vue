<template>
    <div class="snippet-list">
        <SnippetItem
            :uid="uid"
            :isLoggedIn="isLoggedIn"
            :id="snippet.id"
            :name="snippet.name"
            :author="snippet.author.displayName"
            :description="snippet.description"
            :countStar="snippet.countStar"
            :editable="snippet.author.uid === uid"
            :starred="starredSnippetIds.includes(snippet.id)"
            v-for="(snippet, index) in snippets"
            :key="index"
        />
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import SnippetItem from '@/components/SnippetItem';

export default {
    name: 'SnippetList',
    components: {
        SnippetItem
    },
    props: {
        snippets: Array,
        uid: String,
        isLoggedIn: Boolean
    },
    computed: {
        ...mapGetters('user', ['userDetails']),
        ...mapGetters('snippets', ['starredSnippetIds'])
    }
};
</script>
<style lang="scss">
.snippet-name,
.snippet-author {
    text-transform: lowercase;
}
</style>
